import Presentation from './Presentation';
import RegisterForm from './RegisterForm';
import { Grid } from '@material-ui/core';
import AppBar from '../../components/AppBar'

export default function Register() {
  return (
    <>
    <AppBar/>
    <Grid container style={{height: '90vh'}}>
      <Grid item xs={6}>
        <Presentation/>
      </Grid>   
      <Grid item xs={6}>
        <RegisterForm/>
      </Grid>
    </Grid>
    </>
  );
}
