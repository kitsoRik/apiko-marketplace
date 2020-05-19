import { NOT_LOGINED } from "../../constants/login";
import { SET_REGISTER_STATUS, SET_LOGIN_STATUS } from "../actions/user-actions";
import { NOT_REGISTERED } from "../../constants/register";

const initState = {
	loginStatus: NOT_LOGINED,
	registerStatus: NOT_REGISTERED,
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_REGISTER_STATUS: {
			return {
				...state,
				registerStatus: action.payload.registerStatus,
			};
		}

		case SET_LOGIN_STATUS: {
			return {
				...state,
				registerStatus: action.payload.loginStatus,
			};
		}

		default:
			return state;
	}
};

export default userReducer;
