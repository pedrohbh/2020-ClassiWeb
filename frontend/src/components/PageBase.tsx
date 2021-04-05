import { Grid } from '@material-ui/core';
import AppBar from './AppBar';
import Footer from './Footer';

export default function PageBase({ children, footer = true }) {
  return (
    <>
    <Grid container direction='column' style={{ height: '100%' }}>

      <AppBar/>

      <Grid item style={{ flex: 1, width: '100%', overflow: 'auto' }}>
        { children }
        { footer && <Footer/> }
      </Grid>
      
    </Grid>
    </>
  );
}
