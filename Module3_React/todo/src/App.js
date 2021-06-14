import React, { Component } from 'react';
import InputBox from "./components/InputBox/InputBox.jsx";
import TodosList from "./components/TodosList/TodosList.jsx";

class App extends Component {
  state = { 
    todos: [
      { id : "1", todo: "Learn JSX"},
      { id : "2", todo: "Learn CSS"},
      { id : "3", todo: "Learn ES6"},
      { id : "4", todo: "Learn React"},
      { id : "5", todo: "Learn JS"},
    ],
   };
  render() { 
    let todos = this.state.todos;
    return ( 
      <div className="App">
        <InputBox></InputBox>
        <TodosList todos={todos}></TodosList>
      </div>
     );
  }
}
 
export default App;