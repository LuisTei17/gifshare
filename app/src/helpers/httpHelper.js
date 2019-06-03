import appconf from '../appconf.json';

class HttpHelper {
    constructor() {

        this.url = appconf.url;
        
        this.post = async (path, data) => {
            return fetch(this.url + path, {
                method: 'POST',
                body: data
            })
        }

        this.get = async (path) => {
            return fetch(this.url + path);
        }
    }
}

export default HttpHelper;