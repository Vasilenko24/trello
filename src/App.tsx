import React from 'react';
import './App.css';
import TodoList from "./Todolist";

function App() {
    const tasks1 = [
        {id: 1, title: 'Bihavior', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'XXX', isDone: true},
        {id: 2, title: 'Netflix', isDone: false},
        {id: 3, title: 'Helloween', isDone: false}
    ]
  return (
    <div className="App">
      <TodoList tasks={tasks1} title='What have to learn?'/>
        <TodoList tasks={tasks2} title='What have to drink?'/>
    </div>
  );
}



export default App;
