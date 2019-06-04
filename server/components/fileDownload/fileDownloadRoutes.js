const joi = require('joi'),
    handler = require('./fileDownloadControllers');

module.exports = [
    {
        'path':'/download/{filename}',
        'method': 'GET',
        'handler': handler.downloadFile,
        'config': {
            'description': 'Crop a file',
            'validate': {
                'params': {
                    'filename': joi.string()
                }
            }
        }
    }
]