import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 60,
    },
  }
));

export default function Address() {
  const [UFs, setUFs] = useState([]);
  const [selectedUF, setSelectedUF] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const apiURL_UFs = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  const apiURL_Cities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`;

  const classes = useStyles();

  useEffect(() => {
    async function loadCitiesSelectedUF() {
      const response = await axios.get(apiURL_Cities);
      setCities(response.data);
    };

    loadCitiesSelectedUF()
  }, [selectedUF])

  useEffect(() => {
    async function loadUFs() {
      const response = await axios.get(apiURL_UFs);
      setUFs(response.data);
    };

    loadUFs()
  }, [])

  const handleSelectUF = ({ target }) => {
    setSelectedUF(target.value);
  };

  return (
    <>
      <FormControl variant="outlined" style={{ width: "30%", marginRight: "1%" }} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">UF</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedUF}
          onChange={handleSelectUF}
          label="UF"
        >
          {
            UFs.map(({ sigla }) => (
              <MenuItem value={sigla}>{sigla}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ width: "69%" }} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedCity}
          label="Cidade"
          disabled={!selectedUF}
        >
          {
            cities.map(({ nome }) => (
              <MenuItem value={nome}>{nome}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  )
}