import { useSubscription, useApolloClient } from "@apollo/react-hooks";
import { USER_LEAVED_SUBSCRIPTION } from "../../../apollo/subscriptions/users-subscriptions";
import { CURRENT_USER_QUERY } from "../../../apollo/queries/user-queries";
import { notifyError } from "../../other/Snackbar/Snackbar";

const useUserLeavedSubscription = () => {
	const client = useApolloClient();
	useSubscription(USER_LEAVED_SUBSCRIPTION, {
		onSubscriptionData: () => {
			client.cache.reset();
			notifyError(
				"Your password has been changed in other page, please relogin."
			);
			try {
				client.writeQuery({
					query: CURRENT_USER_QUERY,
					data: { currentUser: null },
				});
			} catch (e) {}
		},
	});
};

export default useUserLeavedSubscription;
