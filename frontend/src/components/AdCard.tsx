import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FaHandshake } from 'react-icons/fa';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import AdController from '../controllers/AdController';
import WishListController from '../controllers/WishListController';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  root: {
    width: 345
  },
});

const StyledButton = withStyles({
  root: {
    color: (props: any) => {
      return props.$mySales ? '#edb005' : '#E65252';
    }  
  },
})((props: any) => <Button size="large" {...props} />);

export default function AdCard({ id='', title, price, imgRef, city, UF, myAds=false, wishList=false, myShopping=false, mySales=false}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClickAd = () => {
    history.push(`/ad/${id}`);
  }

  const handleEditAd = () => {
    localStorage.setItem('adId', id);
    history.push(`/editad`);
    // history.push(`/ad/edit/${id}`);
  }

  const handleRemoveFromWishList = () => {
    Swal.fire({
      text: "Deseja remover da Lista de Desejos?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      icon: 'warning',
      confirmButtonColor: '#ed4a4a',
      reverseButtons: true,
      focusCancel: true
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await WishListController.delete(id)
          .then(response => {
            console.log(response);
            Swal.fire({
              text: "Removido com sucesso!",
              icon: "success",
              confirmButtonColor: "#80cc54"
            });
            document.getElementById(id)?.remove();
          });
      }
    });
  }

  const handleAddToWishList = () => {
    //TO DO verificar se já foi adicionado
    WishListController.post(id);
  }

  const handleDeleteAd = () => {
    Swal.fire({
      text: "Deseja excluir permanentemente o anúncio?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      icon: 'warning',
      confirmButtonColor: '#ed4a4a',
      focusCancel: true,
      reverseButtons: true
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await AdController.delete(id)
          .then(response => {
            console.log(response);
            Swal.fire({
              text: "Excluído com sucesso!",
              icon: "success",
              confirmButtonColor: "#80cc54"
            });
          });
      }
    });
  }

  const handleBuy = () => {
    history.push(`/ad/${id}`);
  }

  return (
    <Card id={id} className={classes.root}>
      <CardActionArea onClick={handleClickAd}>
        <CardMedia
          component="img"
          alt="Imagem do anúncio"
          height="100%"
          image={imgRef}
          style={{ height: 200 }}
          title="Imagem do anúncio"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'R$'}
            decimalScale={2}
            fixedDecimalScale={true}
            style={{ fontSize: 18 }}
          />

          { !myShopping && !wishList && !mySales &&
            <Typography gutterBottom component="h5" style={{ display: 'flex', alignItems: 'center', marginLeft: -3, marginTop: 10 }}>
              <RoomIcon style={{ fontSize: 20 }} /> {city}, {UF}
            </Typography>
          }

        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'space-between' }}>
        {myAds ?
            <StyledButton size="small" color="primary" onClick={handleEditAd}>
              <EditIcon style={{ fontSize: 20 }} />
              &nbsp;&nbsp;Editar
            </StyledButton>
            :
            wishList ?
              <StyledButton size="small" color="primary" onClick={handleRemoveFromWishList}>
                <DeleteIcon style={{ fontSize: 20 }} />
                &nbsp;&nbsp;Remover
              </StyledButton>
              :
              myShopping ?
                null
                :
                mySales ?
                  <StyledButton $mySales={mySales} size="small" color="primary" onClick={handleAddToWishList}>
                    <StarIcon style={{ fontSize: 20 }} />
                    Avaliar Comprador
                  </StyledButton>
                  :
                  <StyledButton size="small" color="primary" onClick={handleAddToWishList}>
                    <FavoriteIcon style={{ fontSize: 20 }} />
                    Adicionar à Lista de Desejos
                  </StyledButton>
        }

        {myAds ?
            <StyledButton size="small" color="primary" onClick={handleDeleteAd}>
              <DeleteIcon style={{ fontSize: 20, marginRight: '4.5px' }} />
              Excluir
            </StyledButton>
            :
            myShopping || mySales ?
              null
              :
              <StyledButton size="small" color="primary" onClick={handleBuy}>
                <FaHandshake style={{ fontSize: 20, marginRight: '4.5px' }} />
                Comprar
              </StyledButton>
          }
      </CardActions>
    </Card>
  );
}