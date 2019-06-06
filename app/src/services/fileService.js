import HttpHelper from '../helpers/httpHelper';

class FileService {
    
    constructor () {
        const httpHelper = new HttpHelper();

        this.saveFile = (file, expirationDate, password) => {
            const data = new FormData();
            data.append('file', file);
            data.append('expirationDate', expirationDate);
            data.append('password', password);

            return httpHelper.post('upload', data)
        }

        this.cropFile = (file, intervalStart, intervalEnd) => {
            const data = new FormData();
            data.append('file', file);
            data.append('intervalStart', intervalStart);
            data.append('intervalEnd', intervalEnd);

            return httpHelper.post('file-crop', data);
        }

        this.download = (filename) => {
            return httpHelper.post('download/' + filename, {});
        }
    }
}

export default FileService;