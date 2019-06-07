const fileDownload = require('./fileDownloadModels'),
    fs = require('fs');

exports.downloadFile = async (request, h) => {
    try {
        const filePath = await fileDownload.downloadFile(
                request.params.filename,
                request.payload
            );
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
};

exports.checkPrivacy = async (request, h) => {
    try {
        const fileData = await fileDownload.checkPrivacy(request.params.filename);

        return h.response(fileData);
    } catch (error) {
        throw error;
    }
};