import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Address from './Address';

const StyledButton = withStyles({
  root: {
    background: '#E65252',
    color: 'white',
    // height: 48,
    // padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

  label: {
    textTransform: 'capitalize',
  },
})((props: any) => <Button size="large" {...props}/>);

const StyledTextField = props => <TextField fullWidth variant="outlined" {...props} />

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      textAlign: "center",
    },

    formContainer: {
      width: "80%",
    },
  }),
);

export default function RegisterForm() {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" justify="space-evenly" style={{height: '100%'}}>
      <h1 className={classes.text}>Cadastre-se para começar a usar!</h1>
      
      <form className={classes.formContainer} autoComplete="off">
          <Grid container alignItems="center" justify="space-around" spacing={1}>
            <Grid item xs={12}>
              <StyledTextField required id="name" label="Nome"/>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="lastName" label="Sobrenome"/>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="cpf" label="CPF"/>
            </Grid>
            <Grid item xs={12}>
              <Address/>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="email" type="email" label="E-mail"/>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="password" type="password" label="Senha"/>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="passwordConfirm" type="password" label="Confirmar Senha"/>
            </Grid>
          </Grid>
          
      </form>
      
      <StyledButton variant="contained">
        Cadastrar!
      </StyledButton>
    </Grid>
  );
}