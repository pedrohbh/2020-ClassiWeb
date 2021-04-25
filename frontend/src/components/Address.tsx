import { Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MySelect from './MySelect';

export default function Address({ onChange, required = false, preSelectedState = '', preSelectedCity = '' }) {
  const [UFs, setUFs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedUF, setSelectedUF] = useState(preSelectedState);
  const [selectedCity, setSelectedCity] = useState(preSelectedCity);

  const apiURL_UFs = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  const apiURL_Cities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`;

  useEffect(() => {
    async function loadCitiesSelectedUF() {
      await axios.get(apiURL_Cities)
        .then(response => {
          const citiesTmp = response.data.map(({ nome }) => ({
            key: nome,
            value: nome,
            content: nome
          }))

          setCities(citiesTmp);
        })
    };

    loadCitiesSelectedUF()
  }, [selectedUF, apiURL_Cities])

  useEffect(() => {
    async function loadUFs() {
      await axios.get(apiURL_UFs)
        .then(response => {
          const ufsTmp = response.data.map(({ sigla }) => ({
            key: sigla,
            value: sigla,
            content: sigla
          }))

          setUFs(ufsTmp);
        })
    };

    loadUFs()
  }, [apiURL_UFs])

  useEffect(() => {
    setSelectedUF(preSelectedState);
  }, [preSelectedState]);

  useEffect(() => {
    setSelectedCity(preSelectedCity);
  }, [preSelectedCity]);

  const handleSelectUF = (selected) => {
    setSelectedUF(selected);
    setSelectedCity("");
    onChange({ state: selected });
  };

  const handleSelectCity = (selected) => {
    setSelectedCity(selected);
    onChange({ state: selectedUF, city: selected });
  };

  return (
    <Grid container spacing={1}>

      <Grid item xs={4}>
        <MySelect
          id="uf"
          label="UF"
          itemsList={UFs}
          required={required}
          preSelectedItem={preSelectedState}
          onChange={ selected => handleSelectUF(selected) }
        />
      </Grid>

      <Grid item xs={8}>
        <MySelect
          id="city"
          label="Cidade"
          itemsList={cities}
          required={required}
          disabled={!selectedUF}
          preSelectedItem={preSelectedCity}
          onChange={ selected => handleSelectCity(selected) }
        />
      </Grid>

    </Grid>
  )
}