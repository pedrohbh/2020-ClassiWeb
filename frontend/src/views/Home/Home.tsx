import { Grid } from '@material-ui/core';

import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';

import Logotipo from '../../assets/ClassiWeb.svg';

export default function Home() {
  return (
    <>
    <Grid container direction="column" justify="flex-start"  style={{minHeight: "89vh"}}>

      <Grid item xs={12}>
        <AppBar/>
      </Grid>

      <Grid item xs={12}>
        <Grid container style={{ height:"100%", marginTop: "70px" }}>
          
          <Grid item xs={2} style={{ height: "max-content", boxShadow: "2px 2px 8px 1px #dedede", padding: "20px" }}>
            <Grid container>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
              <Grid item xs={12}>Categoria 1</Grid>
            </Grid>
          </Grid>

          <Grid item xs={10} style={{ height: "max-content" }}>
            
            <Grid item xs={12}>
              <img src={Logotipo} alt="ClassiWeb" style={{ width: "100%", height: "25vh" }} />
            </Grid>
          
            <Grid container item xs={12} style={{ padding: "20px"}}>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
              <Grid item xs={12}>Produto</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
    <Footer/>
    </>
  );
}
