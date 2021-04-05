import { Button, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Address from '../../components/Address';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AdController from '../../controllers/AdController';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Categories from './Categories';
import getFormData from '../../utils/getFormData';

const StyledButton = withStyles({
  root: {
    background: '#E65252',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': { 
      background: '#fc7474' 
    },
    marginTop: "2%",
  },

  label: {
    textTransform: 'capitalize',
  },
})((props: any) => <Button size="large" {...props}/>);

const StyledTextField = props => <TextField fullWidth variant="outlined" {...props} />

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      textAlign: "center",
    },

    formContainer: {
      display: "flex",
      flexDirection: "column",
      width: "40%",
      alignItems: "center",
      margin: "2%"
    },
  }),
);

const StyledAddPhotoAlternateIcon = withStyles({
  root: {
    color: '#c4c4c4'
  }
})((props: any) => <AddPhotoAlternateIcon {...props}/>);

const StyledFab = withStyles({
  root: {
    backgroundColor: 'transparent',
    '&:hover *': {
      color: '#a4a4a4',
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    boxShadow: 'none',
    border: '1px solid #c4c4c4'
  }
})((props: any) => <Fab {...props}/>);

export default function RegisterForm() {
  const classes = useStyles();

  const [address, setAddress] = useState({});
  const [category, setCategory] = useState('');
  const [selectedState, setSelectedState] = useState();

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = getFormData(event);

    const newAd = { 
      ...formData, 
      // address, 
      category, 
      product_state: selectedState 
    };

    delete newAd.images; // Remover esta linha após estar configurado o recebimento de imagens no backend

    console.log(newAd);

    const res = await AdController.postAd(newAd);
    console.log(res);
  }

  const handleSelectState = ({ target }) => {
    setSelectedState(target.value);
  }

  return (
    <Grid container direction="column" alignItems="center" style={{height: '100%', justifyContent: 'center'}}>
      <h1 className={classes.text}>Publique agora um novo anúncio!</h1>
      
      <form className={classes.formContainer} autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <StyledTextField required id="title" label="Nome"/>
            </Grid>

            <Grid item xs={12}>
              <CurrencyTextField 
                required 
                fullWidth 
                id="price" 
                label="Preço"
                textAlign="left"
                variant="outlined"
                currencySymbol="R$"
                decimalCharacter=","
                digitGroupSeparator="."
              />
            </Grid>
            
            <Grid item xs={12}>
              <StyledTextField 
                required 
                id="quantity" 
                type="number" 
                label="Quantidade Disponível" 
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Categories onChange={ selectedCategory => setCategory(selectedCategory) }/>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField 
                required 
                multiline 
                id="description" 
                label="Descrição" 
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel required id="product_state">Estado</InputLabel>
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
            </Grid>

            <Grid item xs={12}>
              <Address onChange={ newAddress => setAddress(newAddress) }/>
            </Grid> 

            <Grid item xs={12}>
              {/* https://codesandbox.io/s/vj1q68zm25 */}
              <input
                multiple
                type="file"
                id="images"
                accept="image/*"
                style={{ display: 'none' }}
                // onChange={this.handleUploadClick}
              />
              <label htmlFor="images">
                <StyledFab component="span" >
                  <StyledAddPhotoAlternateIcon  />
                </StyledFab>
              </label>
            </Grid>

          </Grid>
          <StyledButton type="submit" variant="contained">
            Publicar
          </StyledButton>
      </form>
    </Grid>
  );
}