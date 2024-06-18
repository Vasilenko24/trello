import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export interface ITask {
    id: string,
    title: string,
    isDone: boolean,
}

interface IPropsType {
    title: string
    tasks: Array<ITask>;
    removeTasks: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (value:string) => void;
}

function TodoList (props:IPropsType) {

    const [value, setValue] = useState('');

    function onNewTitleChangeHandler (e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    function onKeyPressHandler (e: KeyboardEvent<HTMLInputElement>) {
       if(e.key === 'Enter') {
            addTask();
       }
    }

    function addTask () {
        props.addTask(value);
        setValue('');
    }

    function onAllClickHanlder () {
        props.changeFilter('all')
    }
    function onActiveClickHanlder () {
        props.changeFilter('active')
    }
    function onCompletedClickHanlder () {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {props.tasks.map(task => {

                    const onRemoveTasks = () => {
                        props.removeTasks(task.id)
                    }

                    return <li key={task.id}><input
                    type="checkbox"
                    checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveTasks}>X</button>
                    </li>
                }
                )}
            </ul>
            <div>
                <button onClick={onAllClickHanlder}>All</button>
                <button onClick={onActiveClickHanlder}>Active</button>
                <button onClick={onCompletedClickHanlder}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList