import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { FiGrid, FiAperture, FiDatabase, FiCpu, FiArchive, FiTag } from 'react-icons/fi'
import classes from './style.module.scss'

export interface LaptopInput {
  brand: string
  model: string
  cpu: number
  ram: number
  storage: number
  price: number
}

const ADD_LAPTOP = gql`
  mutation AddLaptop($input: CreateLaptopInput!) {
    createLaptop(input: $input) {
      id
      brand
      model
      ram
      cpu
      storage
      price
      imageUrl
    }
  }
`

export default function AddLaptop() {
  const [input, setInput] = useState<LaptopInput>({
    brand: '',
    model: '',
    cpu: 0,
    ram: 0,
    storage: 0,
    price: 0
  })

  const [addLaptop, { data }] = useMutation(ADD_LAPTOP, {
    variables: { input },
    update(cache, { data: { createLaptop } }) {
      cache.modify({
        fields: {
          laptops(existingLaptops = []) {
            const newLaptopRef = cache.writeFragment({
              data: createLaptop,
              fragment: gql`
                fragment NewLaptop on Laptop {
                  id
                  brand
                  model
                  ram
                  cpu
                  storage
                  price
                  imageUrl
                }
              `
            })

            return existingLaptops.concat(newLaptopRef)
          }
        }
      })
    }
  })

  const onInput = (value: string, type: keyof LaptopInput) => {
    let v: string | number = value
    if (type === 'cpu' || type === 'ram' || type === 'storage' || type === 'price') {
      v = +value
    }

    setInput({ ...input, [type]: v })
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.addLaptopFormContainer}>
        <h3 className={classes.addLaptopHeading}>Add Laptop</h3>
        <form
          className={classes.addLaptopForm}
          onSubmit={(e) => {
            e.preventDefault()
            addLaptop()
          }}
        >
          <div className={classes.addLaptopInputRow}>
            <div className={classes.addLaptopInputGroup}>
              <input
                type="text"
                placeholder="Brand"
                required
                onChange={(e) => onInput(e.target.value, 'brand')}
              />
              <span>
                <FiGrid />
              </span>
            </div>
            <div className={classes.addLaptopInputGroup}>
              <input
                type="text"
                placeholder="Model"
                required
                onChange={(e) => onInput(e.target.value, 'model')}
              />
              <span>
                <FiAperture />
              </span>
            </div>
          </div>
          <div className={classes.addLaptopInputRow}>
            <div className={classes.addLaptopInputGroup}>
              <input
                type="number"
                placeholder="RAM"
                required
                min="4"
                max="128"
                onChange={(e) => onInput(e.target.value, 'ram')}
              />
              <span>
                <FiDatabase />
              </span>
            </div>
            <div className={classes.addLaptopInputGroup}>
              <input
                type="number"
                placeholder="CPU"
                required
                min="4"
                max="16"
                onChange={(e) => onInput(e.target.value, 'cpu')}
              />
              <span>
                <FiCpu />
              </span>
            </div>
          </div>
          <div className={classes.addLaptopInputRow}>
            <div className={classes.addLaptopInputGroup}>
              <input
                type="number"
                placeholder="Storage"
                required
                min="128"
                max="1024"
                onChange={(e) => onInput(e.target.value, 'storage')}
              />
              <span>
                <FiArchive />
              </span>
            </div>
            <div className={classes.addLaptopInputGroup}>
              <input
                type="number"
                placeholder="Price"
                required
                min="200"
                max="4000"
                onChange={(e) => onInput(e.target.value, 'price')}
              />
              <span>
                <FiTag />
              </span>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
