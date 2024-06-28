import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import { AddItemForm } from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface ITask {
    id: string,
    title: string,
    isDone: boolean,
}

interface IPropsType {
    id: string
    title: string
    tasks: Array<ITask>;
    removeTasks: (id: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    addTask: (value:string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType
}

function TodoList (props:IPropsType) {

    const onAllClickHanlder = () => props.changeFilter('all', props.id)
    const onActiveClickHanlder = () => props.changeFilter('active', props.id)
    const onCompletedClickHanlder = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton onClick={removeTodoList} aria-label="delete" size="small">
                         <DeleteIcon fontSize="inherit" />
                        </IconButton>
             </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {

                    const onRemoveTasks = () => {
                        props.removeTasks(task.id, props.id)
                    }

                    const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(task.id, newValue, props.id);
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                              <Checkbox
                                 onChange={onChangeStatusHandler}
                                 checked={task.isDone}
                                />


                        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveTasks} aria-label="delete" size="small">
                         <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </li>
                }
                )}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHanlder}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHanlder}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHanlder}>Completed</Button>
            </div>
        </div>
    )
}



export default TodoList