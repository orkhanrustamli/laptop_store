import { gql } from '@apollo/client'

export const INITIAL_QUERIES = gql`
  query InitialQueries {
    laptops {
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

export const GET_LAPTOPS = gql`
  query GetLaptops {
    laptops {
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
