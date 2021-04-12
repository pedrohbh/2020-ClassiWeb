import React, { useState } from 'react';
import { fade, makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'absolute',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const StyledButtonGroup = withStyles({
  grouped: {
    color: 'white',
    padding: '5px 20px',
  },

  groupedTextHorizontal: {
    '&:not(:last-child)': {
      borderRight: '1px solid rgba(255, 255, 255, 0.2)'
    }
  }
})((props: any) => <ButtonGroup {...props} />);

export default function MyAppBar({ showCreateNewAccount = true, showLogin = true }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isLogged = !!localStorage.getItem('token');

  const handleKey = (event) => {
    if(event.key == 'Enter'){
      localStorage.setItem('searchText', event.target.value);
      window.location.href = '/search';
    }
  }

  return (
    <>
      <AppBar style={{ backgroundColor: '#E65252', position: 'relative', }}>

        <Toolbar>

          <StyledButtonGroup variant="text">
            <Button href="../">Início</Button>
            { isLogged && <Button href="../newad">Publicar Anúncio</Button> }
            <Button>Sobre</Button>
          </StyledButtonGroup>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'buscar' }}
              onKeyUp={handleKey}
            />
          </div>

          <div className={classes.grow} />

          {isLogged ?
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={6} color="secondary">
                  <ForumIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={10} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls='menuId'
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            :
            <StyledButtonGroup variant="text">
              {
                showLogin ?
                  <Button href='../login'>Entrar</Button>
                  :
                  null
              }
              {showCreateNewAccount ?
                <Button href='../register'>Criar nova conta</Button>
                :
                null
              }
            </StyledButtonGroup>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}