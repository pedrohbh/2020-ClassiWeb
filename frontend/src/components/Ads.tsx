import { Button, Grid, withStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import AdCard from './AdCard';
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

export default function Ads({ 
  ads, isLoading, error, header="", 
  myAds=false, wishList=false, myShopping=false, mySales=false, 
  ownersFeedbacks=[], clientsFeedbacks=[], purchaseIds=[]
}) {
  return (
    <Grid item xs={12} style={{ marginBottom: '10vh'}}>
      <Grid container spacing={3} justify="center" style={{ width: '100%', margin: 0 }}>
        {
          isLoading ?
            <>
              <Grid item xs={12}>
                <Skeleton style={{ margin: 'auto' }}>
                  <h1>{header}</h1>
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
                  <h1>{header}</h1>
                </Grid>

                {
                  ads.map(({ id, title, price, images, address={ state: '', city: '' } }, index) => (
                    <Grid item key={id}>
                      <AdCard
                        id={id}
                        title={title}
                        price={price}
                        images={images}
                        city={address.city}
                        UF={address.state}
                        myAds={myAds}
                        myShopping={myShopping}
                        wishList={wishList}
                        mySales={mySales}
                        ownerFeedback={ownersFeedbacks[index]}
                        clientFeedback={clientsFeedbacks[index]}
                        purchaseId={purchaseIds[index]}
                      />
                    </Grid>
                  ))
                }
              </>
        }
      </Grid>
    </Grid>
  );
}