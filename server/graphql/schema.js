const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLID, GraphQLFloat } = require("graphql");
const { getAllUsers, getUserById, getUserByProductId, saveUserById } = require("../db/models/user");
const { getProductsByIds, getAllProducts } = require("../db/models/product");
const { getFeedbacksByProductId, getFeedbacksByUserId } = require("../db/models/feedback");

const { customError } = require("../helpers/errors");


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        verifyed: { type: GraphQLBoolean },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        saveproducts: { 
                type: new GraphQLList(ProductType),
                args: {
                    page: { type: GraphQLInt },
                    limit: { type: GraphQLInt },
                },
                resolve: ({ savedProducts }, { page, limit }, { user }) => {
                    return getProductsByIds(savedProducts);
                }
            },
        products: { 
            type: new GraphQLList(ProductType),
            args: {
                page: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            resolve: (source, { page, limit }, { user }) => {
                return getProductsByIds([0]);
            }
        },
        feedbacks: {
            type: new GraphQLList(FeedbackType),
            args: {
                page: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            resolve: async ({ id }, { page, limit }) => {
                return await getFeedbacksByUserId(id);
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: "Todo",
    fields: () => ({
        id: { type: GraphQLID },
        owner: { 
            type: UserType,
            resolve: async ({ id }) => {
                return await getUserByProductId(id);
            }
        },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        iconName: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        saved: { type: GraphQLBoolean },
        feedbacks: {
            type: new GraphQLList(FeedbackType),
            resolve: ({ id }) => {
                return getFeedbacksByProductId(id);
            }
        }
    })
});

const FeedbackType = new GraphQLObjectType({
    name: "Feedback",
    fields: () => ({
        id: { type: GraphQLID },
        user: { 
            type: UserType,
            resolve: ({ userId }) => {
                return getUserById(userId);
            }
        },
        product: {
            type: ProductType,
            resolve: (source) => {
                console.log(source);
            }
        },
        rate: { type: GraphQLString },
        text: { type: GraphQLString },
        createdAt: { type: GraphQLString },
    })
});

const Query = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        products: { 
                type: new GraphQLList(ProductType),
                args: {
                    title: { type: GraphQLString },
                    location: { type: GraphQLString },
                    category: { type: GraphQLString },
                    priceFrom: { type: GraphQLFloat },
                    priceTo: { type: GraphQLFloat },
                    page: { type: GraphQLInt },
                    limit: { type: GraphQLInt },
                },
            resolve: (source, { page, limit }, { req, user }, info) => {
                    return getAllProducts(page, limit);
                }
            },
        users: {
            type: new GraphQLList(UserType),
            args: {
                id: { type: GraphQLID },
                page: { type: GraphQLInt },
                limit: { type: GraphQLInt },
            },
            resolve: (source, { page, limit }, { req, user }) => {
                return getAllUsers({ page, limit });
            }
        },
        feedbacks: {
            type: new GraphQLList(FeedbackType),
            args: {
                userId: { type: GraphQLID },
                productId: { type: GraphQLID },
                page: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            resolve: (source, { userId, productId, page, limit }) => {
                return getFeedbacksByProductId(productId, page, limit);
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: (source, { id }, { req, user }) => {
                return getUserById(id);
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        changeSavedStateOfProduct: {
            type: GraphQLBoolean,
            args: { 
                id: {
                    type: GraphQLID
                }, 
                state: {
                    type: GraphQLBoolean
                },
            },
            resolve: (source, { id, state }, { user }) => {
                if(!user) throw "WHAT";
                if(state && user.savedProducts.find(p => p === +id)) throw "WHAT1";

                if(!state && user.savedProducts.indexOf(+id) === -1) throw "WHAT2";
                
                
                if(state) user.savedProducts.push(+id);
                else user.savedProducts = user.savedProducts.filter(p => p !== +id);
                user.save().then(console.log);

                return state;
            }
        },
        saveUser: {
            type: UserType,
            args: {
                fullName: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve: (source, { fullName, phone }, { user }) => {
                if(!user) {
                    throw customError("ACCESS_BLOCKED");
                }
                
                return saveUserById(user.id, fullName, phone);
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})