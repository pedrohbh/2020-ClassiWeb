import EditAdForm from './EditAdForm';
import { Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase'

export default function EditAd() {
  return (
    <PageBase footer={false}>
      <Grid container style={{ height: '100%' }}>
        <EditAdForm/>
      </Grid>
    </PageBase>
  );
}
