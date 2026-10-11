import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Cart from '../Cart/Cart'
// import Home from '../../pages/Home/Home'
import Products from '../../pages/Products/Products'
import Login from '../../pages/Login/Login'

function App() {
  return (
    <>
      <Navbar />
      <Cart />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
