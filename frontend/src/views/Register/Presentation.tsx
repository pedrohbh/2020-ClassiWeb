import { createStyles, makeStyles } from '@material-ui/core';
import Logotipo from "../../assets/ClassiWeb.png";

const useStyles = makeStyles((theme) => 
  createStyles({
    presentation: {
      margin: 0,
      float: "left",
      width: "53vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      verticalAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
    },

    logo: {
      width: '60%', 
      minWidth: '200px'
    },

    message: {
      width: "70%",
      marginTop: "5%",
      fontSize: "18pt",
      textAlign: "center",
    },

    p: {
      margin: 0,
      padding: 0,
    }
}));

export default function Presentation() {
  const classes = useStyles();

  return (
    <div className={classes.presentation}>
      <img className={classes.logo} src={Logotipo} alt="ClassiWeb"/>
      <div className={classes.message}>
        <p className={classes.p}>
          Seja bem-vindo ao <em><b>ClassiWeb</b></em>
        </p>
        <p className={classes.p}>
          O <b>maior</b> portal de classificados da internet!
        </p>
      </div>
    </div>
  );
}