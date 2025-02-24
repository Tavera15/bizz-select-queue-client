import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import HomePage from './Pages/HomePage';
import QueuePage from './Pages/QueuePage';
import OrderPage from './Pages/OrderPage';
import BizzNavBar from "./Components/BizzNavBar";
import { useState } from "react";

function App() {
  const [store, setStore] = useState("");

  return (

    <div className='def-bg work-area-base'>
        <Router>
          <BizzNavBar storeNumber={store} />
          <Routes>
            <Route exact path='/' element={<HomePage storeNumber={store} storeChange={(val) => setStore(val)} />} />
            <Route exact path='/Queue/:id' element={<QueuePage />} />
            <Route exact path='/Queue/:id/:order' element={<OrderPage />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
