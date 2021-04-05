import Presentation from './Presentation';
import RegisterForm from './RegisterForm';
import { Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase';

export default function Register() {
  return (
    <PageBase footer={false}>
      <Grid container style={{height: '100%'}}>
        <Grid item xs={6}>
          <Presentation/>
        </Grid>   
        <Grid item xs={6}>
          <RegisterForm/>
        </Grid>
      </Grid>
    </PageBase>
  );
}
