import { useEffect, useState } from "react"

export default () => {
    const synth = window.speechSynthesis;

    const play = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.resume();
        synth.speak(utterance);
    }

    const pause = () =>{
        synth.pause();
    }

    const stop = () => {
        synth.cancel();
    }
    return { play, stop, pause }
}