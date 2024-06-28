import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"

type removeTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type addTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActiontsType = removeTodoListActionType  | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActiontsType): Array<TodolistType> => {
    switch(action.type) {
        case 'REMOVE-TODOLIST': 
            return state.filter(tl => tl.id !== action.id)
            case 'ADD-TODOLIST': 
            return [...state, {
                id: v1(),
                title: 'Hello',
                filter: 'all'
            }]
            case 'CHANGE-TODOLIST-TITLE': {
                const todoList = state.find(tl => tl.id === action.id)
                if(todoList) {
                    todoList.title = action.title
                }
                return [...state]
            }
            case 'CHANGE-TODOLIST-FILTER': {
                const todoList = state.find(tl => tl.id === action.id)
                if(todoList) {
                    todoList.filter = action.filter
                }
                return [...state]
            }

        default:
            return state
    }
      
}
export const RemoveTodolistAC = (todolistId: string):removeTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistId
    }
}

export const AddTodolistAC = (title: string):addTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title
    }
}
export const ChangeTodolistTitleAC = (id:string, title: string):changeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title
    }
}
export const ChangeTodolistFiltereAC = (id:string, filter: FilterValuesType):changeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    }
}


