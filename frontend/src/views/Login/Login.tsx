import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logotipo from '../../assets/ClassiWeb.svg';
import PageBase from '../../components/PageBase';
import AuthController from '../../controllers/AuthController';
import getFormData from '../../utils/getFormData';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="../">
        ClassiWeb
      </Link>{' '}
      {new Date().getFullYear()}      
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#e65252',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#E65252',
    '&:hover':{
        background: '#fc7474',
    }
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = getFormData(event);
    
    AuthController.login(email, password)
      .then(response => {
        if (response) {
          const redirect = localStorage.getItem('redirect');
          if (redirect) {
            localStorage.removeItem('redirect');
            history.push(`/ad/${redirect}`);
          } else {
            history.push('/');
          }
        } else {
          Swal.fire({
            title: "Acesso negado",
            text: "E-mail ou senha incorretos",
            icon: 'warning',
            confirmButtonColor: '#ed4a4a'
          })
        }
      })
  }

  return (
    <PageBase footer={false} login={false}>
      <Grid container style={{height: '100%'}}>
        <Container component="main" maxWidth="xs" style={{height: '80vh'}}>
          <CssBaseline />
          <div className={classes.paper}>
            <img src={Logotipo} alt="ClassiWeb"/>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Identifique-se
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
              <Grid container justify="center">
                {/* <Grid item xs>
                  <Link href="#" variant="body2" style={{color:'black'}}>
                    Esqueceu a senha?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link 
                    variant="body2" 
                    style={{ color:'black', cursor: 'pointer' }}
                    onClick={ () => history.push('/register') }
                  >
                    Não possui uma conta? Cadastre-se!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </PageBase>
  );
}