import { Route, BrowserRouter, Routes } from "react-router-dom";
import {Cart, Home, Shop} from './pages'
import Header from './common/Header';
import Footer from './common/Footer';
import './App.css';
import './css/style.css'
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import AboutPage from "./pages/About";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div>
     
    <BrowserRouter>
    
    <Header/>
      <Routes>

       <Route path='/' element={<Home/>} />
       <Route path='/shop' element={<Shop/>} />
       <Route path='/contact' element={<ContactPage/>} />
       <Route path='/about' element={<AboutPage/>}/>
       <Route path='/cart' element={<Cart/>} />

       <Route path="/*" element={<NotFoundPage />} />
       
      </Routes>
      <Footer />
      </BrowserRouter>
      

    </div>
  );
}

export default App;