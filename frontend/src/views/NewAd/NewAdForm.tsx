import { Button, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Address from '../../components/Address';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AdController from '../../controllers/AdController';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

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
  const [selectedState, setSelectedState] = useState(0);

  const handleSubmit = async event => {
    event.preventDefault();

    const inputs = Object.values(event.target);
    const formData: any = inputs
      .filter((el: any) => ["INPUT","TEXTAREA"].includes(el.tagName) && el.id)
      .reduce((data: any, input: any) => ({...data, [input.id]: input.value}), {});

    console.log(formData)

    const newAd = { 
      ...formData, 
      address, 
      state: selectedState 
    };

    console.log(newAd);

    // const res = await AdController.postAd(newAd);
    // console.log(res);
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
              <StyledTextField required id="name" label="Nome"/>
            </Grid>

            <Grid item xs={12}>
              <CurrencyTextField 
                required 
                id="price" 
                label="Preço"
                fullWidth 
                variant="outlined"
                currencySymbol="R$"
                decimalCharacter=","
                digitGroupSeparator="."
                textAlign="left"
                outputFormat="number"
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

            {/* TODO
            Transformar Categoria em um componente */}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel required id="category">Categoria</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="Categoria"
                >
                  <MenuItem key='c1' value='Categoria1'>Categoria 1</MenuItem>
                  <MenuItem key='c2' value='Categoria2'>Categoria 2</MenuItem>
                  <MenuItem key='cN' value='CategoriaN'>Categoria N</MenuItem>
                </Select>
              </FormControl>
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
                <InputLabel required id="state">Estado</InputLabel>
                <Select
                  labelId="state"
                  id="state"
                  label="Estado"
                  value={selectedState}
                  onChange={handleSelectState}
                >
                  <MenuItem key='new' value={1}>Novo</MenuItem>
                  <MenuItem key='used' value={0}>Usado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Address onChange={ newAddress => setAddress(newAddress) }/>
            </Grid> 

            <Grid item xs={12}>
              {/* https://codesandbox.io/s/vj1q68zm25 */}
              <input
                accept="image/*"
                id="images"
                multiple
                type="file"
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