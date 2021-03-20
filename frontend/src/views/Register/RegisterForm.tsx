import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Address from './Address';

const StyledButton = withStyles({
  root: {
    background: '#E65252',
    borderRadius: 3,
    marginBottom: "1vh",
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const StyledTextField = withStyles({
  root: {
    width: "80%",
  },
})(TextField);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "43vw",
      float: "right",
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },

    text: {
      margin: 0,
      marginBottom: "5%",
      textAlign: "center",
    },

    formContainer: {
      margin: 0,
      rowGap: "1vh",
      width: "100%",
      display: "flex",
      marginBottom: "3vh",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-around",
    },

    address:{
      width:"80%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },  
  }),
);

export default function RegisterForm() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Cadastre-se para começar a usar!</h1>
      <form className={classes.formContainer} autoComplete="off">
          <StyledTextField required id="name" label="Nome" variant="outlined" />
          <StyledTextField required id="lastName" label="Sobrenome" variant="outlined" />
          <StyledTextField required id="cpf" label="CPF"  variant="outlined" />
          <Address/>
          <StyledTextField required id="email" type="email"    label="E-mail" variant="outlined" />
          <StyledTextField required id="password" type="password" label="Senha" variant="outlined" />
          <StyledTextField required id="passwordConfirm" type="password" label="Confirmar Senha" variant="outlined" />
      </form>
      <StyledButton variant="contained">
        Cadastrar!
      </StyledButton>
    </div>
  );
}