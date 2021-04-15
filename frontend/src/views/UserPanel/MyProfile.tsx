import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import validator from "validator";
import Address from "../../components/Address";

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
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState({});
  const [emailError, setEmailError] = useState("");

  const handleValidateEmail = (event) => {
    const value = event.target.value ?? "";

    if (validator.isEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("E-mail inválido");
    }
  };

  return (
    <Grid container spacing={3} justify="center" style={{ width: '100%', margin: 0 }}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={5}>
            <StyledTextField id="name" label="Nome" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={5}>
            <Address onChange={(newAddress) => setAddress(newAddress)} />
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
              error={!!emailError}
              helperText={emailError}
              onBlur={handleValidateEmail}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <StyledButton>
          Atualizar
        </StyledButton>
      </Grid>

    </Grid>
  );
}