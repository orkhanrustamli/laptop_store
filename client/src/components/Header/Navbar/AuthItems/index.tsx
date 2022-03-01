import React from 'react'
import classes from './style.module.scss'

export default function AuthItems() {
  return (
    <React.Fragment>
      <li className={classes.authItems}>Log In</li>
      <li className={classes.authItems}>Sign Up</li>
    </React.Fragment>
  )
}
