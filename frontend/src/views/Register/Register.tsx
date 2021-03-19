// nome, CPF, endereço, email e senha.

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import './styles.css'
import { Container } from '@material-ui/core';

export default function FormPropsTextFields() {

  return (
    <div className="formContainer">
      <h1>Cadastre-se!</h1>
      <form noValidate autoComplete="off">
          <TextField required id="outlined-basic" label="Nome" variant="outlined" />
          <TextField required id="outlined-basic" label="Sobrenome" variant="outlined" />
          <TextField required id="outlined-basic" label="CPF"  variant="outlined" />
          <TextField required id="outlined-basic" label="Endereço" variant="outlined" />
          <TextField required id="outlined-basic" label="E-mail" variant="outlined" />
          <TextField required id="outlined-basic" type="password" label="Senha" variant="outlined" />
          <TextField required id="outlined-basic" type="password" label="Confirmar" variant="outlined" />
      </form>
    </div>
  );
}
