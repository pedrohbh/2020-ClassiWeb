import { Grid } from "@material-ui/core";
import PageBase from "../../components/PageBase";
import Panel from '../../components/Panel'

export default function AdminPanel() {
  return (
    <PageBase footer={false}>
      <Grid container direction="column" style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '2%'}}>
          <h1>Painel do Administrador</h1>
        </Grid>
        <Grid>
          <Panel/>
        </Grid>
      </Grid>
    </PageBase>
  );
}