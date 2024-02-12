import { http } from "./http.js";
import { showArtifact } from "./showArtifact.js";

export const request = new http();
export const artifact = new showArtifact();

export const removeExtension = (file) => {
    const name = file.split('.');
    return name[0];
}