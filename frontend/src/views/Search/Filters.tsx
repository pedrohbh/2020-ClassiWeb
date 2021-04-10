import { Button, Grid, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Address from "../../components/Address";
import Categories from "../../components/Categories";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { FaFilter } from 'react-icons/fa';

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

export default function Filters() {
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState({});

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
              <Categories required={false} onChange={selectedCategory => setCategory(selectedCategory)} />
            </Grid>

            <Grid item xs={12}>
              <Address onChange={ newAddress => setAddress(newAddress) }/>
            </Grid>

            <Grid item xs={12}>
              
              <Grid container spacing={1}>
                
                <Grid item xs={6}>
                  <CurrencyTextField
                    fullWidth 
                    id="price" 
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
                    id="price" 
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
              <StyledButton>
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