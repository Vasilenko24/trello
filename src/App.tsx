import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import TodoList, {ITask} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"
function App() {


    const [tasks,setTasks] = useState<ITask[]>([
        {id: 1, title: 'Bihavior', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const [filter,setFilter] = useState<FilterValuesType>('all');

    function removeTasks(id: number) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks)
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
                changeFilter={changeFilter}
                removeTasks={removeTasks}/>
    </div>
  );
}



export default App;
