import { createContext } from "react";
import { http } from "./http.js";

const local = 'https://iccemapi.dev';
export const url = 'https://18019baadd25.ngrok.app';
export const request = new http(url);
export const ArtifactContext = createContext();

const synth = window.speechSynthesis;

class speech {

    play = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.paused ? synth.resume() : synth.speak(utterance);
    }

    playOnce = (text, index) => {
        if (index != this.index) {
            this.index = index;
            this.play(text);
        }
    }

    pause = () => {
        if(synth.speaking)
            synth.pause();
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