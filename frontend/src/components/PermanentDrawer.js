import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Outlet, NavLink, Link, useMatch, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import logo from '../assets/imgs/mogus.png'

const items = [
  {
    uid: 1,
    text: 'Prescripciones',
    icon: <InboxIcon />,
    paths: ['/prescripciones'],
    visible: true,
  },
  {
    uid: 2,
    text: 'Stock',
    icon: <MailIcon />,
    paths: ['/stock'],
    visible: true,
  },
];



const PermanentDrawer = ({drawerWidth, children}) => {
  
  let seccionActual = 'Pagina no encontrada';
  const drawer = (
    <>
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          width={drawerWidth - 10}
        />
      </Link>
      <Divider />
      <List> 
        {items.map(({
          uid, text, icon, paths, visible,
        }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const active = _.some(_.map(paths, (path) => useMatch({ path: `${path}/*` }) !== null));
          if (active) seccionActual = text;
          if (!visible) {
            return null;
          }
          return (
            <ListItem
              disablePadding
              component={NavLink}
              to={paths[0]}
              key={uid}
            >
              <ListItemButton
                selected={active}
              >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sistema de stock y prescripciones
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default PermanentDrawer;