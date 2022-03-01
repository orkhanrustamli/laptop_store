import { gql } from "apollo-server-core";

const typeDefs = gql`
    type Query {
        users: [User!]!
        user(email: String!): User
        laptops: [Laptop!]!
        laptop(id: String!): Laptop
    }

    type Mutation {
        register(input: LoginRegisterInput!): ResponseSuccess!
        login(input: LoginRegisterInput): ResponseSuccess!
        logout: ResponseSuccess!
        createLaptop(input: CreateLaptopInput!): Laptop!
        deleteLaptop(id: String!): ResponseSuccess!
        rateLaptop(input: RateLaptopInput): ResponseSuccess!
    }

    type User {
        id: ID!
        email: String!
        role: Role!
        createdAt: String!
    }

    type Laptop {
        id: ID!
        brand: String!
        model: String!
        ram: Int!
        cpu: Int!
        storage: Int!
        price: Float!
        createdBy: User!
        ratings: LaptopRatings!
        imageUrl: String!
        createdAt: String!
    }

    type LaptopRatings {
        count: Int!
        avg: Float!
        ratings: [Rating!]!
    }

    type Rating {
        id: ID!
        laptopId: String!
        userId: String!
        rating: Int!
        createdAt: String!
    }

    type ResponseSuccess {
        success: String!
    }

    # Inputs
    input LoginRegisterInput {
        email: String! @constraint(format: "email")
        password: String! @constraint(minLength: 5)
    }

    input CreateLaptopInput {
        brand: String!
        model: String!
        ram: Int!
        cpu: Int!
        storage: Int!
        price: Float!
    }

    input RateLaptopInput {
        laptopId: String!
        rating: Int! @constraint(min: 1, max: 5)
    }

    # Enums
    enum Role {
        admin
        user
    }
`;

export default typeDefs;
