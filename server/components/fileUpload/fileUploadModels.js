const queries = require('./fileUploadQueries'),
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

exports.cropFile = async ({file, intervalStart, intervalEnd}) => {
    const {filePath, filename} = await saveFile(file, 'mp4');

    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg(filePath)
    .setStartTime(intervalStart)
    .setDuration(intervalEnd)
    .save(`${path}converted${filename}.mp4`);


    return;
}