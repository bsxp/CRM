import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Divider, // List items
    IconButton, Typography, Button, // General items
    Modal, Fade, Backdrop,
    Snackbar, Grid
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import BusinessIcon from '@material-ui/icons/Business'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import AddIcon from '@material-ui/icons/Add';
import { fetchCustomers, createCustomer } from '../../actions'
import NewCustomerCard from './newCustomerCard'
import { Link } from 'react-router-dom'
import AddButton from '../shared/addButton'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class CustomerList extends React.Component {

    state = {
        modalOpen: false,
        snackbarOpen: false,
        snackbarMessage: "Did not retrieve upload response",
        uploadSeverity: "warning"
    }

    generateListItems = () => {

        return this.props.customers.map(customer => {
            return (
                <React.Fragment key={customer.identifier}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                    <BusinessIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={customer.primaryName}
                            secondary={customer.location}
                        />
                        <ListItemSecondaryAction>
                            <IconButton component={Link} to={{pathname: `/platform/customers/${customer.primaryName}`, state: customer}}>
                                    <KeyboardArrowRightIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            )
        })
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
                snackbarMessage: `Successfully created customer profile for ${res.data.primaryName}`,
                uploadSeverity: "success"
            })
        } else {
            this.setState({
                ...this.state,
                snackbarOpen: true,
                snackbarMessage: "Error receiving add customer request",
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
                <Grid container>
                    <Grid item xs={10}>
                        <Typography style={{textAlign: 'left'}}>
                            My Customers
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <AddButton action={this.handleOpen}/>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {this.generateListItems()}
                        </List>
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
                        <NewCustomerCard dismissModal={this.handleClose} createCustomer={this.props.createCustomer} handleSnackbar={this.handleSnackbar}/>
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

export default connect(mapStateToProps)(CustomerList)