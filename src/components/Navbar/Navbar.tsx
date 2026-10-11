import { NavLink } from 'react-router-dom'
// import { useCartContext } from '../../context/Cart/useCartContext'
import s from './Navbar.module.scss'

function Navbar() {
  // const { isOpen, setIsOpen } = useCartContext()

  return (
    <nav className={s.navbar}>
      <div className={s.navbar_container}>
        <span>Pulsar</span>
        <ul className={s.navbar_links}>
          {/*
          <li>
            <NavLink to="/" end className={s.navbar_link}>
              Inicio
            </NavLink>
          </li>
          */}
          <li>
            <NavLink to="/products" className={s.navbar_link}>
              Productos
            </NavLink>
          </li>
          {/*
          <li>
            <button
              className={s.navbar_link}
              onClick={() => setIsOpen(!isOpen)}
            >
              Carrito
            </button>
          </li>
          */}
          <li>
            <NavLink to="/login" className={s.navbar_link}>
              Iniciar sesión
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
