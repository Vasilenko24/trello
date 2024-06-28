import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import TodoList, {ITask} from "./Todolist";
import {v1} from 'uuid'
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<ITask>
}



function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todolists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'word is me', filter: 'active'},
        {id: todoListId2, title: 'Where is my pan', filter: 'completed'}
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'Bihavior', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Node.js', isDone: true},
            {id: v1(), title: 'TypeScript', isDone: true},
        ]
    })

    function removeTasks(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(task => task.id !== id);
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }
    
    function removeTodoList(todoListId: string) {
        let filtredTodoList = todolists.filter(tl => tl.id !== todoListId)
        setTodoLists(filtredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if(todolist) {
            todolist.title = newTitle
            setTodoLists([...todolists])
        }
    }    

    function changeStatus (taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if(task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle (taskId: string, newValue: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if(task) {
            task.title = newValue
            setTasks({...tasksObj})
        }
    }

    

    function addTask(value: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task =  {
            id: v1(),
            title: value,
            isDone: false
        }
        let newTasks = [...tasks, task]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId)
        if(todolist) {
            todolist.filter = value
            setTodoLists([...todolists])
        }
    }



    function addTodoList(title:string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title
        }
        setTodoLists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id] : []
        })
    }
    console.log(tasksObj);
    

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

     <Container fixed>
        <Grid container style={{padding: "10px"}}>
        <AddItemForm addItem={addTodoList}/>
        </Grid>
 
        <Grid container spacing={3}>
        {todolists.map((tl) => {

               let taskForTodoList = tasksObj[tl.id] 

                if(tl.filter === 'active') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === false)

                } else if(tl.filter === 'completed') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                }

            return <Grid item>
                <Paper style={{padding: "10px"}}>
            <TodoList tasks={taskForTodoList}
            key={tl.id}
            id={tl.id}
            title={tl.title}
            addTask={addTask}
            removeTodoList={removeTodoList}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
            changeFilter={changeFilter}
            removeTasks={removeTasks}
            filter={tl.filter}/>
            </Paper>
            </Grid>
        })}
        </Grid>
     </Container>
      
    </div>
  );
}



export default App;
