import useAxios from "axios-hooks"
import { url } from "../../js/main"
import { forwardRef, useCallback, useEffect, useReducer, useState } from "react"
import { useSessionStorage } from "../Hooks/useStorage";
import { useArtifactContext } from "../Context/ViewedContext";
import useSpeech from "../Hooks/useSpeech";

/*
*Dont use values greater than 1 for the height and width since it will
*overflow or even 1 but 1 might be doable depending on the distance of the user
*/

const reducer = (state, action) => {
    const artifactList = state.artifactList;
    state.stop();
    switch (action.type) {
        case "next":
            if (state.index < artifactList.length - 1) {
                const index = state.index + 1;
                return { ...state, index: index };
            }
            else {
                const index = 0;
                return { ...state, index: index };
            }
        case "prev":
            if (state.index == 0) {
                const index = artifactList.length - 1;
                return { ...state, index: index };
            }
            else {
                const index = state.index - 1;
                return { ...state, index: index };
            }
        default:
            break;
    }
}

const ArtifactCard = ({ data }) => {

    return (
        <>
            <a-image src={`${url}/api/archive/asset/${data[0].image}`}
                height="1"
                width="1"
                position="0 0 0.1">
            </a-image>
            <a-text position="0 0.8 0"
                value={`${data[0].name}`}
                align="center"
                color="white"
                width="2">
            </a-text>
            <a-text position="0 -0.9 0.1"
                value={`${data[0].description}`}
                align="center"
                color="white"
                width="1">
            </a-text>
        </>
    )
};

export default forwardRef((props, ref) => {
    const { sectionID, artifactList, index } = props;
    const {play, stop} = useSpeech();
    const setViewedArtifact = useArtifactContext();
    const [artifact, dispatch] = useReducer(reducer, { artifactList: artifactList, index: 0,stop:stop })
    const [{ data, loading, error }, refetch] = useAxios({ url: `${url}/api/archive/info/${artifactList[0].id}` });

    const pushAndFetch = () => {
        //push to sessionStorage the viewed artifact
        const id = artifact.artifactList[artifact.index].id;
        setViewedArtifact((old) => {
            if (!old.includes(id)) {
                return [...old, id]
            }
            return old
        });
        //refetch data
        try {
            refetch({ url: `${url}/api/archive/info/${id}` });
        }
        catch (e) {
            console.log(e);
        }
    }

    const next = () => {
        dispatch({ type: "next" });
        pushAndFetch();
    }

    const prev = () => {
        dispatch({ type: "prev" });
        pushAndFetch();
    }

    return (
        <a-entity position="0 0 0" visible={false} ref={artifact => ref.current[sectionID] = artifact}>
            {typeof (artifactList[index]) == "undefined" && (
                <a-text value="This Section is Empty"
                    width="1"
                    color="white">
                </a-text>
            )}
            {loading && (
                <a-text value="Loading..."
                    width="1"
                    color="white">
                </a-text>
            )}
            {!loading && (
                <>
                    <ArtifactCard data={data} artifact={artifact} />
                    <a-image class="clickable"
                        src="#next"
                        position="0.5 -0.7 0"
                        height="0.2"
                        width="0.2"
                        onClick={() => next()}>
                    </a-image>
                    <a-image
                        class="clickable"
                        src="#prev"
                        position="-0.5 -0.7 0"
                        height="0.2"
                        width="0.2"
                        onClick={() => prev()}>
                    </a-image>
                    <a-image
                        class="clickable"
                        src="#mic"
                        position="0 -0.7 0"
                        height="0.2"
                        width="0.2"
                        onClick={() => play(data[0].description)}>
                    </a-image>
                </>
            )}
        </a-entity>
    )
});