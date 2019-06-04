const joi = require('joi'),
    handler = require('./fileUploadControllers');

module.exports = [
    {
        'path':'/upload',
        'method': 'POST',
        'handler': handler.uploadGif,
        'config': {
            'description': 'Upload file',
            'payload': {
                'output': 'stream',
                'parse': true,
                'allow': 'multipart/form-data'
            }
        }
    },
    {
        'path':'/file-crop',
        'method': 'POST',
        'handler': handler.cropFile,
        'config': {
            'description': 'Crop a file'
        }
    }
]