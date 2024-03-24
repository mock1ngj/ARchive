import { createContext } from "react";
import { http } from "./http.js";

const local = 'https://iccemapi.dev';
export const url = 'https://iccemapi.dev';
export const request = new http(local);
export const ArtifactContext = createContext();

const synth = window.speechSynthesis;

//session wrapper
class Session {
    set = (id, value) => {
        if(typeof value == 'object') 
            value = JSON.stringify(value);
        sessionStorage.setItem(id, value);
    }

    get = (name) => {
        const value = sessionStorage.getItem(name);
        try {
            return JSON.parse(value);
        } catch (e) {   
            return value
        }
    }
}
export const session = new Session();

//speechsynthesis api wrapper
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
        if (synth.speaking)
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