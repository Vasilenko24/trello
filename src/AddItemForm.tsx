import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import { Icon, IconButton, TextField } from "@mui/material";
import AddCircleOutlined from '@mui/icons-material/AddCircle';
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [value, setValue] = useState('');
    const [error, setError] = useState<String | null>(null);
    function onNewTitleChangeHandler (e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    function onKeyPressHandler (e: KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {
             addTask();
        }
        setError('')
     }

     function addTask () {
        if(value.trim() !== '' && value.length >= 3) {
         props.addItem(value);
         setValue('');
        } else {
         setError('Field is required')
        } 
     }

    return <div>
        <TextField
           value={value}
           variant="standard"
           size="small"
           onChange={onNewTitleChangeHandler}
           onKeyDown={onKeyPressHandler}
           error={!!error}
           helperText={error}
    />
    <IconButton onClick={addTask}>
    <AddCircleOutlined color="primary"></AddCircleOutlined>
     </IconButton>
</div>
}