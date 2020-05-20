import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../../../apollo/queries/user-queries";

const useCurrentUser = () => {
	const { data, loading } = useQuery(CURRENT_USER_QUERY);

	return {
		currentUser: data?.currentUser,
		loading,
	};
};

export default useCurrentUser;
