exports.downloadFile = (filename) => {
    return {
        'text': 'SELECT * FROM file_paths WHERE filename = $1;',
        'values': [ filename ]
    }
}