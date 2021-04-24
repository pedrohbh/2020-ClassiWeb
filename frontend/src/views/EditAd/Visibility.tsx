import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import MySelect from "../../components/MySelect";
import { AdvertisingState } from '../../controllers/AdController';

export default function Visibility({ onChange, preSelected='' }) {
  const visibility = [
    {
      key: 'visible',
      value: AdvertisingState.VISIBLE,
      content: 'Visível'
    },
    {
      key: 'hidden',
      value: AdvertisingState.HIDDEN,
      content: 'Oculto'
    }
  ]

  const handleSelect = (selected) => {
    onChange(selected);
  }

  return (
    <MySelect
      id="state"
      label="Visibilidade"
      itemsList={visibility}
      preSelectedItem={preSelected}
      onChange={ selected => handleSelect(selected) }
    />
  );
}