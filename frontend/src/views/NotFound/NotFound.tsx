import { Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase';
import NotFoundImage from '../../assets/error404.svg';

export default function NotFound() {

  return (
    <PageBase>
      <Grid container justify='center' style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>

        <Grid item>
          <img src={NotFoundImage} alt="Página não encontrada" style={{ height: '70vh' }} />
        </Grid>

      </Grid>
    </PageBase>
  )
}