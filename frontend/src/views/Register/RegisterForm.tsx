import { Grid } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { validate as validatorCPF } from "gerador-validador-cpf";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router";
import validator from "validator";
import Address from "../../components/Address";

import UserController from "../../controllers/UserController";
import getFormData from "../../utils/getFormData";
import Swal from 'sweetalert2';
import StyledButton from "../../components/StyledButton";

const StyledTextField = (props) => (
  <TextField fullWidth variant="outlined" {...props} />
);

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
  })
);

export default function RegisterForm() {
  const classes = useStyles();
  const history = useHistory();

  const [address, setAddress] = useState({});

  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleValidateEmail = (event) => {
    const value = event.target.value ?? "";

    if (validator.isEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("E-mail inválido");
    }
  };

  const handleValidateCPF = (event) => {
    const value = event.target.value ?? "";

    if (validatorCPF(value)) {
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  };

  const handleValidatePassword = (event) => {
    const password = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(
      "#password"
    ).value;

    const passwordConfirm = event.target.value;

    if (password === passwordConfirm) {
      setPasswordError("");
    } else {
      setPasswordError("Senhas diferentes");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = getFormData(event);

    const newUser = { ...formData, address };

    if (
      validatorCPF(newUser.cpf) &&
      validator.isEmail(newUser.email) &&
      newUser.password === newUser.passwordConfirm
    ) {
      await UserController.postUser(newUser)
        .then(response => {
          if (response) {
            const redirect = localStorage.getItem('redirect');
            if (redirect) {
              // history.push(`/ad/${redirect}`);
              localStorage.removeItem('redirect');
            }
            localStorage.setItem('token', response.token)
            history.push('/')
          } else {
            Swal.fire({
              title: "Algum erro aconteceu...",
              text: "Tente novamente mais tarde",
              icon: "warning",
              confirmButtonColor: "#ed4a4a"
            })
          }
        });
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ height: "100%", justifyContent: "center" }}
    >
      <h1 className={classes.text}>Cadastre-se para começar a usar!</h1>
      <form
        className={classes.formContainer}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container alignItems="center" justify="space-around" spacing={1}>
          <Grid item xs={12}>
            <StyledTextField 
              required 
              id="name" 
              label="Nome" 
              inputProps={{ maxLength: 40 }}
            />
          </Grid>

          <Grid item xs={12}>
            <NumberFormat
              format="###.###.###-##"
              mask="_"
              customInput={(props) => (
                <StyledTextField
                  required
                  id="cpf"
                  label="CPF"
                  error={!!cpfError}
                  helperText={cpfError}
                  {...props}
                  onBlur={handleValidateCPF}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Address 
              required
              onChange={(newAddress) => setAddress(newAddress)} 
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              required
              id="email"
              type="email"
              label="E-mail"
              error={!!emailError}
              helperText={emailError}
              onBlur={handleValidateEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              required
              id="password"
              type="password"
              label="Senha"
              inputProps={{ minLength: 8, maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              required
              id="passwordConfirm"
              type="password"
              label="Confirmar Senha"
              error={!!passwordError}
              helperText={passwordError}
              onBlur={handleValidatePassword}
            />
          </Grid>
        </Grid>

        <StyledButton type="submit" variant="contained" style={{ marginTop: '2%' }}>
          Cadastrar!
        </StyledButton>
      </form>
    </Grid>
  );
}
