import { signal } from "@preact/signals";

export const state = () =>{
    const page = signal('home')
    return {page};
}