const joi = require('joi'),
    handler = require('./fileDownloadControllers');

module.exports = [
    {
        'path':'/download/{filename}',
        'method': 'POST',
        'handler': handler.downloadFile,
        'config': {
            'description': 'Download a file',
            'validate': {
                'params': {
                    'filename': joi.string()
                }
            }
        }
    },
    {
        'path':'/check-privacy/{filename}',
        'method': 'GET',
        'handler': handler.checkPrivacy,
        'config': {
            'description': 'Crop a file',
            'validate': {
                'params': {
                    'filename': joi.string()
                }
            }
        }
    }
];