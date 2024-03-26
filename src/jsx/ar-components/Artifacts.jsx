import useAxios from "axios-hooks"
import { url } from "../../js/main"
import { forwardRef, useState } from "react"

/*
*Dont use values greater than 1 for the height and width since it will
*overflow or even 1 but 1 might be doable depending on the distance of the user
*/

const Artifact = forwardRef((props, ref) => {
    const { sectionID, artifactList } = props;
    const [artifactsList, setArtifactsList] = useState(artifactList);
    const [index, setIndex] = useState(0);
    const [artifact, setArtifact] = useState(artifactList[index]);
    console.log(artifact.id);
    const [{ data, loading, error }, refetch] = useAxios({ url: `${url}/api/archive/info/${artifact.id}` });
    
    if (loading) {
        return (
            <a-entity position="0 0 0" visible={false} ref={artifact => ref.current[sectionID] = artifact}></a-entity>
        )
    }

    return (
        <a-entity position="0 0 0" visible={false} ref={artifact => ref.current[sectionID] = artifact}>
            <a-image src={`${url}/api/archive/asset/${data[0].image}`}
                height="0.4"
                width="0.4"
                position="-0.14 0 0.1">
            </a-image>
            <a-text position="0.24 0.2 0.1"
                value={`${data[0].name}`}
                align="center"
                color="white"
                width="0.8">
            </a-text>
            <a-text position="0.24 0 0.1"
                value={`${data[0].description}`}
                align="center"
                color="white"
                width="0.5">
            </a-text>
            <a-image class="clickable"
                src="#next"
                position="0.5 0 0"
                height="0.125"
                width="0.125">
            </a-image>
            <a-image
                class="clickable"
                src="#prev"
                position="-0.5 0 0"
                height="0.125"
                width="0.125">
            </a-image>

        </a-entity>
    )
});

export default forwardRef((props, ref) => {
    const { sectionID, artifactList, index } = props;
    console.log(artifactList);
    if (typeof (artifactList[index]) == "undefined") {
        return (
            <a-entity position="0 0 0" visible={false} ref={artifact => ref.current[sectionID] = artifact}>
                <a-text value="This Section is Empty"
                    width="1"
                    color="white">
                </a-text>
            </a-entity>
        )
    }

    return (
        <Artifact sectionID={sectionID} artifactList={artifactList} ref={ref} />
    )
})
