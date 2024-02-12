import axios from "axios";
import { createContext } from "react";

export class http {
    //request Section Name
    async section() {
        try {
            const section = await axios.post('http://192.168.1.152:8000/api/archive/section');
            return section.data;            
        } catch (error) {
            return console.log(error);
        }
    }

    //request Asset list includes jpeg etc...
    async asset() {
        try {
            const asset = await axios.post('http://192.168.1.152:8000/api/archive/asset');
            return asset.data;            
        } catch (error) {
            return console.log(error); 
        }
    }
    //request Artifact info by section
    async artifact(section) {
        try {
            const artifacts = await axios.get(`http://192.168.1.152:8000/api/archive/${section}`);
            return artifacts.data;            
        } catch (error) {
            return console.log(error);
        }
    }
}