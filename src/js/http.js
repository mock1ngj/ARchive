import axios from "axios";

export class http {
    constructor(url) {
        this.url = url;
    }
    //request Section Name
    async section() {
        try {
            const section = await axios.post(`${this.url}/api/archive/section`);
            return section.data;
        } catch (error) {
            return console.log(error);
        }
    }

    //request Asset list includes jpeg etc...
    async asset() {
        try {
            const asset = await axios.post(`${this.url}/api/archive/asset`);
            return asset.data;
        } catch (error) {
            return console.log(error);
        }
    }
    //request Artifact info by section
    async artifact(section) {
        try {
            const artifacts = await axios.get(`${this.url}/api/archive/${section}`);
            return artifacts.data;
        } catch (error) {
            return console.log(error);
        }
    }
}

const local = 'https://iccemapi.dev';
const request = new http(local);