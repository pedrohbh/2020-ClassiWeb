import NewAdForm from './NewAdForm';
import { Grid } from '@material-ui/core';
import AppBar from '../../components/AppBar'

export default function Register() {
  return (
    <>
    <AppBar/>
    <Grid container style={{height: '90vh', marginTop: '10vh'}}>
      <NewAdForm/>
    </Grid>
    </>
  );
}
