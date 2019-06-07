const db = global.database;
    queries = require('./fileDownloadQueries'),
    md5 = require('md5'),
    boom = require('boom');

generatePassword = (payload) => {
    const password = JSON.parse(payload).password
    
    return md5(password);
};

exports.downloadFile = async (filename, payload) => {
    let hashedPassword;
    if (typeof payload === 'string')
        hashedPassword = generatePassword(payload);

    const result = await db.query(queries.getFileByName(filename, hashedPassword)),
        fileResult = result.rows[0];

    if (!fileResult)
        throw boom.conflict('FILE_DOES_NOT_EXIST');
    
    return fileResult.path;
};

exports.checkPrivacy = async (filename) => {
    const result = await db.query(queries.getFileByName(filename)),
        fileResult = result.rows[0];

    if (!fileResult)
        throw boom.conflict('FILE_DOES_NOT_EXIST');

    if (fileResult.password)
        return {'private': true};
    return {'private': false};
};