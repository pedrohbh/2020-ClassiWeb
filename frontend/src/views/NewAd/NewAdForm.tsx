import { Button, Fab, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Address from '../../components/Address';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AdController from '../../controllers/AdController';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Categories from '../../components/Categories';
import getFormData from '../../utils/getFormData';
import ProductState from '../../components/ProductState';
import { AdvertisingState } from '../../controllers/AdController';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

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

export default function NewAdForm() {
  const history = useHistory();
  const classes = useStyles();

  const [address, setAddress] = useState({});
  const [category, setCategory] = useState('');
  const [productState, setProductState] = useState('');

  async function handleUploadClick(){
    const input : any = document.querySelector('#images');

    function getBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    const files = await Promise.all([...input.files].map(element => {
      return getBase64(element);
    }));

    const ret = await AdController.images({files});
    console.log(ret);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = getFormData(event);

    const newAd = { 
      ...formData, 
      address, 
      category, 
      product_state: productState,
      state: AdvertisingState.VISIBLE,
      token: localStorage.getItem('token')
    };

    const price = newAd.price
      .replaceAll('.', '')
      .replaceAll(',', '.');

    newAd.price = parseFloat(price);

    newAd.quantity = parseInt(newAd.quantity, 10);

    delete newAd.images; // Remover esta linha após estar configurado o recebimento de imagens no backend

    // console.log(JSON.stringify(newAd));

    await AdController.postAd(newAd)
      .then(response => {
        response ?
          Swal.fire({
            text: "Anúncio publicado!",
            icon: "success",
            confirmButtonColor: "#a6dc86",
            confirmButtonText: "Ir para página principal",
            allowOutsideClick: false
          })
            .then(() => {
              history.push('/');
            })
          :
          Swal.fire({
            title: "Algum erro aconteceu...",
            text: "Tente novamente mais tarde",
            icon: "warning",
            confirmButtonColor: "#ed4a4a"
          })
      });
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
              <ProductState onChange={ selectedProductState => setProductState(selectedProductState) }/>
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
                onChange={handleUploadClick}
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