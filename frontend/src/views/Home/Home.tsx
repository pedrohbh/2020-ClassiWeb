import { Button, Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase';
import Logotipo from '../../assets/ClassiWeb.svg';
import Categories from './Categories';
import Ads from '../../components/Ads';

export default function Home() {
  return (
    <PageBase>
      <Grid container style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>

          <Categories/>

          <Grid item xs={9} lg={10} style={{ flex: 1, maxHeight: 'max-content' }}>
            <Grid container>
              <Grid item xs={12}>
                <img src={Logotipo} alt="ClassiWeb" style={{ width: "100%", height: "25vh" }} />
              </Grid>

              <Ads/>

            </Grid>
          </Grid>
        </Grid>
    </PageBase>
  )
}
