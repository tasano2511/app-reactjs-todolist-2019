import React, { Component } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

class Todos extends Component {
    
    // markComplete = () => {
    //     console.log('Hello')
    // }

    render() {
        return this.props.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} 
            delTodo={this.props.delTodo} />
            //<h3>{ todo.title }</h3>
        ))
        // console.log(this.props.todos)
    }
}

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}

export default Todos;
