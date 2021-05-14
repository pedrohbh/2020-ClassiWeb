import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import PageBase from "../../components/PageBase";
import AdController from "../../controllers/AdController";
import Filters from "./Filters";
import dps from 'dbpedia-sparql-client';
import IconButton from '@material-ui/core/IconButton';
import { IconFlagBR, IconFlagUS } from 'material-ui-flags';

export default function Search() {
  const [ads, setAds] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    text: localStorage.getItem("searchText"),
    address: {},
    categories: localStorage.getItem("searchCategory") || [],
    min_price: "",
    max_price: "",
    product_state: "",
  });

  const [queryCategory, setQueryCategory] = useState(localStorage.getItem("searchCategory") || '');
  const [queryResult, setQueryResult] = useState([{ label: { 'xml:lang': '', value: ''} }]);
  const [currentLang, setCurrentLang] = useState('en');

  const myCategories = {
    'Acessórios': 'Fashion_accessory',
    'Utensílios': 'List_of_food_preparation_utensils',
    'Esportes': 'Sports_equipment',
    'Eletrônicos': 'Home_appliance',
    'Imóveis': 'Real_estate',
  }
  
  const getQuery = (param) => {
    return `
      SELECT ?label
      WHERE {
        <http://dbpedia.org/resource/${myCategories[param || '']}>
        dbo:abstract ?label .
        FILTER (lang(?label) IN ('en', 'pt'))
      }
      `;
  }

  const setCategoryDescription = f => {
    setCurrentLang('en');

    if (f.categories.length > 1) {
      setQueryCategory('');
      setQueryResult([]);
    } else {
      setQueryCategory(f.categories[0]);
      dps
        .client() 
        .query(getQuery(f.categories[0]))
        .timeout(15000)
        .asJson()
        .then(res => { setQueryResult(res.results.bindings); })
        .catch(e => { /* handle error */ });
    }
  }

  useEffect(() => {
    AdController.search(filters).then((adsList) => {
      setIsLoading(false);
      setCategoryDescription(filters);
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

  const handleLanguage = (lang) => {
    setCurrentLang(lang);
  }

  const handleChangeFilters = async (newFilters) => {
    setCategoryDescription(newFilters);
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

            <Grid item xs={12} style={{ marginTop: '3vh' }}>
              <Grid container justify='center'>
                {
                  queryCategory &&
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h1>Categoria: {queryCategory}</h1>
                  </Grid>
                }

                <Grid item xs={10}>
                  {
                    (queryResult.length > 0) &&
                      <IconButton size="small" edge="start" onClick={() => handleLanguage('en')}>
                        <IconFlagUS />
                      </IconButton>
                  }
                  {
                    (queryResult.length > 1) && 
                      <IconButton size="small" onClick={() => handleLanguage('pt')}>
                        <IconFlagBR />
                      </IconButton>
                  }
                </Grid>

                <Grid item xs={10}>
                  <p style={{ textAlign: 'justify' }}>
                    { 
                      queryResult.length > 0 ?
                        currentLang === 'en' ?
                          queryResult[0].label.value
                          :
                          queryResult[1].label.value
                      :
                        null
                    }
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Ads
                ads={ads}
                isLoading={isLoading}
                error={error}
                header={`${numberOfResults} resultados encontrados`}
              />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </PageBase>
  );
}
