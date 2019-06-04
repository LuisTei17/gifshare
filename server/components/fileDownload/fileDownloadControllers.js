const fileDownload = require('./fileDownloadModels');

exports.downloadFile = async (request, h) => {
    try {
        const filePath = await fileDownload.downloadFile(request.params.filename);

        return h.inert(filePath, {confine: false});
    } catch (error) {
        throw error;
    }
}