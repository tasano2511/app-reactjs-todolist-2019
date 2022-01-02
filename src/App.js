import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/Todos.js'
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { v4 as uuidv4 } from 'uuid'

import './App.css';

class App extends Component {
//function App() {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: 'Take out the recycle',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Dinner with wife',
        completed: true
      },
      {
        id: uuidv4(),
        title: 'Meeting with boss',
        completed: false
      }
    ]
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
    this.setState({ todos: [...this.state.todos.filter(
      todo => todo.id !== id)] }) // spread operator copies everything in there
  }

  // Add Todo
  addTodo = (title) => {
    //console.log(title)
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] })
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
