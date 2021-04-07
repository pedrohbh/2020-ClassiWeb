import { Button, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import PageBase from '../../components/PageBase';

const StyledButton = withStyles({
  root: {
    width: '60%'
  },
})((props: any) => <Button size="large" {...props}/>);

export default function Ad() {

  return (
    <PageBase footer={false}>

      <Grid container justify='center' style={{ minHeight: 'calc(100% - 3vh)', height: 'max-content', marginTop: '3vh' }}>

        <Grid item xs={10} style={{ backgroundColor: '#e7e7e7'}}>

          <Grid container style={{ height: '100%'}}>

            <Grid item xs={8} style={{ backgroundColor: 'transparent'}}>
              <Grid container direction="column" style={{ height: '100%', rowGap: '3vh'}}>
                <h1>Título do anúncio</h1>
                <Grid container style={{ height: '40%', backgroundColor: 'lightsalmon'}}>
                  Carrossel de imagens do produto
                </Grid>

                <Grid container direction="column" style={{ width: '100%' }}>
                  <Grid item>
                    <h3>Descrição</h3>
                  </Grid>
                  <Grid item>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a libero nec felis feugiat malesuada sit amet at ipsum. Suspendisse id venenatis libero, sed fermentum velit. Nullam cursus a diam sit amet facilisis. Aenean maximus, justo nec pretium molestie, lacus mi pellentesque felis, eu laoreet tellus quam in ante. Nulla vel leo ut nisl molestie eleifend et vitae lacus. Praesent nec magna ut mi porta porttitor. Sed volutpat, metus sit amet aliquet facilisis, enim mi tempor diam, id viverra tortor lorem ullamcorper lectus. Etiam purus nulla, semper in arcu eget, facilisis ornare justo. Curabitur mollis velit congue suscipit rhoncus. Sed dictum eros at tortor aliquet volutpat. Cras nisi mi, tincidunt in facilisis a, facilisis at eros. Mauris turpis felis, bibendum vehicula metus id, hendrerit gravida urna. Nam ut euismod lectus, dapibus interdum leo. Aenean nec neque sed orci elementum tempus et at leo.
                    In sapien leo, placerat vitae ante quis, tincidunt tempus dui. Mauris vel quam ornare, aliquet elit eget, scelerisque massa. Nunc iaculis diam egestas ante posuere tincidunt. Sed dapibus volutpat cursus. Sed ut ante dignissim, suscipit urna ut, pulvinar lacus. Nam id fringilla diam, quis faucibus diam. Maecenas sed cursus justo. Sed eget rhoncus neque. Duis nec venenatis diam, ac feugiat ex. Donec in ultrices nisi.
                  </Grid>
                </Grid>
                
              </Grid>
              
            </Grid>

            <Grid item xs={4} style={{ backgroundColor: 'transparent'}}>
              <Grid container direction="column" alignItems='center' style={{ height: '100%', rowGap: '3vh'}}>
                <h1>Preço R$ 250,35</h1>
                <StyledButton style={{ backgroundColor: '#c4f589' }}>COMPRAR</StyledButton>
                <h3>Publicado por AUTOR</h3>
                <div style={{ borderRadius:'50%', backgroundColor:'lightskyblue', width:'100px', height:'100px'}}></div>
              </Grid>
              
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </PageBase>
  );
}