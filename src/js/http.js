import axios from "axios";

export const requestSetction = () => {
    var section;
    axios.post('http://localhost:8000/archive/section')
        .then(response => {
            section = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return section;
}

export const requestArtifact = ({section}) => {
    var artifacts;
    axios.post(`http://localhost:8000/archive/${section}`)
    .then(response=>{
        artifacts = response.data;
    }).catch(error => {
        console.log(error);
    });
    
}