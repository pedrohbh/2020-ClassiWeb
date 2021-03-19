import React, { useState } from 'react';

import Logotipo from "../../assets/ClassiWeb.png";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';

import './styles.css'
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "500px",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function RegisterForm() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="formContainer">
      <h1>Cadastre-se para começar a usar!</h1>
      <form noValidate autoComplete="off">
          <TextField required id="outlined-basic" label="Nome" variant="outlined" />
          <TextField required id="outlined-basic" label="Sobrenome" variant="outlined" />
          <TextField required id="outlined-basic" label="CPF"  variant="outlined" />
          <TextField required id="outlined-basic" label="Endereço" variant="outlined" />
          <div className="address">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">UF</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="UF"
              >
                <MenuItem value={10}>Espírito Santo</MenuItem>
                <MenuItem value={20}>Rio de Janeiro</MenuItem>
                <MenuItem value={30}>São Paulo</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Cidade"
              >
                <MenuItem value={10}>Vila Velha</MenuItem>
                <MenuItem value={20}>Serra</MenuItem>
                <MenuItem value={30}>Vitória</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField required id="outlined-basic" label="E-mail" variant="outlined" />
          <TextField required id="outlined-basic" type="password" label="Senha" variant="outlined" />
          <TextField required id="outlined-basic" type="password" label="Confirmar" variant="outlined" />
      </form>
      <StyledButton variant="contained">
        Cadastrar!
      </StyledButton>
    </div>
  );
}