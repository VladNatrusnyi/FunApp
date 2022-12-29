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

    // const { user, isLoading, isError  } = useGetCurrentUserQuery(memeData.creatorId, {
    //     skip: !memeData.creatorId,
    //     selectFromResult: ({data}) => ({
    //         user: data?.user
    //     })
    // })
    //
    // const userData = useMemo(() => {
    //     if (user) {
    //         return {name: user.displayName, photo: user.photoURL, uid: user.uid}
    //     }
    // } ,[user])

    return (
        <>
            <MemeCard meme={memeData}/>
        </>
    )
}