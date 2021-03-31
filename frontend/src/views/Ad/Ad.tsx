import { Grid } from '@material-ui/core';
import React from 'react';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';

export default function Ad() {

  return (
    <>
    <Grid container direction="column" justify="flex-start" alignItems="flex-start" style={{minHeight: "89vh"}}>
      
      <Grid item xs={12}>
        <AppBar/>
      </Grid>

      <Grid container item xs={12} justify='center' style={{ marginTop: "70px" }}>
        <Grid item xs={9} style={{ height:"100px", backgroundColor: 'black'}}>

        </Grid>
      </Grid>
      
    </Grid>
    <Footer/>
    </>
  );
}