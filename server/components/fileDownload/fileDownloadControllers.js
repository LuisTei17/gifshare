const fileDownload = require('./fileDownloadModels'),
    fs = require('fs');

exports.downloadFile = async (request, h) => {
    try {
        const filePath = await fileDownload.downloadFile(request.params.filename);
            fileBuffer = await new Promise((resolve, reject) => {
                fs.readFile(filePath, (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            }),
            fileStr = fileBuffer.toString('base64');

        return h.response({fileStr});
    } catch (error) {
        throw error;
    }
}