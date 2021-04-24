import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 60,
    },
  })
);

export default function MySelect({ 
  id, 
  label, 
  onChange, 
  itemsList, 
  disabled = false,
  required = false, 
  preSelectedItem = ''
}) {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = useState(preSelectedItem);

  const handleSelectedItem = ({ target }) => {
    setSelectedItem(target.value);
    onChange(target.value);
  }

  useEffect(() => {
    setSelectedItem(preSelectedItem);
  }, [preSelectedItem]);

  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth>
      <InputLabel 
        id={id} 
        required={required}
      >
        {label}
      </InputLabel>
      <Select
        id={id}
        labelId={id}
        label={label}
        value={selectedItem}
        disabled={disabled}
        onChange={handleSelectedItem}
      >
        {
          itemsList.map(({ key, value, content, style }) => (
            <MenuItem key={key} value={value} style={style}>
              {content}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}