import { http } from "./http.js";
import { showArtifact } from "./showArtifact.js";

const ngrok = 'https://8fea-49-151-192-198.ngrok-free.app';
const local = 'https://iccemapi.dev';
export const url = local;
export const request = new http(local);
export const artifact = new showArtifact();

const synth = window.speechSynthesis;

const speech = () => {
    const utterance = new SpeechSynthesisUtterance('Testing API');
    synth.speak(utterance);
}

export const removeExtension = (file) => {
    const name = file.split('.');
    return name[0];
}