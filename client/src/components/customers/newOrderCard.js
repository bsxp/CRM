import React from 'react'
import { connect } from 'react-redux'
import {
    Card, CardHeader, CardContent, CardActions, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel, IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import AddButton from '../shared/addButton'
import MaterialTable from 'material-table'
import OrderProductsTable from './orderProductTable'

class NewOrderCard extends React.Component {
    
    state = {
        orderName: "",
        description: "",
        selectedProducts: []
    }

    options = {
        filterType: 'multiselect',
        elevation: 0
    }

    columns = ["Product", "Quantity", ""]

    handleChange = (event) => {
        this.setState({...this.state, businessType: event.target.value})
    }


    handleSubmit = async () => {

        await this.props.createOrder({...this.state})
        .then(res => {
            this.props.handleSnackbar(res)
            this.props.dismissModal()
        })
        .catch(err => {
            this.props.handleSnackbar(err)
            this.props.dismissModal()
        })

    }

    generateProductMenu = () => {
        return this.props.products.map(product => {
            return (
                <MenuItem value={product.identifier}>{product.productName}</MenuItem>
            )
        })
    }

    render() {

        console.log('loading?')
        return (
            <Card style={{minHeight:'30%', minWidth: '50%', outline: 'none'}}>
                <CardHeader title="Create new order" action={<IconButton onClick={() => this.props.dismissModal()}><CloseIcon/></IconButton>}/>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required id="primary" variant="filled" label="Order Name" value={this.state.orderName} onInput={(e) => this.setState({...this.state, orderName: e.target.value})} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="secondary" variant="filled" label="Other info" value={this.state.description} onInput={(e) => this.setState({...this.state, description: e.target.value})} fullWidth multiline/>
                        </Grid>
                        <Grid item xs={12}>
                            {/* {this.generateProductsTable()} */}
                            <OrderProductsTable />
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

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(NewOrderCard)