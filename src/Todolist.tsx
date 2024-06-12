import React from "react";

interface ITask {
    id: number,
    title: string,
    isDone: boolean,
}

interface IPropsType {
    title: string
    tasks: Array<ITask>;
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
                <li><input type="checkbox" key={props.tasks[0].id} checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" key={props.tasks[1].id} checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" key={props.tasks[2].id} checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList