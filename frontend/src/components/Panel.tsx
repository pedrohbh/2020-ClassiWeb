import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ForumIcon from '@material-ui/icons/Forum';
import AdController from '../controllers/AdController';
import Ads from './Ads';
import { Grid } from '@material-ui/core';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // display: 'flex'
  }
}));

const MyTabs = withStyles((theme: Theme) => ({
  indicator: {
    backgroundColor: '#E65252'
  }
}))(Tabs);

export default function Panel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    AdController.getAll() // TODO trocar o get
      .then(adsList => {
        setIsLoading(false);
        if (adsList) {
          setAds(adsList);
          setError(false);
        } else {
          setError(true);
        }
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>

        <Grid item xs={2}>
          <MyTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {/* <Tab label="Meus anúncios" {...a11yProps(0)} /> */}
            <Tab label="Meus anúncios" {...a11yProps(0)} />
            <Tab label="Editar perfil" {...a11yProps(1)} />
            <Tab label="Minhas compras" {...a11yProps(2)} />
            <Tab label="Lista de Desejos" {...a11yProps(3)} />
          </MyTabs>
        </Grid>

        <Grid item xs={10}>

          <TabPanel value={value} index={0}> {/* TODO Ajustar largura */}
            <Ads
              ads={ads}
              isLoading={isLoading}
              error={error}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            {/* Item Two */}
          </TabPanel>

          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>

        </Grid>

      </Grid>

    </div>
  );
}