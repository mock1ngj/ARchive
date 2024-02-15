import axios from "axios";

export class http {
    constructor(url) {
        this.url = url;
    }
    //request data
    async section() {
        try {
            const section = await axios.post(`${this.url}/api/archive/section`);
            return section.data;
        } catch (error) {
            return console.log(error);
        }
    }
}

const local = 'https://iccemapi.dev';
const request = new http(local);