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
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FaHandshake } from 'react-icons/fa';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: 345
  },
});

const StyledButton = withStyles({
  root: {
    color: '#E65252'
  },
})((props: any) => <Button size="large" {...props} />);

export default function AdCard({ id='', title, price, imgRef, city, UF, myAds=false, wishList=false, myShopping=false }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClickAd = () => {
    history.push(`/ad/${id}`);
  }

  return (
    <Card className={classes.root}>
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

          <Typography gutterBottom component="h5" style={{ display: 'flex', alignItems: 'center', marginLeft: -3, marginTop: 10 }}>
            <RoomIcon style={{ fontSize: 20 }} /> {city}, {UF}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <StyledButton size="small" color="primary">
          {myAds ?
            <>
              <EditIcon style={{ fontSize: 20 }} />
              &nbsp;&nbsp;Editar
            </>
            :
            wishList ?
              <>
                <DeleteIcon style={{ fontSize: 20 }} />
                &nbsp;&nbsp;Remover
              </>
              :
              myShopping ?
                null
                :
                <>
                  <FavoriteIcon style={{ fontSize: 20 }} />
                  Adicionar à Lista de Desejos
                </>
          }
        </StyledButton>
        <StyledButton size="small" color="primary">
          {myAds ?
            <>
              <DeleteIcon style={{ fontSize: 20, marginRight: '4.5px' }} />
              Excluir
            </>
            :
            myShopping ?
              null
              :
              <>
                <FaHandshake style={{ fontSize: 20, marginRight: '4.5px' }} />
                Comprar
              </>
          }
        </StyledButton>
      </CardActions>
    </Card>
  );
}