import React from 'react'
import { Grid, Typography, Paper, AppBar, Tabs, Tab, Box, Button } from '@material-ui/core'
import CustomerOverview from './customerOverview';
import OrderList from './orderList';
import { Link } from 'react-router-dom'



// Necessary components:
// List of orders
// List of contacts
// Basic company information
// Graph of monthly orders
// Number of orders

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

class CustomerNavigator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: 0
    }
  }

  handleChange = (event, newValue) => {
      this.setState({...this.state, tab: newValue})
  }

  renderPanel = index => {
    switch (index) {
      case 0:
        return <CustomerOverview props={this.state} />
      case 1:
        return "People"
      case 2:
        return <OrderList orders={this.state.orders}/>
      default:
        return <CustomerOverview props={this.state} /> 
    }
  }

  render () {
      return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="h4">
                            {this.props.location.state.primaryName}
                        </Typography>
                        <Typography variant="body2">
                            {this.props.location.state.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
              <AppBar position="static" elevation={0}>
                <Tabs
                    style={{backgroundColor:'white'}}
                    textColor="primary"
                    variant="fullWidth"
                    value={this.state.tab}
                    onChange={this.handleChange}
                    aria-label="nav tabs example"
                    indicatorColor="primary"
                >
                  <LinkTab label="Overview" href="/top" {...a11yProps(0)} />
                  <LinkTab label="People" href="/people" {...a11yProps(1)} />
                  <LinkTab label="Orders" href="/orders" {...a11yProps(2)} />
              </Tabs>
          </AppBar>
            <div style={{marginTop: '20px'}}>
              {this.renderPanel(this.state.tab)}
            </div>
        </Grid>
      </Grid>
    )
  }
}

export default CustomerNavigator