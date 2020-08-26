import React from 'react'
import {
    Card, CardHeader, CardContent, CardActions, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel, IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

class NewCustomerCard extends React.Component {
    
    state = {
        primaryName: "",
        description: "",
        location: "",
        email: "",
        phone: "",
        businessType: ""
    }

    handleChange = (event) => {
        this.setState({...this.state, businessType: event.target.value})
    }


    handleSubmit = async () => {

        await this.props.createCustomer({...this.state})
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
                <CardHeader title="Add new customer" action={<IconButton onClick={() => this.props.dismissModal()}><CloseIcon/></IconButton>}/>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required id="primary" variant="filled" label="Business Name" value={this.state.primaryName} onInput={(e) => this.setState({...this.state, primaryName: e.target.value})} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="secondary" variant="filled" label="Description" value={this.state.description} onInput={(e) => this.setState({...this.state, description: e.target.value})} fullWidth multiline/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="location" variant="filled" label="Location" value={this.state.location} onInput={(e) => this.setState({...this.state, location: e.target.value})} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="filled" style={{minWidth: 120}} fullWidth>
                                <InputLabel id="demo-simple-select-filled-label">Business type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={this.state.businessType}
                                    onChange={this.handleChange}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"corp"}>Company</MenuItem>
                                <MenuItem value={"sole"}>Individual</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="email" variant="filled" label="Email" value={this.state.email} onInput={(e)=> this.setState({...this.state, email: e.target.value})} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="phone" variant="filled" label="Phone" value={this.state.phone} onInput={(e) => this.setState({...this.state, phone: e.target.value})} fullWidth/>
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



export default NewCustomerCard