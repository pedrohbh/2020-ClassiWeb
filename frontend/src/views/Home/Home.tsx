import { Grid } from '@material-ui/core';

import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import Logotipo from '../../assets/ClassiWeb.svg';
import Bike from '../../assets/bicicleta.jpg';
import Carro from '../../assets/carro.jpg';
import Casa from '../../assets/casa.jpg';

export default function Home() {
  return (
    <>
    <Grid container direction='column' style={{ height: '100%' }}>

      <AppBar/>

      <Grid item style={{ flex: 1, width: '100%', overflow: 'auto' }}>
        <Grid container style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>
          
          <Grid item xs={3} lg={2} style={{ height: 'auto', boxShadow: "2px 2px 8px 1px #dedede", padding: "20px", borderRadius: '5px' }}>
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

          <Grid item xs={9} lg={10} style={{ flex: 1, maxHeight: 'max-content' }}>
            <Grid container>
              <Grid item xs={12}>
                <img src={Logotipo} alt="ClassiWeb" style={{ width: "100%", height: "25vh" }} />
              </Grid>
            
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <h1>Anúncios publicados recentemente</h1>
              </Grid>

              <Grid item xs={12} style={{ margin: '3vh 0' }}>
                <Grid container spacing={3} justify="center" style={{ width: '100%' }}>
                  <Grid item><Card title={'Bicicleta'} price={1520.50} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
                  <Grid item><Card title={'Carro'}     price={1520.58} imgRef={Carro} city={'Caxias'} UF={'RJ'}/></Grid>
                  <Grid item><Card title={'Casa'}      price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'}/></Grid>
                  <Grid item><Card title={'Bicicleta'} price={1520.5} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
                  <Grid item><Card title={'Carro'}     price={1520.5} imgRef={Carro} city={'Caxias'} UF={'RJ'}/></Grid>
                  <Grid item><Card title={'Casa'}      price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'}/></Grid>
                  <Grid item><Card title={'Bicicleta'} price={1520.59} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
                  <Grid item><Card title={'Carro'}     price={1520.5} imgRef={Carro} city={'Caxias'} UF={'RJ'}/></Grid>
                  <Grid item><Card title={'Casa'}      price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'}/></Grid>
                  <Grid item><Card title={'Bicicleta'} price={1520.5} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
                  <Grid item><Card title={'Carro'}     price={1520.5} imgRef={Carro} city={'Caxias'} UF={'RJ'}/></Grid>
                  <Grid item><Card title={'Casa'}      price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'}/></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer/>
      </Grid>
      
    </Grid>
    </>
  );
}
