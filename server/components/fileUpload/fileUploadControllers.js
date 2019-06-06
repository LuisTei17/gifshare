const fileUpload = require('./fileUploadModels'),
    fs = require('fs');

exports.uploadGif = async (request, h) => {
    try {
        const filename = await fileUpload.uploadGif(request.payload);

        return h.response({filename});
    } catch (error) {
        throw error;
    }
}

exports.cropFile = async (request, h) => {
    try {
        const filePath = await fileUpload.cropFile(request.payload);

        return h.file(filePath, {confine: false});
    } catch (error) {
        throw error;
    }
}