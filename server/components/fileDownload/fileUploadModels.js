const queries = require('./fileDownloadQueries'),
    uuid = require('uuid/v1'),
    path = `${__dirname}/../../assets/gifs/`,
    fs = require('fs'),
    ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    ffmpeg = require('fluent-ffmpeg');
    db = global.database;

const saveFile = async (data, extension) => {
    try {
        const filename = uuid(),
            filePath = `${path}-${filename}.${extension}`;

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
    const {filePath, filename} = await saveFile(file, 'gif'),
        result = await db.query(queries.uploadGif(filePath, filename));

    return result.rows[0];
}