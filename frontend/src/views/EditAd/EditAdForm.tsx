import { Button, Fab, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
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
import Visibility from './Visibility';
import ImageController from '../../controllers/ImageController';
import StyledButton from '../../components/StyledButton';

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

export default function EditAdForm() {
  const history = useHistory();
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState({ id: '', state: '', city: '' });
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productState, setProductState] = useState('');
  const [images, setImages] = useState([]);
  const [owner, setOwner] = useState({ name: '' });
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState(0);
  const [state, setState] = useState();
  const [numberSelectedImages, setNumberSelectedImages] = useState(0);

  const id = localStorage.getItem('adId');

  useEffect(() => {
    AdController.get(id)
      .then(data => {
        setTitle(data.title);
        setOwner(data.owner);
        setPrice(data.price);
        setCategory(data.category.name);
        setAddress(data.address);
        setQuantity(data.quantity);
        setDescription(data.description);
        setProductState(data.product_state);
        setState(data.state);
        setImages(data.images);
        setNumberSelectedImages(data.images.length);
      })
  }, []);

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

    if (files && files[0]) {
      const maxAllowedSize = 5 * 1024 * 1024;
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

    const responses = await Promise.allSettled(
      Array.from(input.files).map((f) => {
        return AdController.images(adId, f);
      }));

    if (responses.some((e) => e !== undefined)) {
      images.map(i => {
        ImageController.delete(i);
      })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = getFormData(event);

    const newAd = {
      ...formData,
      address,
      category,
      product_state: productState,
      state
    };

    const price = newAd.price
      .replaceAll('.', '')
      .replaceAll(',', '.');

    newAd.price = parseFloat(price);

    newAd.quantity = parseInt(newAd.quantity, 10);

    delete newAd.images;

    Swal.fire({
      text: "Confirma a alteração das informações?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      icon: 'warning',
      cancelButtonColor: '#ed4a4a',
      confirmButtonColor: '#80cc54',
      reverseButtons: true
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await AdController.update(id, newAd)
            .then(async (response) => {
              if (response) {
                await handleUploadImages(id)
                Swal.fire({
                  text: "Anúncio atualizado!",
                  icon: "success",
                  confirmButtonColor: "#a6dc86"
                }).then(() => {
                  history.push('/userpanel/myads');
                })
              } else {
                Swal.fire({
                  title: "Algum erro aconteceu...",
                  text: "Tente novamente mais tarde",
                  icon: "warning",
                  confirmButtonColor: "#ed4a4a"
                });
              }
            });
        }
      });
  }

  return (
    <Grid item xs={12}>
      <Grid container direction="column" alignItems="center" style={{ height: '100%', justifyContent: 'center', marginTop: '1%' }}>
        <h1 className={classes.text}>Atualizar informações do anúncio</h1>

        <form className={classes.formContainer} autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <StyledTextField
                id="title"
                label="Nome"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <CurrencyTextField
                fullWidth
                id="price"
                label="Preço"
                textAlign="left"
                variant="outlined"
                currencySymbol="R$"
                decimalCharacter=","
                digitGroupSeparator="."
                value={price}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                id="quantity"
                type="number"
                label="Quantidade Disponível"
                InputProps={{ inputProps: { min: 1 } }}
                value={quantity}
                onChange={event => setQuantity(event.target.value)}
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
              <StyledTextField
                multiline
                id="description"
                label="Descrição"
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <ProductState
                required={false}
                preSelected={productState}
                onChange={selectedProductState => setProductState(selectedProductState)}
              />
            </Grid>

            <Grid item xs={12}>
              <Address
                preSelectedCity={address.city}
                preSelectedState={address.state}
                onChange={(newAddress) => setAddress(newAddress)}
              />
            </Grid>

            <Grid item xs={12}>
              <Visibility
                preSelected={state}
                onChange={selectedState => setState(selectedState)}
              />
            </Grid>

            <Grid item xs={12}>
              Substituir imagens
            </Grid>

            <Grid item xs={12}>
              <input
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
          <StyledButton type="submit">
            Atualizar
          </StyledButton>
        </form>
      </Grid>
    </Grid>
  );
}