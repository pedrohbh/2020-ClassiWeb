import NewAdForm from './NewAdForm';
import { Grid } from '@material-ui/core';
import AppBar from '../../components/AppBar'
import PageBase from '../../components/PageBase'

export default function Register() {
  return (
    <PageBase footer={false}>
      <Grid container style={{ height: '100%' }}>
        <NewAdForm/>
      </Grid>
    </PageBase>
  );
}
