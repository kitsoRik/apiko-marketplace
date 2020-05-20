const {
	getProductById,
	getAllProducts,
	getProductsByIds,
	createProduct,
} = require("../db/models/product");
const {
	getSavedProductsIdsByUserId,
	getUserById,
	addProductByUserId,
	saveUserById,
	createUser,
	getUserByEmail,
	getUserByEmailAndPassword,
	getProductsIdsByUserId,
	getUserByProductId,
	changeCartItemCountByUserId,
	addProductToCardByUserId,
	clearCartByUserId,
} = require("../db/models/user");
const {
	getLocationById,
	getLocationsByNamePattern,
} = require("../db/models/city");
const { storeUploadFile } = require("../helpers/files");
const { hashPassword } = require("../helpers/hash");
const {
	createSession,
	removeSession,
	removeSessionsByUserId,
} = require("../db/models/session");
const { createUnverifyedLink } = require("../db/models/unverifyed");
const { customError } = require("../helpers/errors");
const { getMessagesByIds, createMessage } = require("../db/models/message");
const {
	getChatsByUserId,
	createChat,
	getChatById,
	addMessageIdToChatById,
	getChatByMessageId,
} = require("../db/models/chat");
const {
	AuthenticationError,
	withFilter,
	PubSub,
} = require("apollo-server-express");
const { callNewMessage } = require("../socketio");
const {
	createFeedback,
	getFeedbacksByProductId,
	getFeedbacksByProductIds,
	getPositiveFeedbacksByProductIds,
} = require("../db/models/feedback");
const {
	createPurchase,
	getPurchasesBySellerId,
	getPurchasesByShopperId,
	changePurchaseStatus,
	getPurchaseById,
	getClosedPurchasesBySellerId,
} = require("../db/models/purchase");
const {
	createPasswordRestoreByUserId,
	getPasswordRestoreByLink,
	removePasswordRestoreKeyByUserId,
} = require("../db/models/restore");
const pubsub = new PubSub();

