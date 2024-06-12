import React from "react";
import {FilterValuesType} from "./App";

export interface ITask {
    id: number,
    title: string,
    isDone: boolean,
}

interface IPropsType {
    title: string
    tasks: Array<ITask>;
    removeTasks: (id: number) => void;
    changeFilter: (value: FilterValuesType) => void;
}

function TodoList (props:IPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>Add</button>
            </div>
            <ul>
                {props.tasks.map(task => <li><input type="checkbox" key={task.id} checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTasks(task.id)}>X</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList