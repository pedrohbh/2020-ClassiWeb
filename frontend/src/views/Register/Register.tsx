import Presentation from './Presentation';
import RegisterForm from './RegisterForm';
import { Grid } from '@material-ui/core';

export default function Register() {
  return (
    <Grid container style={{height: '100%'}}>
      <Grid item xs={6}>
        <Presentation/>
      </Grid>   
      <Grid item xs={6}>
        <RegisterForm/>
      </Grid>
    </Grid>
  );
}
