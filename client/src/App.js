import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Profile from './Pages/Profile';
import ProtectedRoute from './Pages/ProtectedRoute';
import Basket from './Pages/Basket';
import Error404 from './Pages/Error';
import ProtectedAdmin from './Pages/Admin/ProtectedAdmin';
import Orders from './Pages/Admin/Orders';
import AdminHome from './Pages/Admin/Home';
import AdminProducts from './Pages/Admin/Products';
import AdminProductsDetail from './Pages/Admin/ProductDetail';
import NewProduct from './Pages/Admin/Products/new';




function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* üst menü*/}
        <div id="content">
          <Routes>
            <Route path="/" element={<Products />} /> 
            <Route path='product/:product_id' element={<ProductDetail/>} />  {/* product detail */}
            <Route path='/signin' element={<Signin />}/>    {/* login page*/}
            <Route path='/signup' element={<Signup />} />   {/* signup page*/}
            <Route element={<ProtectedRoute />}> 
                <Route path='/profile' element={<Profile />}/>  {/* Profil detay sayfası*/}
            </Route> 


            <Route element={<ProtectedAdmin />}>
                <Route index path="/admin" element={<AdminHome />}/>
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/products" element={<AdminProducts/>} />
                <Route path="/admin/products/:product_id" element={<AdminProductsDetail/>}/>
                <Route path="/admin/products/new" element={<NewProduct />} />
					  </Route>

            

            <Route path='/basket' element={<Basket />}/>  {/*basket page*/}

            <Route path='*' element={<Error404 />} /> {/*error page*/}
            

          </Routes>
        </div>
      </div>
    </Router>
  )
}





export default App;
