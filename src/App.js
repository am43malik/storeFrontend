import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Home from "./components/Home"
import Addproduct from './pages/Addproduct';
import { createContext, useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Addmember from './pages/Addmember';
import Stockin from './pages/Stockin';
import Stockout from './pages/Stockout';
import Stockoutpdf from './pages/Stockoutpdf';
import Stock from './pages/Stock';
import StockOutSearch from './pages/StockOutSearch';
import StockInSearch from './pages/StockInSearch';
import Orderdetails from './pages/Orderdetails';
import Discarditem from './pages/Discarditem';
import Geneticstock from './components/stocks/Geneticstock';
import Microbiologystock from './components/stocks/Microbiologystock';
import Parasitology from './components/stocks/Parasitology';
import Generalstock from './components/stocks/Generalstock';
import Centralsection from './components/central section/Centralsection';
import Heamotolgy from './components/central section/Heamotolgy';
import Biochemistry from './components/central section/Biochemistry';
import HPLC from './components/central section/HPLC';
import AAS from './components/central section/AAS';
import Order from './pages/Order';
import Orderpdf from './components/Order/Orderpdf';
import Login from './components/login/Login';
import Departmetnlils from './components/Department list/Departmetnlils';
import Orderdetailspdf from './components/Order/Orderdetailspdf';
import Discardpdf from './pages/Discardpdf';
 export const ThemeContext = createContext();
function App() {


  const [darkMode,setDardMode]= useState(false)

  const toggleDarkMode =()=>{
    setDardMode(prevMode =>!prevMode)
  }
   // Define Material-UI theme
   const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}> 
    <CssBaseline />
     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Addproduct" component={Addproduct} />
          <Route exact path="/Addmember" component={Addmember} />
          <Route exact path="/Stockin" component={Stockin} />
          <Route exact path="/Stockout" component={Stockout} />
          <Route exact path="/Stockoutpdf" component={Stockoutpdf} />
          <Route exact path="/Stock" component={Stock} />
          <Route exact path="/StockOutSearch" component={StockOutSearch} />
          <Route exact path="/StockInSearch" component={StockInSearch} />
          <Route exact path="/Orderdetails" component={Orderdetails} />
          <Route exact path="/Discarditem" component={Discarditem} />
     {/*====================================Stock ================================================================================ */}
          <Route exact path="/Geneticstock" component={Geneticstock} />
          <Route exact path="/Microbiologystock" component={Microbiologystock} />
          <Route exact path="/Parasitology" component={Parasitology} />
          <Route exact path="/Generalstock" component={Generalstock} />
     {/*====================================Central section ================================================================================ */}
     <Route exact path="/Centralsection" component={Centralsection} />
     <Route exact path="/Heamotolgy" component={Heamotolgy} />
     <Route exact path="/Biochemistry" component={Biochemistry} />
     <Route exact path="/HPLC" component={HPLC} />
     <Route exact path="/AAS" component={AAS} />
     {/*====================================Order section ================================================================================ */}
     <Route exact path="/Order" component={Order} />
     <Route exact path="/Orderpdf" component={Orderpdf} />

     {/*====================================login section ================================================================================ */}
     <Route exact path="/" component={Login} />
     {/*====================================Department List section ================================================================================ */}
     <Route exact path="/Departmetnlils" component={Departmetnlils} />
     <Route exact path="/Orderdetailspdf" component={Orderdetailspdf} />
    
     {/*===================================Discard section ================================================================================ */}
     <Route exact path="/Discardpdf" component={Discardpdf} />

        </Switch>
    </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
