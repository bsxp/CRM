import React from 'react'
import {
    Card, CardHeader, CardContent, CardActions, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel, IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

class NewProductCard extends React.Component {
    
    state = {
        productName: "",
        description: "",
        price: 0,
    }

    handleSubmit = async () => {

        await this.props.createProduct({...this.state})
        .then(res => {
            this.props.handleSnackbar(res)
            this.props.dismissModal()
        })
        .catch(err => {
            this.props.handleSnackbar(err)
            this.props.dismissModal()
        })

    }

    render() {
        return (
            <Card style={{minHeight:'30%', minWidth: '50%', outline: 'none'}}>
                <CardHeader title="Add new product" action={<IconButton onClick={() => this.props.dismissModal()}><CloseIcon/></IconButton>}/>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required id="primary" variant="filled" label="Product Name" value={this.state.productName} onInput={(e) => this.setState({...this.state, productName: e.target.value})} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="secondary" variant="filled" label="Description" value={this.state.description} onInput={(e) => this.setState({...this.state, description: e.target.value})} fullWidth multiline/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="location" variant="filled" label="Price" value={this.state.price} onInput={(e) => this.setState({...this.state, price: e.target.value})} fullWidth/>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Save
                    </Button>
                </CardActions>
            </Card>
        )
    }
}



export default NewProductCard