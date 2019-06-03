import HttpHelper from '../helpers/httpHelper';

class FileService {
    
    constructor () {
        this.saveFile = (file) => {
            const httpHelper = new HttpHelper(),
                data = new FormData();
            data.append('file', file)

            return httpHelper.post('upload', data)
        }
    }
}

export default FileService;