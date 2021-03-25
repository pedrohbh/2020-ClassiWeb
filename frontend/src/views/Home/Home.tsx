import { Grid } from '@material-ui/core';

import AppBar from '../../components/AppBar';
import Logotipo from '../../assets/ClassiWeb.svg';

export default function Home() {
  return (
    <>
      <AppBar/>
      <Grid container style={{ marginTop: "70px" }}>
        <Grid item xs={2} style={{ height: "max-content", border: "1px solid black" }}>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
          <div>Categoria 1</div>
        </Grid>
        <Grid item xs={10} style={{ height: "max-content", border: "1px solid black" }}>
          <img src={Logotipo} alt="ClassiWeb" style={{ width: "100%", height: "25vh", border: "1px solid black"}} />
          <div>Produto</div>
          <div>Produto</div>
          <div>Produto</div>
          <div>Produto</div>
        </Grid>
      </Grid>
    </>
  );
}
