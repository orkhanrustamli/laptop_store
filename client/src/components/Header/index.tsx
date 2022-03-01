import { Link } from 'react-router-dom'
import classes from './style.module.scss'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">laptops</Link>
      </div>
      <Navbar />
    </header>
  )
}
