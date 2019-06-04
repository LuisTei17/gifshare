exports.uploadGif = (filePath, filename) => {
    return {
        'text': 'INSERT INTO file_paths (path, filename) VALUES ($1, $2);',
        'values': [ filePath, filename ]
    }
}