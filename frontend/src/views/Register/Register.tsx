// nome, CPF, endereço, email e senha.

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';

import './styles.css'
import { Button, Container } from '@material-ui/core';
import Logotipo from "../../assets/ClassiWeb.png";

const StyledButton = withStyles({
  root: {
    background: '#E65252',
    borderRadius: 3,
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

export default function FormPropsTextFields() {

  return (
    <>
    <div className="frame">
      <img src={Logotipo} alt="ClassiWeb" style={{height: '200px', minHeight: '200px'}}/>
      <div className="message">
        <p>Seja bem-vindo ao <em><b>ClassiWeb</b></em></p>
        <p>O <b>maior</b> portal de classificados da internet!</p>
      </div>
    </div>
    <div className="formContainer">
      <h1>Cadastre-se para começar a usar!</h1>
      <form noValidate autoComplete="off">
          <TextField required id="outlined-basic" label="Nome" variant="outlined" />
          <TextField required id="outlined-basic" label="Sobrenome" variant="outlined" />
          <TextField required id="outlined-basic" label="CPF"  variant="outlined" />
          <TextField required id="outlined-basic" label="Endereço" variant="outlined" />
          <TextField required id="outlined-basic" label="E-mail" variant="outlined" />
          <TextField required id="outlined-basic" type="password" label="Senha" variant="outlined" />
          <TextField required id="outlined-basic" type="password" label="Confirmar" variant="outlined" />
      </form>
      <StyledButton variant="contained">
        Cadastrar!
      </StyledButton>
    </div>
    </>
  );
}
