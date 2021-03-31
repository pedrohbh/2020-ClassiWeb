import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { validate as validatorCPF } from 'gerador-validador-cpf';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import validator from 'validator';
import Address from '../../components/Address';

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

  const urlPost = 'url';

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
    console.log(value);
    
    
    if (validatorCPF(value)) {
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  }

  const handleValidatePassword = event => {
    // TODO Ajeitar a forma de acessar o valor de password
    const password = event
      .target
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .querySelector("#password")
      .value;

    const passwordConfirm = event.target.value;
    
    if (password == passwordConfirm) {
      setPasswordError("");
    } else {
      setPasswordError("Senhas diferentes");
    }
  }

  const handlingSubmit = event => {
    event.preventDefault();

    const cpf = event.target.querySelector("#cpf").value;
    const email = event.target.querySelector("#email").value;
    const password = event.target.querySelector("#password").value;
    const passwordConfirm = event.target.querySelector("#passwordConfirm").value;

    if(validatorCPF(cpf) && validator.isEmail(email) && password === passwordConfirm){
      event.target.submit();
      return;
    }

  }

  return (
    <Grid container direction="column" alignItems="center" style={{height: '100%', justifyContent: 'center'}}>
      <h1 className={classes.text}>Cadastre-se para começar a usar!</h1>
      
      <form method='POST' action={urlPost} className={classes.formContainer} autoComplete="off" onSubmit={handlingSubmit}>
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
              <Address/>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="email" type="email" label="E-mail" 
                error={!!emailError} helperText={emailError} onBlur={handleValidateEmail} 
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="password" type="password" label="Senha" />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField required id="passwordConfirm" type="password" label="Confirmar Senha"
                error={!!passwordError} helperText={passwordError} onBlur={handleValidatePassword}/>
            </Grid>
          </Grid>
          <StyledButton type="submit" variant="contained">
            Cadastrar!
          </StyledButton>
      </form>
    </Grid>
  );
}