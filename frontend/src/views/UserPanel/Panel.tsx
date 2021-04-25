import React, { useState } from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyAds from './MyAds';
import MyProfile from './MyProfile';
import Purchase from './Purchase';
import WishesList from './WishesList';
import MySales from './MySales';
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

const MyTabs = withStyles((theme: Theme) => ({
  indicator: {
    backgroundColor: '#E65252'
  }
}))(Tabs);

const getTabIndex = (tab, tabs) => {
  const index = tabs.findIndex((t) => {
    return t.tab === tab;
  });

  return index < 0 ? 0 : index;
}

const tabs = [
  {
    tab: "profile",
    label: "Meu perfil",
    component: <MyProfile/>
  },
  {
    tab: "myads",
    label: "Meus anúncios",
    component: <MyAds/>
  },
  {
    tab: "wisheslist",
    label: "Lista de Desejos",
    component: <WishesList/>
  },
  {
    tab: "purchases",
    label: "Minhas compras",
    component: <Purchase/>
  },
  {
    tab: "sales",
    label: "Minhas vendas",
    component: <MySales/>
  }
];

export default function Panel({ match }) {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [value, setValue] = useState(getTabIndex(match.params.tab, tabs));

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if(!token) {
    history.push('/');
  }

  return (
    <>
      <MyTabs
        value={value}
        onChange={handleChangeTab}
        centered
      >
        {
          tabs.map(({ label }) => (
            <Tab label={label}/>
          ))
        }
      </MyTabs>
      {
        tabs.map(({ component }, index) => (
          <TabPanel value={value} index={index}>
            {component}
          </TabPanel>
        ))
      }
    </>
  );
}