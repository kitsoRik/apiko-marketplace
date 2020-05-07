const { gql } = require("apollo-server");

module.exports = gql`

scalar Upload

type User {
    id: ID!
    verifyed: Boolean!
    fullName: String!
    email: String!
    iconName: String

    products(page: Int, limit: Int): [Product!]
    productsCount: Int!

    feedbacks(page: Int, limit: Int): [Feedback!]
    feedbacksCount: Int!

    sales(page: Int, limit: Int): [Sale!]
    salesCount(page: Int, limit: Int): Int!


}

    type Product {
        id: ID!
        owner: User!
        title: String!
        description: String!
        price: Float!
        category: String!
        imageName: String

        location: Location!

        saved: Boolean!
        feedbacks: [Feedback!]
    }

    type Feedback {
        id: ID!
        rate: Float!
        text: String!

        createdAt: String

        user: User!
        product: Product!
    }

    type Sale {
        id: ID!
        date: String!

        user: User!
        product: Product!
    }

    type Location {
        id: ID!
        name: String!
        longitude: Float!
        latitude: Float!
    }

    type Chat {
        id: ID!
        product: Product!
        shopper: User!
        seller: User!
        messages(page: Int, limit: Int): [Message!]!
    }

    type Message {
        id: ID!
        owner: User!
        text: String!
        createdAt: String!
    }

    type Query {
        products(title: String, 
            location: String, 
            locationId: ID, 
            category: String, 
            priceFrom: Float,
            priceTo: Float, 
            page: Int, 
            limit: Int): [Product]

            product(id: ID!): Product

            productsCount(title: String, 
                location: String, 
                locationId: ID, 
                category: String, 
                priceFrom: Float,
                priceTo: Float, 
                page: Int, 
                limit: Int): Int!

                savedProducts(page: Int, limit: Int): [Product!]
                savedProductsCount(page: Int, limit: Int): Int

            currentUser: User
            locations(name: String!, limit: Int!): [Location!]
            restorePasswordCheckKey(key: String!): Boolean

            chats(page: Int, limit: Int): [Chat!]
            chat(id: ID!): Chat
    }

    type Mutation {
        register(fullName: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        unlogin: Boolean

        restorePasswordRequest(email: String!): Boolean
        restorePassword(key: String!, password: String!): Boolean

        changeSavedStateOfProduct(id: ID!, state: Boolean!): Boolean,
        saveUser(fullName: String!, phone: String!, icon: Upload): User


        addProduct (title: String!, locationId: ID!, description: String!, price: Float!, category: String! photos: [Upload!]): Product



        createChat(productId: ID!, initialMessage: String!): Chat!
        sendMessage(chatId: ID!, text: String!): Message!
    }

`