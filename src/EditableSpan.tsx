import { TextField } from "@mui/material"
import { useState, ChangeEvent } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => { 
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
    ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
        
}

export default EditableSpan