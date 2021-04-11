import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";

export default function ProductState({ required = true, onChange }) {
  const [selectedState, setSelectedState] = useState();

  const handleSelectState = ({ target }) => {
    setSelectedState(target.value);
    onChange(target.value);
  }
  
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
        <MenuItem key='new' value={1}>Novo</MenuItem>
        <MenuItem key='secondhand' value={0}>Usado</MenuItem>
      </Select>
    </FormControl>
  );
}