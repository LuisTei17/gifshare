const fileUpload = require('./fileUploadModels');

exports.uploadGif = async (request, h) => {
    try {
        const uploadedGif = await fileUpload.uploadGif(request.payload.file);

        return h.response(uploadedGif);
    } catch (error) {
        throw error;
    }
}

exports.cropFile = async (request, h) => {
    try {
        const file = await fileUpload.cropFile(request.payload);

        return h.response(file);
    } catch (error) {
        throw error;
    }
}