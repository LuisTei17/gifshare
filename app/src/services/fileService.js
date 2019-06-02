import HttpHelper from '../helpers/httpHelper';

class FileService {
    
    constructor () {
        this.saveFile = (file) => {
            const httpHelper = new HttpHelper();

            return httpHelper.post('upload', file, 'image/gif')
        }
    }
}

export default FileService;