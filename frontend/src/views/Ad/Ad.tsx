import { Button, Grid, Paper, withStyles } from '@material-ui/core';
import React from 'react';
import { FaHandshake } from 'react-icons/fa';
import PageBase from '../../components/PageBase';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';
import { Rating } from '@material-ui/lab';

const StyledButton = withStyles({
  root: {
    width: '150px',
    maxWidth: '70%',
    background: '#E65252',
    '&:hover':{
        background: '#fc7474',
    },
    color: 'white',
  },
})((props: any) => <Button size="large" {...props}/>);

export default function Ad() {

  return (
    <PageBase footer={false}>
      <Grid container justify='center' style={{ height: '100%' }}>

        <Grid item xs={10}>
          
          <Grid container style={{ height: '100%', backgroundColor: '#f7f7f7' }}>

            {/* Lado esquerdo */}
            <Grid item xs={8}>

              <Grid container direction='column' spacing={2} style={{ padding: '2vw' }}>

                <Grid item style={{ width: '100%', textAlign: 'center' }}>
                  <h1>Título do anúncio</h1>
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
                      <p>Vitória, ES</p>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
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
                    <h1>R$ 5920,55</h1>
                  </Paper>
                </Grid>

                <Grid item style={{ width: '100%', textAlign: 'center', margin: '10% auto' }}>
                  <StyledButton>
                    <FaHandshake style={{ fontSize: '20px', marginRight: '4.5px' }}/>
                    &nbsp;Comprar
                  </StyledButton>
                </Grid>

                <Grid item style={{ width: '100%', textAlign: 'center' }}>

                  <Grid container justify='center' alignItems='center' spacing={2}>

                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ borderRadius: '50%', width: '60px', height: '60px', backgroundColor: '#b7b7b7'}}></div>
                    </Grid>

                    <Grid item style={{ textAlign: 'center' }}>
                      <p>FULANO DE TAL</p>
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