import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/Todos.js'
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { v4 as uuidv4 } from 'uuid'

import './App.css';
import axios from 'axios';

class App extends Component {
//function App() {
  state = {
    todos: []
    // todos: [
    //   {
    //     id: uuidv4(),
    //     title: 'Take out the recycle',
    //     completed: false
    //   },
    //   {
    //     id: uuidv4(),
    //     title: 'Dinner with wife',
    //     completed: true
    //   },
    //   {
    //     id: uuidv4(),
    //     title: 'Meeting with boss',
    //     completed: false
    //   }
    // ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    //.then(res => console.log(res.data))
    .then(res=>this.setState({ todos: res.data }))
  }
  // Toggle complete
  markComplete = (id) => {
    //console.log('From app.js'+id)
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })  })
  }

  // Delete Todo
  delTodo = (id) => {
    //console.log(id)
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res=>this.setState({ todos: [...this.state.todos.filter(
      todo => todo.id !== id)] }))
    // this.setState({ todos: [...this.state.todos.filter(
    //   todo => todo.id !== id)] }) // spread operator copies everything in there
  }

  // Add Todo
  addTodo = (title) => {
    // //console.log(title)
    // const newTodo = {
    //   id: uuidv4(),
    //   title,
    //   completed: false
    // }
    // this.setState({ todos: [...this.state.todos, newTodo] })

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => this.setState({ todos:
      [...this.state.todos, res.data]
    }))
  }

  render() {
    console.log(this.state.todos)
    // In react-router-dom v6 the Route components no longer have render or component props,
    // Use element props
    return (
      <Router>
        <Fragment>
          <Header />
          <Routes>
            <Route className="App" path='/' element={
              <Fragment>            
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} 
                delTodo={this.delTodo} />
              </Fragment> }
            />
            <Route className="App" path='/about' 
              element={ <About /> }
            />
          </Routes>
        </Fragment>
      </Router>
    )  
  }
}

export default App;
