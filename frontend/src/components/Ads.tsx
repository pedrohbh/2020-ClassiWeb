import { Grid } from '@material-ui/core';
import { Pagination, Skeleton } from '@material-ui/lab';
import AdCard from './AdCard';
import RefreshIcon from '@material-ui/icons/Refresh';
import StyledButton from './StyledButton';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

export default function Ads({ 
  ads, isLoading, error, header="", 
  myAds=false, wishList=false, myShopping=false, mySales=false, 
  ownersFeedbacks=[], clientsFeedbacks=[], purchaseIds=[]
}) {
  const history = useHistory();
  const itemsPerPage = 9;
  const numPages = Math.ceil(ads.length / itemsPerPage);
  const [page, setPage] = useState(1);
  const [itemsPage, setItemsPage] = useState(ads.slice(0, itemsPerPage));
  
  useEffect(() => {
    setItemsPage(ads.slice(0, itemsPerPage));
  }, [ads])

  const handleChange = (event, value) => {
    const offset = (value - 1) * itemsPerPage;
    setItemsPage(ads.slice(offset, offset+itemsPerPage));
    setPage(value);
  }

  const handleClick = (event) => {
    history.go(0);
  }

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
                <StyledButton onClick={handleClick}>
                  <RefreshIcon/>
                  &nbsp; Recarregar
                </StyledButton>
              </Grid>
              :
              <>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <h1>{header}</h1>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3} justify="center" style={{ width: '100%', margin: 0 }}>
                  {
                    itemsPage.map(({ id, title, price, images, address={ state: '', city: '' } }, index) => (
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
                  </Grid>
                </Grid>
                <Pagination count={numPages} page={page} onChange={handleChange} />
              </>
        }
      </Grid>
    </Grid>
  );
}