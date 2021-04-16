import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Address from "../../components/Address";
import Categories from "../../components/Categories";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { FaFilter } from 'react-icons/fa';
import ProductState from "../../components/ProductState";

const StyledButton = withStyles({
  root: {
    width: '150px',
    maxWidth: '70%',
    background: '#E65252',
    '&:hover':{
        background: '#fc7474',
    },
    color: 'white',
  },
})((props: any) => <Button size="large" {...props}/>);

const StyledTextField = props => <TextField fullWidth variant="outlined" {...props} />

export default function Filters({ onChange }) {
  const [text, setText] = useState(localStorage.getItem('searchText'));
  const [category, setCategory] = useState(localStorage.getItem('searchCategory') || '');
  const [address, setAddress] = useState({ state: '', city: '' });
  const [productState, setProductState] = useState('');

  const handleChangeFilters = async event => {
    event.preventDefault();
    
    const min_price = (document.querySelector('#min_price') as HTMLInputElement)?.value
      .replace('.', '')
      .replace(',', '.');

    const max_price = (document.querySelector('#max_price') as HTMLInputElement)?.value
      .replace('.', '')
      .replace(',', '.');

    let categories;
    
    // Tenta converter as categorias para um array
    try {
      categories = JSON.parse(category);
    } catch (error) {
      categories = category === "" ? [] : [category];
    };

    const newFilters = {
      text,
      address, 
      categories, 
      min_price,
      max_price,
      product_state: productState
    };

    console.log(newFilters);

    onChange(newFilters);
  }

  return (
    <Grid
      item
      xs={3}
      lg={2}
      style={{
        height: 'auto',
        boxShadow: "2px 2px 8px 1px #dedede",
        padding: "20px",
        borderRadius: '5px'
      }}
    >
      <h3 style={{ marginBottom: '2vh' }}>Filtros</h3>
      <Grid direction='column' container spacing={1}>

        <Grid item>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <StyledTextField
                variant="outlined"
                label="Texto da busca"
                value={text}
                onChange={ event => setText(event.target.value) }
              />
            </Grid>

            <Grid item xs={12}>
              <Categories 
                required={false} 
                preSelected={category} 
                onChange={selectedCategory => setCategory(selectedCategory)}
              />
            </Grid>

            <Grid item xs={12}>
              <ProductState 
                required={false} 
                onChange={selectedProductState => setProductState(selectedProductState)} 
              />
            </Grid>

            <Grid item xs={12}>
              <Address 
                required={false}
                onChange={ newAddress => setAddress(newAddress) }
              />
            </Grid>

            <Grid item xs={12}>
              
              <Grid container spacing={1}>
                
                <Grid item xs={6}>
                  <CurrencyTextField
                    fullWidth 
                    id="min_price" 
                    label="Preço mínimo"
                    textAlign="left"
                    variant="outlined"
                    currencySymbol="R$"
                    decimalCharacter=","
                    digitGroupSeparator="."
                  />
                </Grid>

                <Grid item xs={6}>
                  <CurrencyTextField
                    fullWidth 
                    id="max_price" 
                    label="Preço máximo"
                    textAlign="left"
                    variant="outlined"
                    currencySymbol="R$"
                    decimalCharacter=","
                    digitGroupSeparator="."
                  />
                </Grid>

              </Grid>

            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <StyledButton onClick={handleChangeFilters}>
                <FaFilter style={{ fontSize: '15px', marginRight: '4.5px' }}/>
                &nbsp;Filtrar
              </StyledButton>
            </Grid>

          </Grid>

        </Grid>

      </Grid>
    </Grid>
  );
}