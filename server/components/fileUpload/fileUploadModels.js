const queries = require('./fileUploadQueries'),
    uuid = require('uuid/v1'),
    path = `${__dirname}/../../assets/gifs/`,
    fs = require('fs'),
    db = global.database;

const saveGif = async (file) => {
    try {
        const filename = uuid(),
            filePath = `${path}-${filename}.gif`,
            data = file._data;

        await new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err)
                    reject(err);
                resolve();
            });
        });

        return {filePath, filename};
    } catch (err) {
        throw err;
    }
};

exports.uploadGif = async (file) => {
    const {filePath, filename} = await saveGif(file),
        result = await db.query(queries.uploadGif(filePath, filename));

    return result.rows[0];
}