exports.getFileByName = (filename, hashPassword) => {
    let passwordClausule = '';
    
    if (hashPassword)
        passwordClausule = ` AND password = '${hashPassword}'`;

    return {
        'text': `SELECT * FROM file_paths WHERE filename = $1 ${passwordClausule};`,
        'values': [ filename ]
    };
};