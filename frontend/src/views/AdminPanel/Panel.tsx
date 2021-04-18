import React, { useState } from 'react';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import CategoriesList from './CategoriesList';
import { useHistory } from 'react-router';

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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const MyTabs = withStyles((theme: Theme) => ({
  indicator: {
    backgroundColor: '#E65252'
  }
}))(Tabs);

export default function Panel() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if(!token) {
    history.push('/');
  }

  return (
    <div>
      <MyTabs
        value={value}
        onChange={handleChangeTab}
        centered
      >
        <Tab label="Gerenciar categorias" />

      </MyTabs >

      <TabPanel value={value} index={0}>
        <CategoriesList/>
      </TabPanel>
    </div>
  );
}