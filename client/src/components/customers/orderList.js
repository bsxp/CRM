import React from 'react'
import { Grid, Button, Snackbar, Modal, Fade, Backdrop } from '@material-ui/core'
import { connect } from 'react-redux' 
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables"
import MuiAlert from '@material-ui/lab/Alert';
import NewOrderCard from './newOrderCard';
import { createOrder } from '../../actions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class OrderList extends React.Component {

    state = {
        modalOpen: false,
        snackbarOpen: false,
        snackbarMessage: "Did not retrieve upload response",
        uploadSeverity: "warning"
    }

    columns = ["Date", "Order ID", "Placed by", "Notes", ""];

    options = {
        filterType: 'multiselect',
        elevation: 0
    };

    generateOrderList = (orders=[]) => {

        let list = []

        for (let order of orders) {
            list.push([order.date, order.id, order.placedBy, order.notes])
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
                snackbarMessage: `Order successfully created!`,
                uploadSeverity: "success"
            })
        } else {
            this.setState({
                ...this.state,
                snackbarOpen: true,
                snackbarMessage: "Error receiving add order request",
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
                        <Button variant="contained" endIcon={<AddIcon/>} style={{backgroundColor:'#2979ff', float: 'right', color: 'white'}} onClick={this.handleOpen}>
                            New
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={"Order List"}
                            data={this.generateOrderList(this.props.orders)}
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
                        <NewOrderCard dismissModal={this.handleClose} createOrder={this.props.createOrder} handleSnackbar={this.handleSnackbar}/>
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
        customers: state.customers
    }
}

export default connect(null, { createOrder })(OrderList)