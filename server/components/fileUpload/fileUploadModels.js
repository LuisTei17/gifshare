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
    const {filePath, filename} = await saveFile(file, 'mp4'),
        convertedFilePath = `${path}converted${filename}.gif`;
    let result;
    try {

        await new Promise((resolve, reject) => {
            ffmpeg.setFfmpegPath(ffmpegPath);
            ffmpeg(filePath)
            .setStartTime(intervalStart)
            .setDuration(intervalEnd)
            .format('gif')
            .on('error', error => {
                return reject(error);
            })
            .on('end', () => {
                return resolve();
            })
            .save(convertedFilePath);
        });

        result = await db.query(queries.uploadGif(convertedFilePath, filename));

    } catch (err) {
        throw err;
    } finally {
        fs.unlink(filePath, (err) => {
            if (err)
                return reject(err);
        })
    }


    return result.rows;
}