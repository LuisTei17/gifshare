const db = global.database;
    queries = require('./fileDownloadQueries'),
    boom = require('boom');

exports.downloadFile = async (filename) => {
    const result = await db.query(queries.downloadFile(filename)),
        fileResults = result.rows;

    if (!fileResults.length)
        throw boom.conflict('FILE_DOES_NOT_EXIST');
    
    return fileResults[0].path;
}