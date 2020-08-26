import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Switch, Route, Link } from 'react-router-dom';
import CustomerList from './customers/customerList';
import ListIcon from '@material-ui/icons/List'
import PeopleIcon from '@material-ui/icons/People'
import ProductsOverview from './products/productsOverview';
import MenuItem from '@material-ui/core/MenuItem'
import CustomerNavigator from './customers/customerNavigator';
import { fetchCustomers, fetchProducts } from '../actions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function generateListItems() {
    return (
        [
          ['Customers', <PeopleIcon/>, "/platform/customers"],
          ['Products', <ListIcon/>, "/platform/products"], 
      ].map((items) => (
            <MenuItem component={Link} to={items[2]} key={items[0]} style={{minHeight: '50px'}}>
                <ListItemIcon>
                    {items[1]}
                </ListItemIcon>
                <Typography variant="inherit">{items[0]}</Typography>
            </MenuItem>
        ))
    )
}

function UserNav(props) {
  const classes = useStyles();

  props.fetchCustomers()
  props.fetchProducts()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
            {generateListItems()}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route exact path="/platform" component={CustomerList}/>
            <Route exact path="/platform/customers" component={CustomerList}/>
            <Route path="/platform/products" component={ProductsOverview}/>
            <Route exact path="/platform/customers/:id" component={CustomerNavigator}/>
        </Switch>
      </main>
    </div>
  );
}

export default connect(null, {fetchCustomers, fetchProducts})(UserNav)