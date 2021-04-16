import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ProductState as State } from '../controllers/AdController';

export default function ProductState({ required = true, onChange, preSelectedState='' }) {
  const [selectedState, setSelectedState] = useState('');

  const handleSelectState = ({ target }) => {
    setSelectedState(target.value);
    onChange(target.value);
  }
  
  useEffect(() => {
    if(!required){
      setSelectedState(preSelectedState);
    }
  }, [preSelectedState]);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel required={required} id="product_state">Estado</InputLabel>
      <Select
        id="product_state"
        label="Estado"
        labelId="product_state"
        value={selectedState}
        onChange={handleSelectState}
      >
        <MenuItem key='new' value={State.NEW}>Novo</MenuItem>
        <MenuItem key='secondhand' value={State.SECONDHAND}>Usado</MenuItem>
      </Select>
    </FormControl>
  );
}