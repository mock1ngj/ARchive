import { removeExtension } from "../../js/main"

export default ({ artifacts }) => {
    return (
        <a-entity position="0 0 0">
            <a-plane color="#4E9F3D" height="0.552" width="1"></a-plane>
            {artifacts.length == 0 ?
                (
                    <></>
                ) :
                (
                    <Artifacts artifacts={artifacts}></Artifacts>
                )
            }
        </a-entity>
    )
}


/*
*Dont use values greater than 1 for the height and width since it will
*overflow or even 1 but 1 might be doable depending on the distance of the user
*/
const Artifacts = ({ artifacts }) => {
    return (
        artifacts.map((artifact, i) => (
            <a-entity visible={i == 0 ? 'true' : 'false'} key={i}>
                <a-image src={`#${removeExtension(artifact.image)}`}
                    height="0.4"
                    width="0.4"
                    position="-0.24 0 0.1">
                </a-image>
                <a-entity geometry="primitive:plane; height: 0; width: 0.2;"
                    text={`value:${artifact.name}; align:center; color: black;`}
                    position="0.24 0 0.1"
                    material="color: white">
                </a-entity>
            </a-entity>
        ))
    )
}

