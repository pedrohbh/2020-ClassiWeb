import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CategoryController from '../controllers/CategoryController';

export default function Categories({ onChange, required = true }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    CategoryController.getAll()
        .then(CategoriesList => {
            setCategories(CategoriesList);
            // setIsLoading(false);
        });
  }, []);

  const handleSelectCategory = ({ target }) => {
    setSelectedCategory(target.value);
    onChange(target.value);
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel required={required} id="category">Categoria</InputLabel>
      <Select
          id="category"
          label="Categoria"
          labelId="category"
          value={selectedCategory}
          onChange={handleSelectCategory}
      >
        { !required && 
          <MenuItem key={'Todas'} value={JSON.stringify(categories.map(({ name }) => name )) }>{'Todas'}</MenuItem> 
        }
        {
            categories.map(({ name }) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
  );
}
