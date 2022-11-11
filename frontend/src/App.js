import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from "./components/Login";
import Layout from './layout/Layout';
import useAuth from "./hooks/useAuth";
//import Prescripciones from  './components/Prescripciones'
import Stock from './components/Stock';
import CollapsibleTable2 from './components/Prescripciones_funcionario';
import CollapsibleTable from './components/Prescripciones';


const App = () => {
  const { auth } = useAuth();
  if (auth.tipo==='farmaceutico'){
  return (
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route element={<RequireAuth/>}>
      
        <Route element={<Outlet />} >
          <Route element={<Layout />}>
            <Route path="/" />
            <Route path="/prescripciones" element={<CollapsibleTable2 />} />
            <Route path="/stock" element={<Stock />} />
          </Route>
        </Route>

      </Route>

    </Routes>
  );
}
else{
  return (
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route element={<RequireAuth/>}>
      
        <Route element={<Outlet />} >
          <Route element={<Layout />}>
            <Route path="/" />
            <Route path="/prescripciones" element={<CollapsibleTable />} />
            <Route path="/stock" element={<Stock />} />
          </Route>
        </Route>

      </Route>

    </Routes>
  );
}
};

export default App;
