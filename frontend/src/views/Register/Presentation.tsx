import { createStyles, makeStyles, Grid } from '@material-ui/core';
import Logotipo from "../../assets/ClassiWeb.svg";

const useStyles = makeStyles((theme) => 
  createStyles({
    logo: {
      width: '60%', 
      minWidth: '200px'
    },

    message: {
      marginTop: "5%",
      fontSize: "18pt",
      textAlign: "center",
    },
}));

export default function Presentation() {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" justify="center" style={{height: '100%'}}>
      <img className={classes.logo} src={Logotipo} alt="ClassiWeb"/>
      <div className={classes.message}>
        <p>
          Seja bem-vindo ao <em><b>ClassiWeb</b></em>
        </p>
        <p>
          O <b>maior</b> portal de classificados da internet!
        </p>
      </div>
    </Grid>
  );
}