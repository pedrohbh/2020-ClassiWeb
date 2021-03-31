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
    <Grid container direction="column" justify="flex-start"  style={{minHeight: "89vh"}}>

      <Grid item xs={12}>
        <AppBar/>
      </Grid>

      <Grid item xs={12}>
        <Grid container style={{ height:"100%", marginTop: "70px" }}>
          
          <Grid item xs={2} style={{ height: "max-content", boxShadow: "2px 2px 8px 1px #dedede", padding: "20px", borderRadius: '5px' }}>
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
          
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <h1>Anúncios publicados recentemente</h1>
            </Grid>

            <Grid container spacing={3} item xs={12} justify="center" style={{ padding: "20px"}}>
              <Grid item><Card title={'Bicicleta'} price={1520.50} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
              <Grid item><Card title={'Carro'}     price={1520.5} imgRef={Carro} city={'Caxias'} UF={'RJ'}/></Grid>
              <Grid item><Card title={'Casa'}      price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'}/></Grid>
              <Grid item><Card title={'Bicicleta'} price={1520.5} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
              <Grid item><Card title={'Carro'}     price={1520.5} imgRef={Carro} city={'Caxias'} UF={'RJ'}/></Grid>
              <Grid item><Card title={'Casa'}      price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'}/></Grid>
              <Grid item><Card title={'Bicicleta'} price={1520.50} imgRef={Bike} city={'Vitória'} UF={'ES'}/></Grid>
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
    </>
  );
}
