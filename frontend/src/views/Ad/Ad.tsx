import { Button, Grid, Paper, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaHandshake } from 'react-icons/fa';
import PageBase from '../../components/PageBase';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';
import { Rating } from '@material-ui/lab';
import AdController from '../../controllers/AdController';
import NumberFormat from 'react-number-format';
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledButton = withStyles({
  root: {
    width: '100%',
    maxWidth: '70%',
    background: '#72d678',
    '&:hover':{
        background: '#66ba6b',
    },
    color: 'white',
  },
})((props: any) => <Button size="large" {...props}/>);

export default function Ad({ match }) {
  const id = match.params.id;
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState({ id: '', state: '', city: '' });
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productState, setProductState] = useState('');
  const [images, setImages] = useState([]);
  const [owner, setOwner] = useState({ name: '' });
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    AdController.get(id)
      .then(data => {
        // console.log(data);
        setTitle(data.title);
        setOwner(data.owner);
        setPrice(data.price);
        setCategory(data.category.name);
        setAddress(data.address);
        setQuantity(data.quantity);
        setDescription(data.description);
        setProductState(data.product_state);
        // setImages();
        // setState();
      })
  }, []);

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

                <Grid item style={{ width: '100%' }}>
                  <div style={{ height: '300px', backgroundColor: '#b7b7b7' }}></div>
                </Grid>
                
                <Grid item style={{ width: '100%' }}>

                  <Grid container spacing={2}>

                    <Grid item style={{ display: 'flex' }}>
                      <RoomIcon/>
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
                      <DescriptionIcon/>
                      &nbsp;
                      <h3>Descrição</h3>
                    </Grid>

                    <Grid item xs={12}>
                      <p style={{ textAlign:'justify' }}>
                        {description}
                      </p>
                    </Grid>
                    
                  </Grid>
                  
                </Grid>

              </Grid>

            </Grid>

            {/* Lado direito */}
            <Grid item xs={4} style={{ borderLeft:'1px solid #d7d7d7' }}>
              
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
                  <StyledButton style={{  marginBottom: '2%', background: '#fa6161' }}>
                    <FavoriteIcon style={{ fontSize: '20px', marginRight: '4.5px' }}/>
                    &nbsp;Adicionar a lista de desejos
                  </StyledButton>
                  <StyledButton>
                    <FaHandshake style={{ fontSize: '20px', marginRight: '4.5px' }}/>
                    &nbsp;Comprar
                  </StyledButton>
                </Grid>

                <Grid item style={{ width: '100%', textAlign: 'center' }}>

                  <Grid container justify='center' alignItems='center' spacing={2}>

                    {/* <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ borderRadius: '50%', width: '60px', height: '60px', backgroundColor: '#b7b7b7'}}></div>
                    </Grid> */}

                    <Grid item style={{ textAlign: 'center' }}>
                      <p>{owner.name}</p>
                    </Grid>

                  </Grid>
                  
                </Grid>

                <Grid item style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <Rating name="avaliation" value={3.4} precision={0.1} readOnly />
                  <h3>3.4</h3>
                </Grid>

              </Grid>

            </Grid>

          </Grid>

        </Grid>

      </Grid>
    </PageBase>
  );
}