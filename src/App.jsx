import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import HomePage from './Pages/HomePage';
import QueuePage from './Pages/QueuePage';
import OrderPage from './Pages/OrderPage';
import BizzNavBar from "./Components/BizzNavBar";
import PrivateRoute from "./Pages/PrivateRoute";
import { useState,useEffect } from "react";

function App() {

  const [storeNum, setStoreNum] = useState("");

  useEffect(() => {
      let storeCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("store="))
          ?.split("=")[1];

          setStoreNum(storeCookie);
  }, []);

  return (

    <div className='def-bg work-area-base'>
        <Router>
          <BizzNavBar store={storeNum}/>
          <Routes>
            <Route exact path='/' element={<HomePage store={storeNum} changeStore={(val) => setStoreNum(val)}/>} />

            <Route 
              exact path="/Queue/:id"
              element={
                <PrivateRoute store={storeNum}>
                  <QueuePage />
                </PrivateRoute>
              }
            />

            <Route 
              exact path="/Queue/:id/:order"
              element={
                <PrivateRoute store={storeNum}>
                  <OrderPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
    </div>
  )
}

export default App
