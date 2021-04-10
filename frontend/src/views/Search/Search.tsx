import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import PageBase from "../../components/PageBase";
import AdController from "../../controllers/AdController";
import Filters from './Filters';

const f = {
  "text": "",
  "product_state": "",
  "min_price": "",
  "max_price": "",
  "address": {}
};

export default function Search({ filters = f }) {
  const [ads, setAds] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    AdController.search(filters)
      .then(adsList => {
        setIsLoading(false);
        if (adsList) {
          setAds(adsList[0]);
          setNumberOfResults(adsList[1]);
          setError(false);
        } else {
          setError(true);
        }
      });
  }, []);

  return (
    <PageBase footer={false}>
      <Grid container style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>

        <Filters />

        <Grid item xs={9} lg={10} style={{ flex: 1, maxHeight: 'max-content' }}>
          <Grid container>

              <Ads 
                ads={ads}
                isLoading={isLoading}
                error={error}
                header={`${numberOfResults} resultados encontrados`}
              />

          </Grid>
        </Grid>
      </Grid>
    </PageBase>
  );
}