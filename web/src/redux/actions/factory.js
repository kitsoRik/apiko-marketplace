export const asyncActionFactory = (
    apiFunc = () => { },
    pendingActions,
    successActions,
    failedActions) => (...args) => async (dispatch, getState) => {
        try {
            if (pendingActions) callForAll(dispatch, Array.isArray(pendingActions) ? pendingActions : [pendingActions], ...args, getState());

            const data = await apiFunc(...args, getState());
            
            if (data.success && successActions) callForAll(dispatch, Array.isArray(successActions) ? successActions : [successActions], data.result, ...args, getState());
            else if (!data.success && failedActions) callForAll(dispatch, Array.isArray(failedActions) ? failedActions : [failedActions], data.error, ...args, getState());

            if (data.success) return data.result;

            return Promise.reject(data.error);
        } catch (e) {
            console.log(e);
        }
    }

export const asyncActionFactoryWithGraphQLQuery = (
    apiFunc = () => { },
    pendingActions,
    successActions,
    failedActions) => (...args) => async (dispatch, getState) => {
        try {
            if (pendingActions) callForAll(dispatch, Array.isArray(pendingActions) ? pendingActions : [pendingActions], ...args, getState());

            const { data, errors } = await apiFunc(...args, getState());

            if (data && successActions) callForAll(dispatch, Array.isArray(successActions) ? successActions : [successActions], data, ...args, getState());
            else if ({ errors } && failedActions) callForAll(dispatch, Array.isArray(failedActions) ? failedActions : [failedActions], errors, ...args, getState());

            if (data) return data;

            return Promise.reject(data.error);
        } catch (e) {
            console.log(e);
        }
    }

const callForAll = (dispatch, funcs = [], ...args) => {
    funcs.forEach(f => dispatch(f instanceof Function ? f(...args) : f));
}