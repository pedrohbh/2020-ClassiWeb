import {
  createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 60,
    },
  }
));

export default function Address({ onChange }) {
  const [UFs, setUFs] = useState([]);
  const [selectedUF, setSelectedUF] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const apiURL_UFs = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  const apiURL_Cities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`;

  const classes = useStyles();

  useEffect(() => {
    async function loadCitiesSelectedUF() {
      await axios.get(apiURL_Cities)
        .then(response => {
          setCities(response.data);
        })
    };

    loadCitiesSelectedUF()
  }, [selectedUF, apiURL_Cities])

  useEffect(() => {
    async function loadUFs() {
      await axios.get(apiURL_UFs)
        .then(response => {
          setUFs(response.data);
        })
    };

    loadUFs()
  }, [apiURL_UFs])

  const handleSelectUF = ({ target }) => {
    setSelectedUF(target.value);
    setSelectedCity("");
    onChange({ state: target.value });
  };

  const handleSelectCity = ({ target }) => {
    setSelectedCity(target.value);
    onChange({ state: selectedUF, city: target.value });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <FormControl className={classes.formControl} variant="outlined" fullWidth>
          <InputLabel id="uf">UF</InputLabel>
          <Select
            labelId="uf"
            id="uf"
            value={selectedUF}
            onChange={handleSelectUF}
            label="UF"
          >
            {
              UFs.map(({ sigla }) => (
                <MenuItem key={sigla} value={sigla}>{sigla}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <FormControl className={classes.formControl} variant="outlined" fullWidth>
          <InputLabel id="city">Cidade</InputLabel>
          <Select
            labelId="city"
            id="city"
            value={selectedCity}
            label="Cidade"
            disabled={!selectedUF}
            onChange={handleSelectCity}
          >
            {
              cities.map(({ nome }) => (
                <MenuItem key={nome} value={nome}>{nome}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}