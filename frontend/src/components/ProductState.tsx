import { ProductState as State } from '../controllers/AdController';
import MySelect from "./MySelect";

export default function ProductState({ required = true, onChange, preSelected = '' }) {
  const states = [
    {
      key: 'new',
      value: State.NEW,
      content: 'Novo'
    },
    {
      key: 'secondhand',
      value: State.SECONDHAND,
      content: 'Usado'
    }
  ]

  const handleSelect = (selected) => {
    onChange(selected);
  }

  return (
    <MySelect
      id="product_state"
      label="Estado"
      required={required}
      itemsList={states}
      preSelectedItem={preSelected}
      onChange={ selected => handleSelect(selected) }
    />
  );
}