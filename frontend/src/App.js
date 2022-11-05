import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import Layout from './layout/Layout';
import Prescripciones from  './components/Prescripciones'
import Stock from './components/Stock';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Outlet />} >
          <Route element={<Layout />}>
            <Route path="/" />
            <Route path="/prescripciones" element={<Prescripciones />} />
            <Route path="/stock" element={<Stock />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
