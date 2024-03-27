import { useEffect, useState } from "react"

export default () => {
    const synth = window.speechSynthesis;

    const play = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    const stop = () => {
        synth.cancel();
    }
    return { play, stop }
}