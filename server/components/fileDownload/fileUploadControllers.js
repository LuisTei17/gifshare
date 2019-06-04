const fileDownload = require('./fileDownloadModels');

exports.uploadGif = async (request, h) => {
    try {
        const uploadedGif = await fileDownload.uploadGif(request.payload.file);

        return h.response(uploadedGif);
    } catch (error) {
        throw error;
    }
}