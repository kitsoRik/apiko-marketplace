export const checkValidEmail = (email) => 
    /[a-zA-Z\d+]+@[a-zA-Z]+\.[a-zA-Z]{1,5}/.test(email);