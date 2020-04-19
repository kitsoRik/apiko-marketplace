const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLID, GraphQLFloat } = require("graphql");

let products = [
    {
        id: 0,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 1,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 2,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 3,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 4,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 5,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 6,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 7,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 8,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 9,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 10,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 11,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 12,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    },
    {
        id: 13,
        ownerId: 0,
        title: "Item name 1",
        description: "Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description Long description ",
        price: 579.09,
        iconName: "123.png",
        createdAt: 0,
        updatedAt: 0
    }
]

const ProductType = new GraphQLObjectType({
    name: "Todo",
    fields: () => ({
        id: { type: GraphQLID },
        ownerId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        iconName: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt },
        saved: { type: GraphQLBoolean }
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
            resolve: (source, { limit }, { req, user }, info) => {
                    console.log(products.map(p => ({ ...p, saved: user ? user.savedProducts.indexOf(p.id) !== -1 : false })));
                    return products.map(p => ({ ...p, saved: user ? user.savedProducts.indexOf(p.id) !== -1 : false })).filter((p, i) => i < limit);
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
                console.log(user);
                user.save().then(console.log);

                return state;
            }
        }
    })
})

// let todos = [
//     {
//         id: 0,
//         creatorId: 0,
//         title: "Learn GraphQL",
//         completed: false,
//         steps: []
//     },
//     {
//         id: 1,
//         creatorId: 0,
//         title: "Learn Angular",
//         completed: true,
//         steps: [
//             {
//                 title: "Learn basic info",
//                 completed: true
//             },
//             {
//                 title: "Learn ngrx",
//                 completed: true
//             }
//         ]
//     },
//     {
//         id: 2,
//         creatorId: 2,
//         title: "Learn RxJS",
//         completed: false,
//         steps: [
//             {
//                 title: "Learn Observable",
//                 completed: true
//             },
//             {
//                 title: "Learn Subject",
//                 completed: false
//             }
//         ]
//     }
// ]

// let creators = [
//     { id: 0, name: "Rostik", age: 19 },
//     { id: 1, name: "FuruteRostik", age: 20 },
//     { id: 2, name: "FFRostik", age: 21 }
// ]

// const TodoType = new GraphQLObjectType({
//     name: "Todo",
//     fields: () => ({
//         id: { type: GraphQLInt },
//         creatorId: { type: GraphQLID },
//         title: { type: GraphQLString },
//         completed: { type: GraphQLBoolean },
//         //steps: { type: GraphQLList }
//         creator: {
//             type: CreatorType,
//             resolve: ({ creatorId }) => {
//                 return creators.find(c => c.id === creatorId);
//             }
//         }
//     })
// });

// const CreatorType = new GraphQLObjectType({
//     name: "Creator",
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },

//         todos: {
//             type: new GraphQLList(TodoType),
//             resolve: (source, args, context, info) => {
//                 console.log(info.fieldNodes);
//                 return todos.filter(t => t.creatorId === source.id);
//             }
//         }
//     })
// }) 

// const Query = new GraphQLObjectType({
//     name: "Query",
//     fields: {
//         todo: {
//             type: TodoType,
//             args: { id: { type: GraphQLID }},
//             resolve(source, { id }) {
//                 return todos.find(t => t.id === +id)
//             }
//         },
//         creator: {
//             type: CreatorType,
//             args: { id: { type: GraphQLID }},
//             resolve: (source, { id }) => {
//                 return creators.find(c => c.id == id);
//             }
//         },
//         todos: {
//             type: new GraphQLList(TodoType),
//             resolve: () => {
//                 return todos;
//             }
//         }
//     }
// });

// const Mutatuion = new GraphQLObjectType({
//     name: "Mutation",
//     fields: () => ({
//         addTodo: {
//             type: TodoType,
//             args: { 
//                 title: { type: GraphQLString },
//                 completed: { type: GraphQLBoolean },
//                 creatorId: { type: GraphQLID }
//             },
//             resolve: (source, { creatorId, title, completed }) => {
//                 console.log(creatorId);
//                 const todo = {
//                     id: todos.length,
//                     creatorId: +creatorId,
//                     title,
//                     completed
//                 }

//                 todos.push(todo);

//                 return todo;
//             }
//         }
//     })
// })

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})