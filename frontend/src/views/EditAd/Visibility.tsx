import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { AdvertisingState } from '../../controllers/AdController';

export default function Visibility({ onChange, preSelectedVisibility='' }) {
  const [selectedState, setSelectedState] = useState('');

  const handleSelectState = ({ target }) => {
    setSelectedState(target.value);
    onChange(target.value);
  }

  useEffect(() => {
    setSelectedState(preSelectedVisibility);
  }, [preSelectedVisibility]);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="state">Visibilidade</InputLabel>
      <Select
        id="state"
        label="Visibilidade"
        labelId="state"
        value={selectedState}
        onChange={handleSelectState}
      >
        <MenuItem key='visible' value={AdvertisingState.VISIBLE}>Visível</MenuItem>
        <MenuItem key='hidden' value={AdvertisingState.HIDDEN}>Oculto</MenuItem>
      </Select>
    </FormControl>
  );
}