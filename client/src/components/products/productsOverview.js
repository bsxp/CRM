import React from 'react'
import { Grid, Button, Snackbar, Modal, Fade, Backdrop } from '@material-ui/core'
import { connect } from 'react-redux' 
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables"
import MuiAlert from '@material-ui/lab/Alert';
import NewProductCard from './newProductCard'
import { fetchProducts, createProduct } from '../../actions'
import AddButton from '../shared/addButton';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class ProductsOverview extends React.Component {

    state = {
        modalOpen: false,
        snackbarOpen: false,
        snackbarMessage: "Did not retrieve upload response",
        uploadSeverity: "warning"
    }

    columns = ["Product Name", "Description", "ID", "Price", ""];

    options = {
        filterType: 'multiselect',
        elevation: 0
    };

    currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    generateProductList = (products=[]) => {

        let list = []

        for (let product of products) {
            list.push([product.productName, product.description, product.identifier, this.currencyFormatter.format(product.price/100)])
        }

        return list

    }

    handleOpen = () => {
        this.setState({...this.state, modalOpen: true})
    }
    
    handleClose = () => {
        this.setState({...this.state, modalOpen: false})
    }

    handleSnackbar = (res) => {

        if (res.status === 201) {
            this.setState({
                ...this.state,
                snackbarOpen: true,
                snackbarMessage: `Successfully created product profile for ${res.data.productName}`,
                uploadSeverity: "success"
            })
        } else {
            this.setState({
                ...this.state,
                snackbarOpen: true,
                snackbarMessage: "Error receiving add product request",
                uploadSeverity: "error"
            })
        }
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({...this.state, snackbarOpen: false})
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AddButton action={this.handleOpen} />
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={"Product List"}
                            data={this.generateProductList(this.props.products)}
                            columns={this.columns}
                            options={this.options}
                        />
                    </Grid>
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeAfterTransition
                    disableAutoFocus
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <Fade in={this.state.modalOpen}>
                        <NewProductCard dismissModal={this.handleClose} createProduct={this.props.createProduct} handleSnackbar={this.handleSnackbar}/>
                    </Fade>
                </Modal>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={3000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.state.uploadSeverity}>
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>     
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, { createProduct })(ProductsOverview)