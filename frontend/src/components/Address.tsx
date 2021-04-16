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

export default function Address({ onChange, required=true, preSelectedState = '', preSelectedCity = '' }) {
  const [selectedUF, setSelectedUF] = useState(preSelectedState);
  const [selectedCity, setSelectedCity] = useState(preSelectedCity);

  const handleSelectUF = ({ target }) => {
    setSelectedUF(target.value);
    setSelectedCity("");
    onChange({ state: target.value });
  };

  const handleSelectCity = ({ target }) => {
    setSelectedCity(target.value);
    onChange({ state: selectedUF, city: target.value });
  };

  useEffect(() => {
    setSelectedUF(preSelectedState);
  }, [preSelectedState]);

  useEffect(() => {
    setSelectedCity(preSelectedCity);
  }, [preSelectedCity]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <SelectUF 
          uf={selectedUF} 
          required={required} 
          onChange={handleSelectUF}
        />
      </Grid>
      <Grid item xs={8}>
        <SelectCity 
          uf={selectedUF} 
          city={selectedCity} 
          required={required} 
          disabled={!selectedUF} 
          onChange={handleSelectCity}
        />
      </Grid>
    </Grid>
  )
}

const SelectUF = ({
  uf, required = false, disabled = false, onChange
}) => {
  const apiURL_States = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;

  return (
    <SelectAsync 
      label="UF" 
      value={uf}
      fieldName="state"
      url={apiURL_States}
      getData={({sigla}) => sigla} 
      required={required} 
      disabled={disabled} 
      onChange={onChange}
    />
  );
}

const SelectCity = ({
  uf, city,  required = false,  disabled = false, onChange
}) => {
  const [url, setUrl] = useState(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  
  useEffect(() => {
    setUrl(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  }, [uf]);

  return (
    <SelectAsync 
      label="Cidade" 
      value={city}
      fieldName="city"
      url={url}
      getData={({nome}) => nome}
      required={required} 
      disabled={disabled} 
      onChange={onChange}
    />
  );
}

const SelectAsync = ({
  value, label = '', fieldName, url, required = false, disabled = false, onChange, getData
}) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const labelId = `label-${label}-${`${Math.random()}`.replace('0.', '')}`;
  
  useEffect(() => {
    async function getItems() {
      await axios.get(url)
        .then(response => {
          setItems(response.data.map(getData));
        })
      }
      
      if (!disabled) {
        getItems();
      }
  }, [disabled, url, getData]);

  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth>
      <InputLabel required={required} id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        id={fieldName}
        value={value}
        disabled={disabled}
        onChange={onChange}
      >
        {
          required &&
          <MenuItem key={''} value={''} disabled style={{ display: 'none' }}></MenuItem>
        }
        {
          items.map((item) => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
