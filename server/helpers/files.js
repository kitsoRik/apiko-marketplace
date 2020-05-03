const path = require("path");
const { createWriteStream, unlink } = require('fs');

exports.saveUserIcon = (file) => {
    console.log(file);
}

exports.storeUploadFile = async (file, pathFromStatic, fnToNameFile) => {
    const { createReadStream, filename, mimetype } = await file.promise;
    const stream = createReadStream();

    const fileName = fnToNameFile(filename);
    const filePath = path.join("./static/", pathFromStatic, fileName);

    const fileData = { fileName, mimetype, filePath };

    await new Promise((resolve, reject) => {
        const writeStream = createWriteStream(filePath);

        writeStream.on('finish', resolve);

        writeStream.on('error', (error) => {
            unlink(filePath, () => {
                reject(error);
            });
        });

        stream.on('error', (error) => writeStream.destroy(error));
        stream.pipe(writeStream);
    });

    return fileData;
}