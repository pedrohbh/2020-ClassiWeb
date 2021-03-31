import { Button, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Address from '../../components/Address';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

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
  
  const urlPost = '';

  const handleSubmit = event => {
    console.log('');
  }

  return (
    <Grid container direction="column" alignItems="center" style={{height: '100%', justifyContent: 'center'}}>
      <h1 className={classes.text}>Publique agora um novo anúncio!</h1>
      
      <form method='POST' action={urlPost} className={classes.formContainer} autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <StyledTextField required id="name" label="Nome"/>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField required id="price" label="Preço"/>
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel required id="demo-simple-select-outlined-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Categoria"
                >
                  <MenuItem key='c1' value='Categoria1'>Categoria 1</MenuItem>
                  <MenuItem key='c2' value='Categoria2'>Categoria 2</MenuItem>
                  <MenuItem key='cN' value='CategoriaN'>Categoria N</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField required multiline id="description" label="Descrição" />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel required id="demo-simple-select-outlined-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Estado"
                >
                  <MenuItem key='new' value='Novo'>Novo</MenuItem>
                  <MenuItem key='used' value='Usado'>Usado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Address/>
            </Grid> 

            <Grid item xs={12}>
              {/* https://codesandbox.io/s/vj1q68zm25 */}
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                // onChange={this.handleUploadClick}
              />
              <label htmlFor="contained-button-file">
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