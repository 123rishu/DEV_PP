import React from 'react';
import { Container, Grid, Paper, Button, makeStyles } from '@material-ui/core';

const Grids = () => {
    return ( 
    <div>

        <Grid container>
            <Grid item xs={5} sm={2} md={5}>
                <Paper>Item1</Paper>
            </Grid>

            <Grid item xs={5} sm={2} md={5}>
                <Paper>Item2</Paper>
            </Grid>

            <Grid item xs={5} sm={8} md={2}>
                <Paper>Item3</Paper>
            </Grid>

        </Grid>
    </div> );
}
 
export default Grids;