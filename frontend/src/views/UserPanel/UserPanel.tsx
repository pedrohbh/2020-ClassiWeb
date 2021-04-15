import { Grid } from "@material-ui/core";
import PageBase from "../../components/PageBase";
import Panel from './Panel'

export default function UserPanel() {
  return (
    <PageBase footer={false}>
      <Grid container direction="column" style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '2%'}}>
          <h1>Painel do Usuário</h1>
        </Grid>
        <Grid item xs={12}>
          <Panel/>
        </Grid>
      </Grid>
    </PageBase>
  );
}