module.exports = {
	Subscription: {
		messageSentAny: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("MESSAGE_SENT_ANY"),
				async ({ chatId }, variables, { user }) => {
					if (!user) throw new AuthenticationError();
					const chat = await getChatById(chatId);
					if (!chat) return new Error("Unknown error");
					return (
						chat.sellerId === user.id ||
						chat.shopperId === user.id
					);
				}
			),
			resolve: ({ message }) => {
				return message;
			},
		},

		messageSent: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("MESSAGE_SENT"),
				async ({ chatId }, variables, { user }) => {
					if (!user) throw new AuthenticationError();
					const chat = await getChatById(chatId);
					if (!chat) return new Error("Unknown error");
					return (
						chatId === variables.chatId &&
						(chat.sellerId === user.id ||
							chat.shopperId === user.id)
					);
				}
			),
			resolve: ({ message }) => {
				return message;
			},
		},
		chatCreated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("CHAT_CREATED"),
				(payload, variables, context) => {
					console.log(payload, variables);
					return payload.id === variables.chatId;
				}
			),
			resolve: ({ chat }) => {
				return chat;
			},
		},
		feedbackAdded: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("FEEDBACK_ADDED"),
				(payload, variables, context) => {
					return (
						payload.feedback.productId === variables.productId
					);
				}
			),
			resolve: ({ feedback }) => {
				return feedback;
			},
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
				return purchase;
			},
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
			},
		},

		userLeaved: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("USER_LEAVED"),
				({ userId }, variables, { user }) => {
					if (!user) return false;

					return user.id === userId;
				}
			),
			resolve: () => {
				return true;
			},
		},
	},

	User: {
		location: async ({ locationId }) => {
			return await getLocationById(locationId);
		},
		products: async ({ id }, { page = 1, limit = 12 }) => {
			const productsIds = await getProductsIdsByUserId(id);
			const products = await getProductsByIds(productsIds)
				.skip((page - 1) * limit)
				.limit(limit);
			return products;
		},

		productsCount: async ({ id }) => {
			return (await getProductsIdsByUserId(id)).length;
		},

		feedbacks: async ({ productsIds }, { page, limit }) => {
			return await getFeedbacksByProductIds(productsIds)
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit);
		},

		feedbacksCount: async ({ productsIds }) => {
			return await getFeedbacksByProductIds(
				productsIds
			).countDocuments();
		},

		positiveFeedbacksCount: async ({ productsIds }) => {
			return await getPositiveFeedbacksByProductIds(
				productsIds
			).countDocuments();
		},

		sales: () => {
			return [];
		},

		salesCount: async ({ id }) => {
			return await getClosedPurchasesBySellerId(id).countDocuments();
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
			const userSavedProductsIds = await getSavedProductsIdsByUserId(
				user.id
			);
			return userSavedProductsIds.indexOf(id) !== -1;
		},
		feedbacks: async ({ id }, { page, limit }) => {
			return await getFeedbacksByProductId(id)
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit);
		},
		feedbacksCount: async ({ id }, { page, limit }) => {
			return await getFeedbacksByProductId(id).countDocuments();
		},
	},

	CartProduct: {
		product: async ({ productId }) => {
			return await getProductById(productId);
		},
	},

	Feedback: {
		user: ({ userId }) => {
			return getUserById(userId);
		},
		product: () => {
			return getProductById(6);
		},
	},

	Sale: {
		user: () => {
			return getUserById(0);
		},
		product: () => {
			return getProductById(0);
		},
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
		},
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
			return await getMessagesByIds(messagesIds)
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit);
		},
		messagesCount: async ({ messagesIds }) => {
			return await getMessagesByIds(messagesIds).countDocuments();
		},
	},

	Message: {
		writter: async ({ writterId }) => {
			return await getUserById(writterId);
		},
		chat: async ({ id }) => {
			return await getChatByMessageId(id);
		},
	},

	Query: {
		products: async (
			source,
			{
				title = "",
				category = "any",
				sortField = "title",
				sortOrder = "ASC",
				locationId = "-1",
				priceFrom = -1,
				priceTo = -1,
				page = 1,
				limit = 12,
			}
		) => {
			return await getAllProducts(
				title,
				category,
				locationId,
				priceFrom,
				priceTo
			)
				.sort({ [sortField]: sortOrder === "ASC" ? 1 : -1 })
				.skip((page - 1) * limit)
				.limit(limit);
		},

		product: async (source, { id }) => {
			return await getProductById(id);
		},

		productsCount: async (
			source,
			{
				title = "",
				category = "any",
				locationId = "",
				priceFrom = -1,
				priceTo = -1,
				page = 1,
				limit = 12,
			}
		) => {
			return await getAllProducts(
				title,
				category,
				locationId,
				priceFrom,
				priceTo
			).countDocuments();
		},

		savedProducts: async (source, args, { user }) => {
			if (!user) return [];
			return await getProductsByIds(
				await getSavedProductsIdsByUserId(user.id)
			);
		},

		savedProductsCount: async (source, args, { user }) => {
			if (!user) return 0;
			return await getProductsByIds(
				await getSavedProductsIdsByUserId(user.id)
			).countDocuments();
		},

		currentUser: async (source, args, { user }) => {
			if (!user) return null;
			return await getUserById(user.id);
		},

		locations: async (source, { name }) => {
			return getLocationsByNamePattern(name);
		},

		user: async (source, { id }) => {
			return await getUserById(id);
		},

		restorePasswordCheckKey: async (source, { key }) => {
			// TODO
			//throw new Error("KEY_IS_INVALID"); // WORK
			return true;
		},

		chats: async (source, { page, title }, { user }) => {
			if (!user) return null;
			let chats = await getChatsByUserId(user.id);

			if (chats.length !== 0)
				await (() =>
					new Promise((resolve) => {
						let index = 0;
						chats.forEach(async (c, i) => {
							const _c = c.toObject();
							chats[i] = _c;
							_c._lastMessage = await getMessagesByIds(
								c.messagesIds[c.messagesIds.length - 1]
							);
							if (++index === chats.length) {
								resolve();
							}
						});
					}))();

			chats = chats.sort((a, b) => {
				return a._lastMessage[0].createdAt <
					b._lastMessage[0].createdAt
					? 1
					: -1;
			});

			return chats;
		},

		chat: async (source, { id }, { user }) => {
			if (!user) return;

			return getChatById(id);
		},

		sellerPurchases: async (
			source,
			{
				page,
				limit,
				viewOpened,
				viewPosted,
				viewCanceled,
				viewClosed,
				sortField,
				sortOrder,
			},
			{ user }
		) => {
			if (!user) throw new AuthenticationError();

			let result = await getPurchasesBySellerId(user.id);
			result.sort((a, b) => {
				if (sortField === "created")
					return a.statuses[0].date.getTime() <
						b.statuses[0].date.getTime()
						? -1
						: 1;
				if (sortField === "changed")
					return a.statuses[
						a.statuses.length - 1
					].date.getTime() <
						b.statuses[b.statuses.length - 1].date.getTime()
						? -1
						: 1;
				if (sortField === "count")
					return a.count < b.count ? -1 : 1;
				if (sortField === "price")
					return a.price < b.price ? -1 : 1;
				if (sortField === "total")
					return a.price * a.count < b.price * b.count ? -1 : 1;

				throw new Error("Unknown sort field");
			});
			if (sortOrder === "DESC") result = result.reverse();
			result = result
				.filter((p) => {
					const status =
						p.statuses[p.statuses.length - 1].status;
					if (viewOpened && status === "OPENED") return true;
					if (viewPosted && status === "POSTED") return true;
					if (viewCanceled && status === "CANCELED") return true;
					if (viewClosed && status === "CLOSED") return true;
					return false;
				})
				.filter((c, i) => i >= (page - 1) * limit)
				.filter((c, i) => i < limit);

			return result;
		},
		sellerPurchasesCount: async (
			source,
			{ viewOpened, viewPosted, viewCanceled, viewClosed },
			{ user }
		) => {
			if (!user) throw new AuthenticationError();

			let result = await getPurchasesBySellerId(user.id);
			result = result.filter((p) => {
				const status = p.statuses[p.statuses.length - 1].status;
				if (viewOpened && status === "OPENED") return true;
				if (viewPosted && status === "POSTED") return true;
				if (viewCanceled && status === "CANCELED") return true;
				if (viewClosed && status === "CLOSED") return true;
				return false;
			});

			return result.length;
		},

		shopperPurchases: async (
			source,
			{
				page,
				limit,
				viewOpened,
				viewPosted,
				viewCanceled,
				viewClosed,
				sortField,
				sortOrder,
			},
			{ user }
		) => {
			if (!user) throw new AuthenticationError();

			let result = await getPurchasesByShopperId(user.id);
			result.sort((a, b) => {
				if (sortField === "created")
					return a.statuses[0].date.getTime() <
						b.statuses[0].date.getTime()
						? -1
						: 1;
				if (sortField === "changed")
					return a.statuses[
						a.statuses.length - 1
					].date.getTime() <
						b.statuses[b.statuses.length - 1].date.getTime()
						? -1
						: 1;
				if (sortField === "count")
					return a.count < b.count ? -1 : 1;
				if (sortField === "price")
					return a.price < b.price ? -1 : 1;
				if (sortField === "total")
					return a.price * a.count < b.price * b.count ? -1 : 1;

				throw new Error("Unknown sort field");
			});
			if (sortOrder === "DESC") result = result.reverse();
			result = result
				.filter((p) => {
					const status =
						p.statuses[p.statuses.length - 1].status;
					if (viewOpened && status === "OPENED") return true;
					if (viewPosted && status === "POSTED") return true;
					if (viewCanceled && status === "CANCELED") return true;
					if (viewClosed && status === "CLOSED") return true;
					return false;
				})
				.filter((c, i) => i >= (page - 1) * limit)
				.filter((c, i) => i < limit);

			return result;
		},
		shopperPurchasesCount: async (
			source,
			{ viewOpened, viewPosted, viewCanceled, viewClosed },
			{ user }
		) => {
			if (!user) throw new AuthenticationError();

			let result = await getPurchasesByShopperId(user.id);
			result = result.filter((p) => {
				const status = p.statuses[p.statuses.length - 1].status;
				if (viewOpened && status === "OPENED") return true;
				if (viewPosted && status === "POSTED") return true;
				if (viewCanceled && status === "CANCELED") return true;
				if (viewClosed && status === "CLOSED") return true;
				return false;
			});

			return result.length;
		},
		purchase: async (source, { id }) => {
			return await getPurchaseById(id);
		},
	},

	Mutation: {
		register: async (source, { fullName, email, password }, { res }) => {
			let user = await getUserByEmail(email);

			if (user) return new Error("EMAIL_IS_BUSY");
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
			const user = await getUserByEmailAndPassword(
				email,
				await hashPassword(password)
			);

			if (!user) throw new Error("UNKNOWN_DATA");

			const { sesid } = await createSession(user.id);

			res.cookie("sesid", sesid);

			return user;
		},

		unlogin: async (source, args, { res, req }) => {
			const { sesid } = req.cookies;

			if (!sesid) throw requiredError("SESID");

			const session = await removeSession(sesid);

			if (!session) throw customError("UNKNOWN_SESID");

			res.clearCookie();

			return true;
		},

		restorePasswordRequest: async (source, { email }) => {
			const user = await getUserByEmail(email);
			if (!user) return "";
			const { link } = await createPasswordRestoreByUserId(user.id);
			return link;
		},
		restorePassword: async (source, { key, password, leaveDevices }) => {
			// TODO
			const restore = await getPasswordRestoreByLink(key);
			if (!restore) return true;
			const user = await getUserById(restore.userId);
			user.password = await hashPassword(password);
			await user.save();

			if (leaveDevices) {
				await removeSessionsByUserId(user.id);
				pubsub.publish("USER_LEAVED", { userId: user.id });
			}
			await removePasswordRestoreKeyByUserId(user.id);

			return true;
		},

		changeSavedStateOfProduct: async (
			source,
			{ id, state },
			{ user }
		) => {
			if (!user) throw "WHAT";
			if (state && user.savedProducts.indexOf(id) !== -1)
				throw "WHAT1";

			if (!state && user.savedProducts.indexOf(id) === -1)
				throw "WHAT2";

			if (state) user.savedProducts.push(id);
			else
				user.savedProducts = user.savedProducts.filter(
					(p) => p !== id
				);
			user.save();

			return await getProductById(id);
		},

		saveUser: async (
			source,
			{ fullName, locationId, phone, icon },
			{ user }
		) => {
			if (icon) {
				const { fileName } = await storeUploadFile(
					icon,
					"icons/users",
					() => `user_${user.id}_icon_` + Date.now()
				);
				return await saveUserById(
					user.id,
					fullName,
					locationId,
					phone,
					fileName
				);
			} else {
				return await saveUserById(
					user.id,
					fullName,
					locationId,
					phone
				);
			}
		},

		addProduct: async (
			source,
			{ title, description, price, category, locationId, photos },
			{ user }
		) => {
			const results = await Promise.all(
				photos.map((p, index) =>
					storeUploadFile(
						p,
						"photos/products",
						() => `product_photo_${index}_` + Date.now()
					)
				)
			);
			const product = await createProduct(
				user.id,
				title,
				description,
				price,
				category,
				locationId,
				results[0] && results[0].fileName,
				results.map((r) => r.fileName)
			);

			addProductByUserId(user.id, product.id);

			return product;
		},

		addFeedback: async (source, { productId, rate, text }, { user }) => {
			if (!user) throw new AuthenticationError();
			const feedback = await createFeedback(
				productId,
				user.id,
				rate,
				text
			);
			pubsub.publish("FEEDBACK_ADDED", { feedback });
			return feedback;
		},

		changeCartItemCount: async (
			source,
			{ productId, count },
			{ user }
		) => {
			if (!user) throw new AuthenticationError();

			await changeCartItemCountByUserId(user.id, productId, count);
			return count;
		},

		addProductToCart: async (source, { productId, count }, { user }) => {
			if (!user) throw new AuthenticationError();

			return await addProductToCardByUserId(user.id, productId, count);
		},

		clearCart: async (source, args, { user }) => {
			if (!user) throw new AuthenticationError();

			return await clearCartByUserId(user.id);
		},

		createChat: async (
			source,
			{ productId, initialMessage },
			{ user }
		) => {
			const seller = await getUserByProductId(productId);

			const message = await createMessage(user.id, initialMessage);
			const chat = await createChat(
				productId,
				user.id,
				seller.id,
				message.id
			);

			pubsub.publish("CHAT_CREATED", { chat });

			return chat;
		},

		sendMessage: async (source, { chatId, text }, { user }) => {
			if (!user) throw new AuthenticationError("NOT_AUTHENTICATIONED");

			const message = await createMessage(user.id, text);
			const chat = await addMessageIdToChatById(chatId, message.id);

			pubsub.publish("MESSAGE_SENT", { chatId, message });
			pubsub.publish("MESSAGE_SENT_ANY", { chatId, message });

			return message;
		},

		purchase: async (source, { purchases }, { user }) => {
			if (!user) throw new AuthenticationError();
			if (purchases.length === 0) throw new Error("NULL");

			for (let i = 0; i < purchases.length; i++) {
				const item = purchases[i];
				const seller = await getUserByProductId(item.productId);
				const product = await getProductById(item.productId);
				const purchase = await createPurchase(
					seller.id,
					user.id,
					item.productId,
					product.price,
					item.count
				);
				pubsub.publish("PURCHASE_CREATED", { purchase });
			}

			return true;
		},

		changePurchaseStatus: async (source, { purchaseId, status }) => {
			const purchase = await changePurchaseStatus(purchaseId, status);
			pubsub.publish("PURCHASE_STATUS_CHANGED", { purchase });
			return purchase;
		},
	},
};
