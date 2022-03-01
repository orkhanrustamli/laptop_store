import React from 'react'
import { Link } from 'react-router-dom'
import { FaLaptopMedical } from 'react-icons/fa'
import classes from './style.module.scss'

import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/micah'

let svg = createAvatar(style, {
  seed: Date.now().toString(),
  dataUri: true,
  backgroundColor: 'white'
})

export default function UserItems() {
  return (
    <React.Fragment>
      <li className={classes.userItems}>
        <Link to="/add-laptop">Add Laptop</Link>
      </li>
      <li className={classes.userItems}>My Laptops</li>
      <li className={`${classes.userItems} ${classes.profileItem}`}>
        <img className={classes.avatar} src={svg} alt="avatar" />
        <div className={classes.profileSubmenu}>
          <span>Signed in as</span>
          <span>Orkhan Rustamli</span>
          <ul>
            <li>Change Password</li>
            <li>Update Bio</li>
            <li>Friends</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </div>
      </li>
    </React.Fragment>
  )
}
