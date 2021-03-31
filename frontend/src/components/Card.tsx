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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const StyledButton = withStyles({
  root: {
    color: '#E65252'
  },
})((props: any) => <Button size="large" {...props}/>);

export default function AdCard({ title, price, imgRef, city, UF }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100%"
          image={imgRef}
          style={{ height: 200 }}
          title="Contemplative Reptile"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="h2">
            { title }
          </Typography>

          <NumberFormat 
            value={2456981.5} 
            displayType={'text'} 
            thousandSeparator={'.'} 
            decimalSeparator={','} 
            prefix={'R$'} 
            decimalScale={2}
            fixedDecimalScale={true}
            style={{ fontSize: 18 }}
          />
          
          <Typography gutterBottom component="h5" style={{ display: 'flex', alignItems: 'center', marginLeft: -3, marginTop: 10}}>
            <RoomIcon style={{ fontSize: 20 }}/> {city}, {UF}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'center' }}>
        <StyledButton size="small" color="primary">
          <FavoriteIcon style={{ fontSize: 20 }}/>
          Adicionar à Lista de Desejos
        </StyledButton>
        <StyledButton size="small" color="primary">
          <ShoppingCartIcon style={{ fontSize: 20 }}/>
          Comprar
        </StyledButton>
      </CardActions>
    </Card>
  );
}