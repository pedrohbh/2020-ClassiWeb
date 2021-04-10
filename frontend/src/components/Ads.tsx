import { Button, Grid, withStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import Bike from '../assets/bicicleta.jpg';
import Carro from '../assets/carro.jpg';
import Casa from '../assets/casa.jpg';
import AdCard from './AdCard';
import AdController from '../controllers/AdController';
import RefreshIcon from '@material-ui/icons/Refresh';

const StyledButton = withStyles({
  root: {
    background: '#E65252',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: '#fc7474'
    },
    marginTop: "2%",
  },

  label: {
    textTransform: 'capitalize',
  },
})((props: any) => <Button size="large" {...props} />);

export default function Ads() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    AdController.getAll()
      .then(adsList => {
        setIsLoading(false);
        if (adsList) {
          setAds(adsList);
          setError(false);
        } else {
          setError(true);
        }
      });
  }, []);

  return (
    <Grid item xs={12} style={{ marginTop: '4vh', marginBottom: '10vh' }}>
      <Grid container spacing={3} justify="center" style={{ width: '100%', margin: 0 }}>
        {
          isLoading ?
            <>
              <Grid item xs={12}>
                <Skeleton style={{ margin: 'auto' }}>
                  <h1>Anúncios publicados recentemente</h1>
                </Skeleton>
              </Grid>
              <Grid item><Skeleton variant="rect" width={345} height={380} /></Grid>
              <Grid item><Skeleton variant="rect" width={345} height={380} /></Grid>
              <Grid item><Skeleton variant="rect" width={345} height={380} /></Grid>
            </>
            :
            error ?
              <Grid item style={{ textAlign: 'center' }}>
                <h2>Não foi possível estabelecer conexão com o servidor</h2>
                <h2>Tente novamente mais tarde</h2>
                <StyledButton href="../">
                  <RefreshIcon/>
                  &nbsp; Recarregar
                </StyledButton>
              </Grid>
              :
              <>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <h1>Anúncios publicados recentemente</h1>
                </Grid>

                {
                  ads.map(({ id, title, price, imgRef, city, uf }) => (
                    <Grid item key={id}>
                      <AdCard
                        title={title}
                        price={price}
                        imgRef={imgRef}
                        city={city}
                        UF={uf}
                      />
                    </Grid>
                  ))
                }

                <Grid item><AdCard title={'Bicicleta'} price={1520.50} imgRef={Bike} city={'Vitória'} UF={'ES'} /></Grid>
                <Grid item><AdCard title={'Carro'} price={1520.58} imgRef={Carro} city={'Caxias'} UF={'RJ'} /></Grid>
                <Grid item><AdCard title={'Casa'} price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'} /></Grid>
                <Grid item><AdCard title={'Bicicleta'} price={1520.5} imgRef={Bike} city={'Vitória'} UF={'ES'} /></Grid>
                <Grid item><AdCard title={'Carro'} price={1520.5} imgRef={Carro} city={'Caxias'} UF={'RJ'} /></Grid>
                <Grid item><AdCard title={'Casa'} price={1520.5} imgRef={Casa} city={'Santos'} UF={'SP'} /></Grid>
              </>
        }
      </Grid>
    </Grid>
  );
}