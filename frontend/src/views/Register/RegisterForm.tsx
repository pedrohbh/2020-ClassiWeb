import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

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
      minHeight: "100vh",
      display: "flex",
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

    formControl: {
      minWidth: 60,
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
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Cadastre-se para começar a usar!</h1>
      <form className={classes.formContainer} autoComplete="off">
          <StyledTextField required id="outlined-basic" label="Nome" variant="outlined" />
          <StyledTextField required id="outlined-basic" label="Sobrenome" variant="outlined" />
          <StyledTextField required id="outlined-basic" label="CPF"  variant="outlined" />
          {/*<StyledTextField required id="outlined-basic" label="Endereço" variant="outlined" />*/}
          <div className={classes.address}>
            <FormControl variant="outlined" style={{width:"30%", marginRight:"1%"}} className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">UF</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="UF"
                
              >
                <MenuItem value={10}>ES</MenuItem>
                <MenuItem value={20}>RJ</MenuItem>
                <MenuItem value={30}>SP</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" style={{width:"69%"}} className={classes.formControl}>
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
          <StyledTextField required id="outlined-basic" type="email"    label="E-mail" variant="outlined" />
          <StyledTextField required id="outlined-basic" type="password" label="Senha" variant="outlined" />
          <StyledTextField required id="outlined-basic" type="password" label="Confirmar Senha" variant="outlined" />
      </form>
      <StyledButton variant="contained">
        Cadastrar!
      </StyledButton>
    </div>
  );
}