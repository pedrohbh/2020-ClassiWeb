import { Grid } from '@material-ui/core';
import PageBase from '../../components/PageBase';
import Logotipo from '../../assets/ClassiWeb.svg';
import Categories from './Categories';
import Ads from '../../components/Ads';
import { useEffect, useState } from 'react';
import AdController from '../../controllers/AdController';
import ImageController from '../../controllers/ImageController';

export default function Home() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imge, setImg] = useState("");

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

    // ImageController.teste("123")
    //   .then(response => {
    //     const x = 'data:image/*;base64,' + Buffer.from(response, 'binary').toString('base64');
    //     setImg(x)
    //   })
  }, []);

  return (
    <PageBase>
      <Grid container style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>

          <Categories/>

          <Grid item xs={9} lg={10} style={{ flex: 1, maxHeight: 'max-content' }}>
            <Grid container>
              <Grid item xs={12}>
                <img src={Logotipo} alt="ClassiWeb" style={{ width: "100%", height: "25vh" }} />
              </Grid>

              <Ads 
                ads={ads}
                isLoading={isLoading}
                error={error}
              />

            </Grid>
          </Grid>
        </Grid>
        
        {/* <Image src={imge} alt="dorime" /> */}
    </PageBase>
  )
}

// const Image = ({src, alt}) => <img src={src} alt={alt} />