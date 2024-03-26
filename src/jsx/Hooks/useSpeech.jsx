import { useEffect, useState } from "react"

export default () => {
    const [last, setLast] = useState(null);
    const synth = window.speechSynthesis;

    const play = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    const playOnce = (index, text) => {
        if (index != last) {
            setLast(index);
            play(text);
        }
    }

    const stop = () => {
        synth.cancel();
    }
    return { play, stop, playOnce }
}