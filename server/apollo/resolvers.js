const { getProductById, getAllProducts, getProductsByIds, createProduct } = require("../db/models/product");
const { getSavedProductsIdsByUserId, getUserById, addProductByUserId, saveUserById, createUser, getUserByEmail, getUserByEmailAndPassword, getProductsIdsByUserId, getUserByProductId } = require("../db/models/user");
const { getLocationById, getLocationsByNamePattern } = require("../db/models/city");
const { storeUploadFile } = require("../helpers/files");
const { hashPassword } = require("../helpers/hash");
const { createSession, removeSession } = require("../db/models/session");
const { createUnverifyedLink } = require("../db/models/unverifyed");
const { customError } = require("../helpers/errors");
const { getMessagesByIds, createMessage } = require("../db/models/message");
const { getChatsByUserId, createChat, getChatById, addMessageIdToChatById } = require("../db/models/chat");
const { AuthenticationError } = require("apollo-server");
const { callNewMessage } = require("../socketio");

module.exports = {

    User: {

        products: async ({ id }, { page, limit }) => {
            const productsIds = await getProductsIdsByUserId(id);
            const products = await (getProductsByIds(productsIds).skip((page - 1) * limit).limit(limit));
            return products;
        },

        productsCount: async ({ id }) => {
            return (await getProductsIdsByUserId(id)).length;
        },

        feedbacks: () => {
            return [];
        },

        feedbacksCount: () => {
            return 0;
        },

        sales: () => {
            return [];
        },

        salesCount: () => {
            return 0;
        }
    },


    Product: {
        owner: ({ ownerId }) => {
            console.log(ownerId)
            return getUserById(ownerId);
        },
        location: () => {
            return getLocationById(0);
        },
        saved: async ({ id }, args, { user }) => {
            if (!user) return false;
            const userSavedProductsIds = await getSavedProductsIdsByUserId(user.id);
            return userSavedProductsIds.indexOf(id) !== -1;
        },
        feedbacks: () => {
            return [];
        }
    },

    Feedback: {
        user: () => {
            return getUserById(0)
        },
        product: () => {
            return getProductById(6)
        }
    },

    Sale: {
        user: () => {
            return getUserById(0);
        },
        product: () => {
            return getProductById(0);
        }
    },

    Chat: {
        product: async ({ productId }) => {
            return await getProductById(productId);
        },
        shopper: async ({ shopperId }) => {
            return await getUserById(shopperId);
        },
        seller: async ({ sellerId }) => {
            return await getUserById(sellerId);
        },
        messages: async ({ messagesIds }) => {
            return await getMessagesByIds(messagesIds);
        }
    },

    Message: {
        owner: async ({ ownerId }) => {
            return await getUserById(ownerId);
        }
    },

    Query: {
        products: async (source, { title = "", category = "any", locationId = "-1", priceFrom = -1, priceTo = -1, page = 1, limit = 12 }) => {
            return await getAllProducts(title, category, locationId, priceFrom, priceTo).skip((page - 1) * limit).limit(limit);
        },

        product: async (source, { id }) => {
            return await getProductById(id);
        },

        productsCount: async (source, { title = "", category = "any", locationId = "1", priceFrom = -1, priceTo = -1, page = 1, limit = 12 }) => {
            return await getAllProducts(title, category, locationId, priceFrom, priceTo).countDocuments()
        },

        savedProducts: async (source, args, { user }) => {
            if (!user) return [];
            return await getProductsByIds(await getSavedProductsIdsByUserId(user.id));
        },

        savedProductsCount: async (source, args, { user }) => {
            if (!user) return 0;
            return await getProductsByIds(await getSavedProductsIdsByUserId(user.id)).countDocuments();
        },

        currentUser: async (source, args, { user }) => {
            if (!user) return null;
            return await getUserById(user.id);
        },

        locations: async (source, { name }) => {
            return getLocationsByNamePattern(name);
        },





        restorePasswordCheckKey: async (source, { key }) => { // TODO
            //throw new Error("KEY_IS_INVALID"); // WORK
            return true;
        },


        chats: async (source, { page, title }, { user }) => {
            if (!user) return null;

            return await getChatsByUserId(user.id);
        },

        chat: async (source, { id }, { user }) => {
            if (!user) return;

            return getChatById(id);
        }
    },

    Mutation: {
        register: async (source, { fullName, email, password }, { res }) => {
            // if (!email) throw requiredError("EMAIL");
            // if (!fullName) throw (requiredError("FULL_NAME"));
            // if (!password) throw (requiredError("PASSWORD"));

            // if (typeof email !== 'string') throw (typeError("EMAIL", "STRING"));
            // if (typeof fullName !== 'string') throw (typeError("FULL_NAME", "STRING"));
            // if (typeof password !== 'string') throw (typeError("PASSWORD", "STRING"));

            let user = await getUserByEmail(email);

            if (user) throw (customError("EMAIL_IS_BUSY"));
            user = await createUser(
                fullName,
                email,
                await hashPassword(password)
            );

            await createUnverifyedLink(user.id);

            const { sesid } = await createSession(user.id);

            res.cookie("sesid", sesid);

            return user;
        },

        login: async (source, { email, password }, { res }) => {
            const user = await getUserByEmailAndPassword(email, await hashPassword(password));

            if (!user) throw (customError("UNKNOWN_DATA"));

            const { sesid } = await createSession(user.id);

            res.cookie("sesid", sesid);

            return user;
        },

        unlogin: async (source, args, { res, req }) => {
            const { sesid } = req.cookies;

            if (!sesid) throw (requiredError("SESID"));

            const session = await removeSession(sesid);

            if (!session) throw (customError("UNKNOWN_SESID"))

            res.clearCookie();

            return true;
        },

        restorePasswordRequest: async (source, { email }) => { // TODO
            return true;
        },
        restorePassword: async (source, { key }) => { // TODO
            return true;
        },

        changeSavedStateOfProduct: async (source, { id, state }, { user }) => {
            if (!user) throw "WHAT";
            if (state && user.savedProducts.indexOf(+id) !== -1) return state;

            if (!state && user.savedProducts.indexOf(+id) === -1) return state;


            if (state) user.savedProducts.push(+id);
            else user.savedProducts = user.savedProducts.filter(p => p !== +id);
            user.save();

            return state;
        },

        saveUser: async (source, { fullName, phone, icon }, { user }) => {
            if (icon) {
                const { fileName } = await storeUploadFile(icon, "icons/users", () => `user_${user.id}_icon_` + Date.now());
                return await saveUserById(user.id, fullName, phone, fileName);
            } else {
                return await saveUserById(user.id, fullName, phone);
            }
        },

        addProduct: async (source, { title, description, price, category, locationId, photos }, { user }) => {

            const results = await Promise.all(photos.map((p, index) => storeUploadFile(p, "photos/products", () => `product_photo_${index}_` + Date.now())));

            const product = await createProduct(user.id, title, description, price, category, locationId, results[0] && results[0].fileName, results.map(r => r.fileName));

            addProductByUserId(user.id, product.id);

            return product;
        },


        createChat: async (source, { productId, initialMessage }, { user }) => {
            const seller = await getUserByProductId(productId);

            const message = await createMessage(user.id, initialMessage);
            const chat = await createChat(productId, user.id, seller.id, message.id);

            return chat;
        },


        sendMessage: async (source, { chatId, text }, { user }) => {
            if (!user) throw new AuthenticationError("NOT_AUTHENTICATIONED");

            const message = await createMessage(user.id, text);
            const chat = await addMessageIdToChatById(chatId, message.id);

            const receiverId = chat.sellerId === user.id ? chat.shopperId : chat.sellerId;

            callNewMessage(receiverId, `${chat.id}`, {
                id: `${message.id}`,
                createdAt: message.createdAt,
                owner: {
                    id: `${user.id}`
                },
                text,
                __typename: "Message"
            });

            return message;
        }
    }
}