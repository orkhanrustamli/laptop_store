import React from 'react'
import { useQuery } from '@apollo/client'
import Laptop, { LaptopI } from './Laptop'
import classes from './style.module.scss'
import { GET_LAPTOPS } from '../../queries'

export default function Content() {
  const { data } = useQuery<{ laptops: LaptopI[] }>(GET_LAPTOPS)

  return (
    <div className={classes.laptopsContainer}>
      <div className={classes.laptops}>
        {data?.laptops.map((l) => (
          <Laptop key={l.id} laptop={l} />
        ))}
      </div>
    </div>
  )
}
