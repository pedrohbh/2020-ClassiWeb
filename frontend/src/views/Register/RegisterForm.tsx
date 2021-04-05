import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { validate as validatorCPF } from 'gerador-validador-cpf';
import { AnyARecord } from 'node:dns';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import validator from 'validator';
import Address from '../../components/Address';

import UserController from '../../controllers/UserController';

const StyledButton = withStyles({
  root: {
    background: '#E65252',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': { 
      background: '#fc7474' 
    },
    marginTop: "2%",
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
      display: "flex",
      flexDirection: "column",
      width: "80%",
      alignItems: "center",
      marginTop: "5%",
    },
  }),
);

export default function RegisterForm() {
  const classes = useStyles();

  const [address, setAddress] = useState({});

  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleValidateEmail = event => {
    const value = event.target.value ?? "";
    
    if (validator.isEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("E-mail inválido");
    }
  }

  const handleValidateCPF = event => {
    const value = event.target.value ?? "";
    
    if (validatorCPF(value)) {
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  }

  const handleValidatePassword = event => {
    const password = event
      .target
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .querySelector("#password")
      .value;

    const passwordConfirm = event.target.value;
    
    if (password === passwordConfirm) {
      setPasswordError("");
    } else {
      setPasswordError("Senhas diferentes");
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const inputs = Object.values(event.target);
    const formData: any = inputs
      .filter((el: any) => el.tagName === "INPUT" && el.id)
      .reduce((data: any, input: any) => ({...data, [input.id]: input.value}), {});

    const newUser = { ...formData, address };

    if(validatorCPF(newUser.cpf) && validator.isEmail(newUser.email) && newUser.password === newUser.passwordConfirm){
      const token = await UserController.postUser(newUser);
      console.log(token);
      return;
    }
  }

  return (
    <Grid container direction="column" alignItems="center" style={{height: '100%', justifyContent: 'center'}}>
      <h1 className={classes.text}>Cadastre-se para começar a usar!</h1>
      
      <form className={classes.formContainer} autoComplete="off" onSubmit={handleSubmit}>

          <Grid container alignItems="center" justify="space-around" spacing={1}>

            <Grid item xs={12}>
              <StyledTextField required id="name" label="Nome"/>
            </Grid>

            <Grid item xs={12}>
              <NumberFormat format="###.###.###-##" mask="_" customInput={(props) => (
                <StyledTextField required id="cpf" label="CPF"
                error={!!cpfError} helperText={cpfError} {...props} onBlur={handleValidateCPF}/>
              )}/>
            </Grid>

            <Grid item xs={12}>
              <Address onChange={ newAddress => setAddress(newAddress) }/>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField required id="email" type="email" label="E-mail" 
                error={!!emailError} helperText={emailError} onBlur={handleValidateEmail} 
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField 
                required 
                id="password" 
                type="password" 
                label="Senha" 
                inputProps={{ minLength: 8, maxLength: 100 }}/>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField 
                required 
                id="passwordConfirm" 
                type="password" 
                label="Confirmar Senha"
                error={!!passwordError} 
                helperText={passwordError} 
                onBlur={handleValidatePassword}/>
            </Grid>

          </Grid>

          <StyledButton type="submit" variant="contained">
            Cadastrar!
          </StyledButton>
          
      </form>
    </Grid>
  );
}