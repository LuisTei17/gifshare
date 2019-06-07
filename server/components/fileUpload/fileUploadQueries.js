exports.uploadGif = (filePath, filename, expirationDate, password) => {
    return {
        'text': `INSERT INTO file_paths (path, filename, expiration_date, password)
                    VALUES ($1, $2, $3, $4);`,
        'values': [ filePath, filename, expirationDate, password ]
    }
}