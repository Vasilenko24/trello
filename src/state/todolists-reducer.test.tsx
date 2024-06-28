import { RemoveTodolistAC, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistType } from "../App";

test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: 'word is me', filter: 'all'},
        {id: todoListId2, title: 'Where is my pan', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})