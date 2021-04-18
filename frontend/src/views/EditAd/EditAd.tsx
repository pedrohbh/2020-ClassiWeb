import EditAdForm from './EditAdForm';
import { Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase'
import { useHistory } from 'react-router';

export default function EditAd() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  if(!token) {
    history.push('/');
  }

  return (
    <PageBase footer={false}>
      <Grid container style={{ height: '100%' }}>
        <EditAdForm/>
      </Grid>
    </PageBase>
  );
}
