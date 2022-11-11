import React from 'react';
import { Outlet } from 'react-router-dom';
import PermanentDrawer from '../components/PermanentDrawer';

const drawerWidth = 240;

const Layout = () => (
  <PermanentDrawer drawerWidth={drawerWidth}>
    <Outlet />
  </PermanentDrawer>
);

export default Layout;
