import NewAdForm from './NewAdForm';
import { Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase'
import { useHistory } from 'react-router';

export default function Register() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  if(!token) {
    history.push('/error');
  }

  return (
    <PageBase footer={false} newAd={true}>
      <Grid container style={{ height: '100%' }}>
        <NewAdForm/>
      </Grid>
    </PageBase>
  );
}
