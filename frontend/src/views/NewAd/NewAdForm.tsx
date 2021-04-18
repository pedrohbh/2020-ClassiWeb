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
})((props: any) => <Button size="large" {...props} />);

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
})((props: any) => <AddPhotoAlternateIcon {...props} />);

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
})((props: any) => <Fab {...props} />);

export default function NewAdForm() {
  const history = useHistory();
  const classes = useStyles();

  const [address, setAddress] = useState({});
  const [category, setCategory] = useState('');
  const [productState, setProductState] = useState('');
  const [numberSelectedImages, setNumberSelectedImages] = useState(0);

  function handleValidateImages(event) {
    const files = event.target.files;

    if (files.length > 5) {
      event.target.value = "";
      setNumberSelectedImages(0);
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#80cc54',
        title: `Limite máximo de 5 imagens excedido.`,
        text: 'Envie novamente as imagens'
      })
      return;
    }
    console.log(files);

    if (files && files[0]) {
      const maxAllowedSize = 5 * 1024 * 1024;
      console.log('entrei1');
      console.log(files);
      [...files].forEach(async (f, index) => {
        if (f.size > maxAllowedSize) {
          // files.splice(index, 1);
          Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#80cc54',
            title: `Tamanho da imagem "${f.name}" excedeu 5 MB.`,
            text: 'Envie novamente as imagens'
          })
          event.target.value = "";
          setNumberSelectedImages(0);
          return;
        }
      })
    }

    setNumberSelectedImages(files.length);
  }

  async function handleUploadImages(adId) {
    const input: any = document.querySelector('#images');

    Array.from(input.files).forEach(async (f, index) => {
      await AdController.images(adId, f);
    });
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

    delete newAd.images;

    await AdController.postAd(newAd)
      .then(async (response) => {
        if (response) {
          await handleUploadImages(response.id)
          Swal.fire({
            text: "Anúncio publicado!",
            icon: "success",
            confirmButtonColor: "#a6dc86",
            confirmButtonText: "Ok",
            allowOutsideClick: false
          })
            .then(() => {
              history.push('/userpanel/myads');
            })
        } else {
          Swal.fire({
            title: "Algum erro aconteceu...",
            text: "Tente novamente mais tarde",
            icon: "warning",
            confirmButtonColor: "#ed4a4a"
          })
        }
      });
  }

  return (
    <Grid container direction="column" alignItems="center" style={{ height: '100%', justifyContent: 'center' }}>
      <h1 className={classes.text}>Publique agora um novo anúncio!</h1>

      <form className={classes.formContainer} autoComplete="off" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={1}>

          <Grid item xs={12}>
            <StyledTextField required id="title" label="Nome" />
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
            <Categories onChange={selectedCategory => setCategory(selectedCategory)} />
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
            <ProductState onChange={selectedProductState => setProductState(selectedProductState)} />
          </Grid>

          <Grid item xs={12}>
            <Address onChange={newAddress => setAddress(newAddress)} />
          </Grid>

          <Grid item xs={12}>
            <input
              required
              multiple
              type="file"
              id="images"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleValidateImages}
            />
            <label htmlFor="images">
              <StyledFab component="span" >
                <StyledAddPhotoAlternateIcon />
              </StyledFab>
            </label>
            &nbsp;&nbsp;{numberSelectedImages} imagens selecionadas
          </Grid>

        </Grid>
        <StyledButton type="submit" variant="contained">
          Publicar
          </StyledButton>
      </form>
    </Grid>
  );
}