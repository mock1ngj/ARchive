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