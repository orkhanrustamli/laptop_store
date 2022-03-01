import AuthItems from './AuthItems'
import UserItems from './UserItems'
import classes from './style.module.scss'

const IS_AUTH = true

export default function Navbar() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>{IS_AUTH ? <UserItems /> : <AuthItems />}</ul>
    </nav>
  )
}
