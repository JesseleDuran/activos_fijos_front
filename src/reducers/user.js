import * as constants from "../constants/actions";

const ROLES_KEY = "https://integrations-team/app_metadata";

const defaultRolesObject = {
	user: true,
  	admin: false,
};

export default (state = {}, action) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
    	const { user } = action.payload;
		return {
			...state,
			...user,
			roles: parseRoles(user[ROLES_KEY] || {}),
		};
    default:
    	return state;
  }
};

const parseRoles = ({ roles = [] }) =>
  roles.reduce((p, v) => ({ ...p, [v]: true }), defaultRolesObject);
