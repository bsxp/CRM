import React from 'react'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export default function AddButton({action}) {

    return (
        <Button variant="contained" endIcon={<AddIcon/>} style={{backgroundColor:'#2979ff', float: 'right', color: 'white'}} onClick={action}>
            Add
        </Button>
    )

}