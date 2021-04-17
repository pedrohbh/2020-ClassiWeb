import { Box, Button, Grid, Paper, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaHandshake } from 'react-icons/fa';
import PageBase from '../../components/PageBase';
import Carousel from '../../components/Carousel';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';
import { Rating } from '@material-ui/lab';
import AdController from '../../controllers/AdController';
import NumberFormat from 'react-number-format';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Swal from 'sweetalert2';
import WishListController from '../../controllers/WishListController';
import PurchaseController from '../../controllers/PurchaseController';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router';
import ImageController from '../../controllers/ImageController';
import Feedback from './Feedback';
import EditIcon from '@material-ui/icons/Edit';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const MySwal = withReactContent(Swal);

const StyledButton = withStyles({
  root: {
    width: '100%',
    maxWidth: '70%',
    background: '#72d678',
    '&:hover': {
      background: '#66ba6b',
    },
    color: 'white',
  },
})((props: any) => <Button size="large" {...props} />);

const Image = ({ src, alt }) => <img src={src} alt={alt} style={{ maxHeight: '50vh', maxWidth: '100%' }} />;

export default function Ad({ match }) {
  const id = match.params.id;
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState({ id: '', state: '', city: '' });
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productState, setProductState] = useState('');
  const [images, setImages] = useState([] as any[]);
  // const [img, setImg] = useState('');
  const [owner, setOwner] = useState({ name: '', feedback: 0, email: '' });
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [state, setState] = useState();
  const history = useHistory();
  const [isOwner, setIsOwner] = useState(false);

  const handleRating = (rate) => {
    PurchaseController.postFeedback(id, rate);
    setTimeout(() => {
      MySwal.close();
      history.push('/userpanel/purchases');
    }, 500);
  }

  function handleImage(blob) {
    var myblob = new Blob([blob], { type: 'image/jpg' });
    // console.log(myblob)
    //   var reader = new FileReader();
    //   reader.addEventListener("loadend", function() {
    //     // reader.result contém o conteúdo do blob como uma array tipada
    //     console.log(reader.result)
    //  });
    //   console.log(reader.readAsDataURL(blob));
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(myblob);
    // console.log(imageUrl);
    return imageUrl;
  }

  useEffect(() => {
    AdController.get(id)
      .then(async data => {
        console.log(data);
        setTitle(data.title);
        setOwner(data.owner);
        setIsOwner(data.is_owner);
        setPrice(data.price);
        setCategory(data.category.name);
        setAddress(data.address);
        setQuantity(data.quantity);
        setDescription(data.description);
        setProductState(data.product_state);

        const tmpImgs = await Promise.allSettled(
          data.images.map((filename) => {
            return ImageController.get(filename)
              .then(response => {
                return 'data:image/*;base64,' + Buffer.from(response, 'binary').toString('base64')
              })
          })) as unknown as any[];
          
        setImages(tmpImgs.filter((img) => img.value).map((img) => img.value));
      })
  }, []);

  const handleAddToWishList = () => {
    WishListController.post(id);
  }

  const handleBuy = () => {
    Swal.fire({
      text: "Confirmar compra?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      icon: 'info',
      confirmButtonColor: '#80cc54',
      cancelButtonColor: '#ed4a4a',
      reverseButtons: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          PurchaseController.postPurchase(id) //TO DO buy controller; verificar se um anuncio pertence ao usuário; inativar anuncio ao concluir
            .then((response) => {
              if (response) {
                Swal.fire({
                  text: "Compra efetuada com sucesso!",
                  icon: "success",
                  confirmButtonText: "Avaliar compra",
                  confirmButtonColor: "#80cc54",
                  showCancelButton: true,
                  cancelButtonText: "Ir para página inicial",
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.isConfirmed) {
                    MySwal.fire({
                      title: "Avalie a compra!",
                      html: <Feedback onChange={handleRating} />,
                      showConfirmButton: false,
                    });
                  } else {
                    history.push('/');
                  }
                });
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
      });
  }

  const handleEditAd = () => {
    localStorage.setItem('adId', id);
    history.push(`/editad`);
    // history.push(`/ad/edit/${id}`);
  }

  return (
    <PageBase footer={false}>
      <Grid container justify='center' style={{ height: '100%' }}>

        <Grid item xs={10}>

          <Grid container style={{ height: '100%', backgroundColor: '#f7f7f7' }}>

            {/* Lado esquerdo */}
            <Grid item xs={8}>

              <Grid container direction='column' spacing={2} style={{ padding: '2vw' }}>

                <Grid item style={{ width: '100%', textAlign: 'center' }}>
                  <h1>{title}</h1>
                </Grid>

                <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Carousel images={images} />
                </Grid>

                <Grid item style={{ width: '100%' }}>

                  <Grid container spacing={2}>

                    <Grid item style={{ display: 'flex' }}>
                      <RoomIcon />
                      &nbsp;
                      <h3>Localização</h3>
                    </Grid>

                    <Grid item xs={12}>
                      <p>{address.city}, {address.state}</p>
                    </Grid>

                  </Grid>

                </Grid>

                <Grid item style={{ width: '100%' }}>

                  <Grid container spacing={2}>

                    <Grid item style={{ display: 'flex' }}>
                      <LocalOfferIcon />
                      &nbsp;
                      <h3>Estado</h3>
                    </Grid>

                    <Grid item xs={12}>
                      <p style={{ textAlign: 'justify' }}>
                        {productState ? 'Usado' : 'Novo'}
                      </p>
                    </Grid>

                  </Grid>

                </Grid>

                <Grid item style={{ width: '100%' }}>

                  <Grid container spacing={2}>

                    <Grid item style={{ display: 'flex' }}>
                      <DescriptionIcon />
                      &nbsp;
                      <h3>Descrição</h3>
                    </Grid>

                    <Grid item xs={12}>
                      <p style={{ textAlign: 'justify' }}>
                        {description}
                      </p>
                    </Grid>

                  </Grid>

                </Grid>

              </Grid>

            </Grid>

            {/* Lado direito */}
            <Grid item xs={4} style={{ borderLeft: '1px solid #d7d7d7' }}>

              <Grid container direction='column' alignItems='center' spacing={3} style={{ padding: '2vw' }}>

                <Grid item style={{ width: '100%', textAlign: 'center' }}>
                  <h1>&nbsp;</h1>
                </Grid>

                <Grid item style={{ width: '100%', textAlign: 'center', paddingTop: 0 }}>
                  <Paper
                    elevation={2}
                    style={{
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <h1>
                      <NumberFormat
                        value={price}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'R$'}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    </h1>
                  </Paper>
                </Grid>

                <Grid item style={{ width: '100%', textAlign: 'center', margin: '10% auto' }}>
                  {isOwner ?
                    <StyledButton
                      onClick={handleEditAd}
                      style={{ marginBottom: '2%', background: '#86c7f0' }}
                    >
                      <EditIcon style={{ fontSize: 20 }} />
                      &nbsp;Editar anúncio
                  </StyledButton>
                    :
                    <>
                      <StyledButton
                        onClick={handleAddToWishList}
                        style={{ marginBottom: '2%', background: '#fa6161' }}
                      >
                        <FavoriteIcon style={{ fontSize: '20px' }} />
                        &nbsp;Adicionar a lista de desejos
                      </StyledButton>

                      <StyledButton
                        onClick={handleBuy}
                      >
                        <FaHandshake style={{ fontSize: '20px', marginRight: '4.5px' }} />
                        &nbsp;Comprar
                      </StyledButton>
                    </>
                  }
                </Grid>

                <Grid item style={{ width: '100%', textAlign: 'center' }}>

                  <Grid container justify='center' alignItems='center' spacing={2}>

                    {/* <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ borderRadius: '50%', width: '60px', height: '60px', backgroundColor: '#b7b7b7'}}></div>
                    </Grid> */}

                    <Grid item style={{ textAlign: 'center' }}>
                      <strong style={{ fontSize: 20, textTransform: 'capitalize' }}>
                        {owner.name}
                      </strong>
                      <p style={{ fontSize: 18 }}>
                        {owner.email}
                      </p>
                    </Grid>

                  </Grid>

                </Grid>

                <Grid item style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <Rating name="avaliation" value={owner.feedback} precision={0.1} readOnly />
                  <p style={{ textAlign: 'center', fontSize: 15, marginTop: '7%' }}>
                    {!owner.feedback ?
                      'Usuário sem avaliação: Vendas insuficientes'
                      :
                      owner.feedback
                    }
                  </p>
                </Grid>

              </Grid>

            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </PageBase>
  );
}