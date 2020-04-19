const crypto = require("crypto");


exports.hashPassword = async (password) => new Promise((resolve) => {
    const salt = "MY_SWEET_SALT";
    crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, deriveKey) => {
        resolve(deriveKey.toString("hex"));
    });
});

(async () => console.log(await this.hashPassword("123123123")))();