import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Paper, IconButton } from '@material-ui/core' 
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EqualizerIcon from '@material-ui/icons/Equalizer'


const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const commaFormatter = new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 3
})

const GrayTextTypography = withStyles({
    root: {
      color: "#a6a6a6"
    }
  })(Typography);

function totalOrderValue(value) {

    return (
        <Paper style={{minWidth: '100%', minHeight: '100%'}}>
            <Grid container style={{padding: '5px'}}>
                <Grid item xs={9} style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    <div style={{marginLeft: '10px', padding: '3px'}}>
                        <GrayTextTypography variant="overline">
                            Lifetime Order Value
                        </GrayTextTypography>
                        <Typography variant="h6">
                            {currencyFormatter.format(value)}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={3} style={{display: 'flex', justifyContent: 'flex-end', verticalAlign: 'middle', textAlign: 'center', padding: '3px'}}>
                    <IconButton style={{backgroundColor: '#2979ff', minWidth: '75%', position: 'relative', borderRadius: '5px'}}>
                        <AttachMoneyIcon style={{color:'white'}}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

function latestOrder(orderInfo) {

    return (
        <Paper style={{minWidth: '100%', minHeight: '100%'}}>
            <Grid container style={{padding: '5px'}}>
                <Grid item xs={9} style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    <div style={{marginLeft: '10px', padding: '3px'}}>
                        <GrayTextTypography variant="overline">
                            Latest Order
                        </GrayTextTypography>
                        <Typography variant="h6">
                            {orderInfo.name}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={3} style={{display: 'flex', justifyContent: 'flex-end', verticalAlign: 'middle', textAlign: 'center', padding: '3px'}}>
                    <IconButton style={{backgroundColor: '#2979ff', minWidth: '75%', position: 'relative', borderRadius: '5px'}}>
                        <ReceiptIcon style={{color:'white'}}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

function orderCount(count) {

    return (
        <Paper style={{minWidth: '100%', minHeight: '100%'}}>
            <Grid container style={{padding: '5px'}}>
                <Grid item xs={9} style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    <div style={{marginLeft: '10px', padding: '3px'}}>
                        <GrayTextTypography variant="overline">
                            Order Count
                        </GrayTextTypography>
                        <Typography variant="h6">
                            {commaFormatter.format(count)}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={3} style={{display: 'flex', justifyContent: 'flex-end', verticalAlign: 'middle', textAlign: 'center', padding: '3px'}}>
                    <IconButton style={{backgroundColor: '#2979ff', minWidth: '75%', position: 'relative', borderRadius: '5px'}}>
                        <EqualizerIcon style={{color:'white'}}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

class CustomerOverview extends React.Component {

    constructor(props) {
        super(props)

        this.state = {...props}
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {totalOrderValue(100000)}
                        </Grid>
                        <Grid item xs={4}>
                            {latestOrder({name: "A Seattle Company"})}
                        </Grid>
                        <Grid item xs={4}>
                            {orderCount(21000)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default CustomerOverview