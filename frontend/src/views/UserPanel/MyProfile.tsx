import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

import validator from "validator";
import Address from "../../components/Address";
import UserController from "../../controllers/UserController";

const StyledTextField = (props) => (
  <TextField fullWidth variant="outlined" {...props} />
);

const StyledButton = withStyles({
  root: {
    width: '150px',
    maxWidth: '70%',
    background: '#E65252',
    '&:hover': {
      background: '#fc7474',
    },
    color: 'white',
  },
})((props: any) => <Button size="large" {...props} />);

export default function MyAds() {
  const history = useHistory();
  const [address, setAddress] = useState({ state: '', city: ''});
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    UserController.getUser()
      .then(user => {
          if (user) {
          setCpf(user.cpf);
          setName(user.name);
          setEmail(user.email);
          setAddress({ 
            state: user.address.state, 
            city: user.address.city
          });
        }
      });
  }, []);

  const handleValidateEmail = (event) => {
    const value = event.target.value ?? "";

    if (validator.isEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("E-mail inválido");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const newUserData = {
      name,
      email, 
      address
    };

    console.log(newUserData)
    if (validator.isEmail(email)) {
      Swal.fire({
        text: "Confirma a alteração dos dados?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        icon: 'warning',
        cancelButtonColor: '#ed4a4a',
        confirmButtonColor: '#80cc54',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await UserController.update(newUserData)
            .then(response => {
              console.log(response);
              Swal.fire({
                text: "Informações atualizadas!",
                icon: "success",
                confirmButtonColor: "#a6dc86"
              });
            });
        }
      });
    }
  }

  return (
    <Grid container spacing={3} justify="center" style={{ width: '100%', margin: 0 }}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={5}>
            <StyledTextField 
              id="name" 
              label="Nome" 
              defaultValue={name} 
              value={name}
              onChange={ event => setName(event.target.value) }
              inputProps={{ maxLength: 40 }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={5}>
            <StyledTextField id="cpf" label="CPF" disabled value={cpf}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={5}>
            <Address 
              required={false}
              preSelectedCity={address.city}
              preSelectedState={address.state}
              onChange={(newAddress) => setAddress(newAddress)} 
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={5}>
            <StyledTextField
              id="email"
              type="email"
              label="E-mail"
              value={email}
              error={!!emailError}
              helperText={emailError}
              onBlur={handleValidateEmail}
              onChange={ event => setEmail(event.target.value) }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <StyledButton onClick={handleUpdate}>
          Atualizar
        </StyledButton>
      </Grid>

    </Grid>
  );
}