const socketio = require("socket.io");
const cookie = require("cookie");
const { getSessionBySesid } = require("../db/models/session");
const { getUserById } = require("../db/models/user");

const users = [];

const addUserSocket = (id, socket) => {
	const user = new UserSocket(id, socket);
	users.push(user);
};

exports.connect = (http) => {
	const io = socketio(http);

	io.on("connection", async (socket) => {
		socket.emit("Hello", 228, 1337);

		try {
			const { sesid } = cookie.parse(socket.request.headers.cookie);
			if (!sesid) {
				return socket.disconnect();
			}

			const session = await getSessionBySesid(sesid);

			if (!session) {
				return socket.disconnect();
			}

			const user = await getUserById(session.userId);
			if (!user) return socket.disconnect();
			addUserSocket(user.id, socket);
		} catch (e) {
			socket.disconnect();
		}
	});
};

class UserSocket {
	constructor(id, socket) {
		this.id = id;
		this.socket = socket;
	}

	callNewMessage(chatId, message) {
		this.socket.emit("NEW_MESSAGE", chatId, message);
	}
}

exports.callNewMessage = (userId, chatId, message) => {
	users.filter((u) => u.id === userId).forEach((u) => {
		u.callNewMessage(chatId, message);
	});
};
