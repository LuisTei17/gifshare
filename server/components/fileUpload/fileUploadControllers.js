const fileUpload = require('./fileUploadModels');

exports.uploadGif = async (request, h) => {
    try {
        const uploadedGif = await fileUpload.uploadGif(request.payload.file);

        return h.response(uploadedGif);
    } catch (error) {
        throw error;
    }
}