export const asyncActionFactory = (
        apiFunc = () => {}, 
        pendingActions, 
        successActions, 
        failedActions) => (...args) => async (dispatch, getState) => {
    try {
        if(pendingActions) callForAll(dispatch, Array.isArray(pendingActions) ? pendingActions : [pendingActions]);

        const data = await apiFunc(...args);

        if(data.success && successActions) callForAll(dispatch, Array.isArray(successActions) ? successActions : [successActions], data.result);
        else if(!data.success && failedActions) callForAll(dispatch, Array.isArray(failedActions) ? failedActions : [failedActions], data.error);

        if(data.success) return data.result;

        return Promise.reject(data.error);
    } catch (e) {
        alert("CATCH");
        console.log(e);
    }
}

const callForAll = (dispatch, funcs = [], ...args) => {
    funcs.forEach(f => dispatch(f instanceof Function ? f(...args) : f));
}