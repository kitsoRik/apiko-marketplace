const { getProductById, getAllProducts, getProductsByIds, createProduct } = require("../db/models/product");
const { getSavedProductsIdsByUserId, getUserById, addProductByUserId, saveUserById, createUser, getUserByEmail, getUserByEmailAndPassword, getProductsIdsByUserId, getUserByProductId, changeCartItemCountByUserId, addProductToCardByUserId } = require("../db/models/user");
const { getLocationById, getLocationsByNamePattern } = require("../db/models/city");
const { storeUploadFile } = require("../helpers/files");
const { hashPassword } = require("../helpers/hash");
const { createSession, removeSession } = require("../db/models/session");
const { createUnverifyedLink } = require("../db/models/unverifyed");
const { customError } = require("../helpers/errors");
const { getMessagesByIds, createMessage } = require("../db/models/message");
const { getChatsByUserId, createChat, getChatById, addMessageIdToChatById } = require("../db/models/chat");
const { AuthenticationError, withFilter, PubSub } = require("apollo-server-express");
const { callNewMessage } = require("../socketio");
const { createFeedback, getFeedbacksByProductId, getFeedbacksByProductIds, getPositiveFeedbacksByProductIds } = require("../db/models/feedback");
const { createPurchase, getPurchasesBySellerId, getPurchasesByShopperId, changePurchaseStatus, getPurchaseById } = require("../db/models/purchase");
const pubsub = new PubSub();

