const queries = require('./fileUploadQueries'),
    uuid = require('uuid/v1'),
    path = `${__dirname}/../../assets/gifs/`,
    fs = require('fs'),
    ffmpegPath = require('@ffmpeg-installer/ffmpeg').path,
    ffmpeg = require('fluent-ffmpeg'),
    passwordHash = require('password-hash'),
    db = global.database;

const saveFile = async (data, extension) => {
    try {
        const filename = uuid(),
            filePath = `${path}-${filename}.${extension}`;

        await new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err)
                    reject (err);
                resolve();
            });
        });

        return {filePath, filename};
    } catch (err) {
        throw err;
    }
};

exports.uploadGif = async ({file, expirationDate, password}) => {
    let hashedPassword;

    if (password)
        hashedPassword = passwordHash.generate(password);
    const {filePath, filename} = await saveFile(file._data, 'gif'),
        result = await db.query(queries.uploadGif(filePath, filename, expirationDate, hashedPassword));

    return filename;
}

exports.cropFile = async ({file, intervalStart, intervalEnd}) => {
    const {filePath, filename} = await saveFile(file, 'mp4'),
        convertedFilePath = `${path}converted${filename}.gif`;
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

    } catch (err) {
        throw err;
    } finally {
        fs.unlink(filePath, (err) => {
            if (err)
                return reject(err);
        })
    }


    return convertedFilePath;
}