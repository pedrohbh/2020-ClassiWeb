import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import PageBase from "../../components/PageBase";
import AdController from "../../controllers/AdController";
import Filters from "./Filters";

export default function Search() {
  const [ads, setAds] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    text: localStorage.getItem("searchText"),
    address: {},
    categories: localStorage.getItem("searchCategory") ? [localStorage.getItem("searchCategory")] : [],
    min_price: "",
    max_price: "",
    product_state: "",
  });

  useEffect(() => {
    console.log(filters);
    AdController.search(filters).then((adsList) => {
      console.log(adsList);
      setIsLoading(false);

      if (adsList) {
        setAds(adsList);
        setNumberOfResults(adsList.length);
        setError(false);
      } else {
        setError(true);
      }

      localStorage.setItem("searchText", "");
      localStorage.setItem("searchCategory", "");
    });
  }, [filters]);

  const handleChangeFilters = async (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    setError(false);
  };

  return (
    <PageBase footer={false}>
      <Grid
        container
        style={{ minHeight: "calc(100% - 10vh)", height: "max-content" }}
      >
        <Filters onChange={(newFilters) => handleChangeFilters(newFilters)} />

        <Grid item xs={9} lg={10} style={{ flex: 1, maxHeight: "max-content" }}>
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