module.exports = {

    Subscription: {

        messageSent: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("MESSAGE_SENT"),
                (payload, variables, context) => {
                    return payload.chatId === variables.chatId;
                }
            ),
            resolve: ({ chatId, message }) => {
                return message;
            }
        },
        chatCreated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("CHAT_CREATED"),
                (payload, variables, context) => {
                    return payload.id === variables.chatId;
                }
            ),
            resolve: ({ chat }) => {
                return chat;
            }
        },
        feedbackAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("FEEDBACK_ADDED"),
                (payload, variables, context) => {
                    return payload.feedback.productId === variables.productId;
                }
            ),
            resolve: ({ feedback }) => {
                return feedback;
            }
        },

        purchaseStatusChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("PURCHASE_STATUS_CHANGED"),
                (payload, variables, context) => {
                    console.log(context);
                    return true;
                }
            ),
            resolve: ({ purchase }) => {
                return purchase
            }
        },

        purchaseCreated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("PURCHASE_CREATED"),
                (payload, variables, context) => {
                    console.log(context);
                    return true;
                }
            ),
            resolve: ({ purchase }) => {
                return purchase;
            }
        }
    },

    User: {

        location: async ({ locationId }) => {
            return await getLocationById(locationId);
        },
        products: async ({ id }, { page = 1, limit = 12 }) => {
            const productsIds = await getProductsIdsByUserId(id);
            const products = await (getProductsByIds(productsIds).skip((page - 1) * limit).limit(limit));
            return products;
        },

        productsCount: async ({ id }) => {
            return (await getProductsIdsByUserId(id)).length;
        },

        feedbacks: async ({ productsIds }, { page, limit }) => {
            return await getFeedbacksByProductIds(productsIds).skip((page - 1) * limit).limit(limit);
        },

        feedbacksCount: async ({ productsIds }) => {
            return await getFeedbacksByProductIds(productsIds).countDocuments();
        },

        positiveFeedbacksCount: async ({ productsIds }) => {
            return await getPositiveFeedbacksByProductIds(productsIds).countDocuments();
        },

        sales: () => {
            return [];
        },

        salesCount: () => {
            return 0;
        },
    },


    Product: {
        owner: ({ ownerId }) => {
            return getUserById(ownerId);
        },
        location: ({ locationId }) => {
            return getLocationById(locationId);
        },
        saved: async ({ id }, args, { user }) => {
            if (!user) return false;
            const userSavedProductsIds = await getSavedProductsIdsByUserId(user.id);
            return userSavedProductsIds.indexOf(id) !== -1;
        },
        feedbacks: async ({ id }, { page, limit }) => {
            return await getFeedbacksByProductId(id).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        },
        feedbacksCount: async ({ id }, { page, limit }) => {
            return await getFeedbacksByProductId(id).countDocuments();
        }
    },

    CartProduct: {
        product: async ({ productId }) => {
            return await getProductById(productId);
        }
    },

    Feedback: {
        user: ({ userId }) => {
            return getUserById(userId)
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

    Purchase: {
        seller: async ({ sellerId }) => {
            return await getUserById(sellerId);
        },
        shopper: async ({ shopperId }) => {
            return await getUserById(shopperId);
        },
        product: async ({ productId }) => {
            return await getProductById(productId);
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
        messages: async ({ messagesIds }, { page = 1, limit = 20 }) => {
            return await getMessagesByIds(messagesIds).sort({ createdAt: 1 }).skip((page - 1) * limit).limit(limit);
        },
        messagesCount: async ({ messagesIds }) => {
            return await getMessagesByIds(messagesIds).countDocuments();
        }
    },

    Message: {
        writter: async ({ writterId }) => {
            return await getUserById(writterId);
        }
    },

    Query: {
        products: async (source, { title = "", category = "any", locationId = "", priceFrom = -1, priceTo = -1, page = 1, limit = 12 }) => {
            return await getAllProducts(title, category, locationId, priceFrom, priceTo).skip((page - 1) * limit).limit(limit);
        },

        product: async (source, { id }) => {
            return await getProductById(id);
        },

        productsCount: async (source, { title = "", category = "any", locationId = "", priceFrom = -1, priceTo = -1, page = 1, limit = 12 }) => {
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
        },


        sellerPurchases: async (source, { page, limit }, { user }) => {
            if (!user) throw new AuthenticationError();

            return await getPurchasesBySellerId(user.id).sort({ index: -1 }).skip((page - 1) * limit).limit(limit);
        },
        sellerPurchasesCount: async (source, args, { user }) => {
            if (!user) throw new AuthenticationError();

            return await getPurchasesBySellerId(user.id).countDocuments();
        },


        shopperPurchases: async (source, { page, limit }, { user }) => {
            if (!user) throw new AuthenticationError();

            return await getPurchasesByShopperId(user.id).sort({ index: -1 }).skip((page - 1) * limit).limit(limit);
        },
        shopperPurchasesCount: async (source, args, { user }) => {
            if (!user) throw new AuthenticationError();

            return await getPurchasesByShopperId(user.id).countDocuments();
        },
        purchase: async (source, { id }) => {
            return await getPurchaseById(id);
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
            if (state && user.savedProducts.indexOf(id) !== -1) return state;

            if (!state && user.savedProducts.indexOf(id) === -1) return state;


            if (state) user.savedProducts.push(id);
            else user.savedProducts = user.savedProducts.filter(p => p !== id);
            user.save();

            return state;
        },

        saveUser: async (source, { fullName, locationId, phone, icon }, { user }) => {
            if (icon) {
                const { fileName } = await storeUploadFile(icon, "icons/users", () => `user_${user.id}_icon_` + Date.now());
                return await saveUserById(user.id, fullName, locationId, phone, fileName);
            } else {
                return await saveUserById(user.id, fullName, locationId, phone);
            }
        },

        addProduct: async (source, { title, description, price, category, locationId, photos }, { user }) => {

            const results = await Promise.all(photos.map((p, index) => storeUploadFile(p, "photos/products", () => `product_photo_${index}_` + Date.now())));
            const product = await createProduct(user.id, title, description, price, category, locationId, results[0] && results[0].fileName, results.map(r => r.fileName));

            addProductByUserId(user.id, product.id);

            return product;
        },

        addFeedback: async (source, { productId, rate, text }, { user }) => {
            if (!user) throw new AuthenticationError();
            const feedback = await createFeedback(productId, user.id, rate, text);
            pubsub.publish("FEEDBACK_ADDED", { feedback });
            return feedback;
        },

        changeCartItemCount: async (source, { productId, count }, { user }) => {
            if (!user) throw new AuthenticationError();

            await changeCartItemCountByUserId(user.id, productId, count);
            return count;
        },

        addProductToCart: async (source, { productId, count }, { user }) => {
            if (!user) throw new AuthenticationError();

            await addProductToCardByUserId(user.id, productId, count);
            return true;
        },

        createChat: async (source, { productId, initialMessage }, { user }) => {
            const seller = await getUserByProductId(productId);

            const message = await createMessage(user.id, initialMessage);
            const chat = await createChat(productId, user.id, seller.id, message.id);

            pubsub.publish("CHAT_CREATED", { chat });

            return chat;
        },


        sendMessage: async (source, { chatId, text }, { user }) => {
            if (!user) throw new AuthenticationError("NOT_AUTHENTICATIONED");

            const message = await createMessage(user.id, text);
            const chat = await addMessageIdToChatById(chatId, message.id);

            pubsub.publish("MESSAGE_SENT", { chatId, message });

            return message;
        },

        purchase: async (source, { purchases }, { user }) => {
            if (!user) throw new AuthenticationError();
            if (purchases.length === 0) throw new Error("NULL");

            for (let i = 0; i < purchases.length; i++) {
                const item = purchases[i];
                const seller = await getUserByProductId(item.productId)
                const purchase = await createPurchase(seller.id, user.id, item.productId);
                pubsub.publish("PURCHASE_CREATED", { purchase });
            }

            return true;
        },

        changePurchaseStatus: async (source, { purchaseId, status }) => {
            const purchase = await changePurchaseStatus(purchaseId, status);
            pubsub.publish("PURCHASE_STATUS_CHANGED", { purchase })
            return purchase;
        }
    }
}