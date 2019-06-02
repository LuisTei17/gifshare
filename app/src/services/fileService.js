import HttpHelper from '../helpers/httpHelper';

class FileService {
    
    constructor () {
        this.saveFile = (file) => {
            return HttpHelper.post('upload', file, 'image/gif')
        }
    }
}

export default FileService;