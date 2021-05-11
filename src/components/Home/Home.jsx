import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
export default class Home extends React.Component{
    render(){
        return(
            <>
                <div >
      <Grid container>
        <Grid item xs={6}>
           <Paper >xs=6</Paper>
        <div id="chartdiv"></div>
        </Grid>

        <Grid item xs={6}>
           <Paper >xs=6</Paper>
        <div id="chartdiv" className="w-100" style={{height:"100px"}}></div>
        </Grid>
        

        </Grid>
        </div>
            </>
        )
    }
}