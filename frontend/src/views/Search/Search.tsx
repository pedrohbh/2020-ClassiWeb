import { Grid } from "@material-ui/core";
import Ads from "../../components/Ads";
import PageBase from "../../components/PageBase";
import Filters from './Filters';

export default function Search() {
  return (
    <PageBase footer={false}>
      <Grid container style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>

        <Filters />

        <Grid item xs={9} lg={10} style={{ flex: 1, maxHeight: 'max-content' }}>
          <Grid container>

            <Ads />

          </Grid>
        </Grid>
      </Grid>
    </PageBase>
  );
}