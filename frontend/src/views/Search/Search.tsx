import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import PageBase from "../../components/PageBase";
import AdController from "../../controllers/AdController";
import Filters from './Filters';

const f = {
  text: localStorage.getItem('searchText'),
  address: {},
  category: [],
  min_price: "",
  max_price: "",
  product_state: ""
};

export default function Search({ initialFilters = f }) {
  const [ads, setAds] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    AdController.search(filters)
      .then(adsList => {
        setIsLoading(false);
        if (adsList) {
          setAds(adsList[1]);
          setNumberOfResults(adsList[0]);
          setError(false);
        } else {
          setError(true);
        }

        localStorage.setItem('searchText', '');
      });
  }, []);

  const handleChangeFilters = async newFilters => {
    setFilters(newFilters);
    setIsLoading(true);
    setError(false);

    console.log(newFilters);

    AdController.search(newFilters)
      .then(adsList => {
        setIsLoading(false);
        if (adsList) {
          setAds(adsList[1]);
          console.log(adsList[1]);
          setNumberOfResults(adsList[0]);
          setError(false);
        } else {
          setError(true);
        }
      });

      localStorage.setItem('searchText', '');
  }

  return (
    <PageBase footer={false}>
      <Grid container style={{ minHeight: 'calc(100% - 10vh)', height: 'max-content' }}>

        <Filters onChange={ newFilters => handleChangeFilters(newFilters) }/>

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