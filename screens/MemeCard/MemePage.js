import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import Preloader from "../../components/ui/Preloader";
import {MemeCard} from "./MemeCard";

export const MemePage = ({navigation, route}) => {
    const { memeData } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
        });
    }, [navigation]);

    return (
        <>
            <MemeCard meme={memeData}/>
        </>
    )
}