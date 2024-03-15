import { createContext } from "react";
import { http } from "./http.js";

const local = 'https://iccemapi.dev';
export const url = 'https://ffa2d0af23bd.ngrok.app';
export const request = new http(url);
export const ArtifactContext = createContext();

const synth = window.speechSynthesis;

class speech {

    play = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        console.log(synth.getVoices());
        if(!synth.pending)
            synth.speak(utterance);
    }
    
    stop = () => {
        synth.cancel();
    }
}
export const text2speech = new speech();

export const removeExtension = (file) => {
    const name = file.split('.');
    return name[0];
}

//primer for the visibility
export const primer = (data) => {
    const visible = [];
    data.forEach(section => {
        const artifacts = section.artifacts;
        let visibility = [];
        for (let index = 0; index < artifacts.length; index++) {
            if (index == 0) {
                visibility.push(true);
            }
            else {
                visibility.push(false);
            }
        }
        visible.push({ 'counter': 0, 'artifacts': visibility });
    });
    return visible;
}