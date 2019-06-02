import appconf from '../appconf.json';

class HttpHelper {
    constructor() {

        this.url = appconf.url;
        
        this.post = async (path, data, contentType = 'application/json') => {
            return fetch(this.url + path, {
                method: 'POST',
                headers: {
                    'Content-Type': contentType
                },
                body: data
            })
        }
    }
}

export default HttpHelper;