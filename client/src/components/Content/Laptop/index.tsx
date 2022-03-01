import React from 'react'
import { FiCpu, FiCreditCard, FiArchive, FiHeart, FiDatabase, FiTag } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import classes from './style.module.scss'
import { gql, useQuery } from '@apollo/client'

export interface LaptopI {
  id: string
  brand: string
  model: string
  ram: number
  cpu: number
  storage: number
  price: number
  imageUrl: string
}

export default function Laptop({ laptop }: { laptop: LaptopI }) {
  return (
    <div className={classes.laptop}>
      <div className={classes.laptopImage}>
        <img src={laptop.imageUrl} alt="laptop" />
      </div>
      <div className={classes.laptopDetails}>
        <h3>
          {laptop.brand} {laptop.model}
        </h3>
        <div className={classes.laptopSpecs}>
          <FiDatabase color="#38a3a5" />
          <span>
            Memory (RAM): <span>{laptop.ram}</span>
          </span>
        </div>
        <div className={classes.laptopSpecs}>
          <FiCpu color="#38a3a5" />
          <span>
            Processor (CPU): <span>{laptop.cpu}</span>
          </span>
        </div>
        <div className={classes.laptopSpecs}>
          <FiArchive color="#38a3a5" />
          <span>
            Storage (SSD): <span>{laptop.storage}</span>
          </span>
        </div>
        <div className={classes.laptopSpecs}>
          <FiTag color="#38a3a5" />
          <span>
            Price: <span>{laptop.price}$</span>
          </span>
        </div>
        <div className={classes.laptopRate}>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <div className={classes.laptopActions}>
          <div>
            <FiHeart />
            <span>Save</span>
          </div>
          <div>
            <FiCreditCard />
            <span>Buy</span>
          </div>
        </div>
      </div>
    </div>
  )
}
