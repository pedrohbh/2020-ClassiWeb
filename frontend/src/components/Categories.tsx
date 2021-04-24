import { useEffect, useState } from 'react';
import CategoryController from '../controllers/CategoryController';
import MySelect from './MySelect';

export default function Categories({ 
  onChange, 
  required = true, 
  preSelected = '', 
  filters=false 
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryController.getAll()
      .then(categoriesList => {

        const c = categoriesList.map(({ name }) => ({
          key: name,
          value: name,
          content: name
        }))

        if (required) {
          c.unshift({
            key: '',
            value: '',
            content: '',
            style: { display: 'none' }
          })
        }

        if (filters) {
          c.unshift({
            key: 'Todas',
            value: JSON.stringify(categoriesList.map(({ name }) => name )),
            content: 'Todas'
          })
        }

        setCategories(c);
      });
  }, []);

  const handleSelect = (selected) => {
    onChange(selected);
  }

  return (
    <MySelect
      id="category"
      label="Categoria"
      required={required}
      itemsList={categories}
      preSelectedItem={preSelected}
      onChange={ selected => handleSelect(selected) }
    />
  );
}
