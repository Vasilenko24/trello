import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import TodoList, {ITask} from "./Todolist";
import {v1} from 'uuid'

export type FilterValuesType = "all" | "completed" | "active"
function App() {


    const [tasks,setTasks] = useState<ITask[]>([
        {id: v1(), title: 'Bihavior', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const [filter,setFilter] = useState<FilterValuesType>('all');

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks)
    }

    function addTask(value: string) {
        let newTask =  {
            id: v1(),
            title: value,
            isDone: false
        }
        setTasks(prevTask => [...tasks, newTask])
    }

    let taskForTodoList = useMemo(() => {
        switch (filter) {
             case 'completed':
                 return tasks.filter(task => task.isDone);
                 case 'active':
                     return tasks.filter(task => !task.isDone);
            default:
                         return tasks
        }
    },[tasks, filter]);

    function changeFilter(value: FilterValuesType) {
        setFilter(value)

    }

  return (
    <div className="App">
      <TodoList tasks={taskForTodoList}
                title='What have to learn?'
                addTask={addTask}
                changeFilter={changeFilter}
                removeTasks={removeTasks}/>
    </div>
  );
}



export default App;
