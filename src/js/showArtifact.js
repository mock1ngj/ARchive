//show and hide with reset
export class showArtifact {

    show(array, artifact) {
        for (let index = 0; index < array.length; index++) {
            array[index] = false;

            if (index == artifact) {
                array[index] = true;
            }
        }
        return array;
    }

    reset(array) {
        for (let index = 0; index < array.length; index++) {
            array[index] = false; 
        }
        array[0] = true;
        return array;
    }
}

const artifact = new showArtifact();
var art = artifact.show([true, false, false], 2);
console.log(art);
art = artifact.reset(art);
console.log(art);