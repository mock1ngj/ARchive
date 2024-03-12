import { createContext } from "react";
import { http } from "./http.js";

const local = 'https://iccemapi.dev';
export const url = 'https://bcd55f15b6ea.ngrok.app';
export const request = new http('https://bcd55f15b6ea.ngrok.app');
export const ArtifactContext = createContext();

const synth = window.speechSynthesis;

const speech = () => {
    const utterance = new SpeechSynthesisUtterance('Testing API');
    synth.speak(utterance);
}

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