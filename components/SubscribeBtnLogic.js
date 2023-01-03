import {Text, View} from "react-native";
import LightButton from "./ui/LightButton";
import React, {useEffect, useMemo} from "react";
import {useToggleSubscribeUserMutation} from "../store/queries/dbApi";
import {getUser} from "../store/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import SubscribeBtn from "./ui/SubscribeBtn";

export const SubscribeBtnLogic = ({user}) => {
    const dispatch = useDispatch()

    const loggedUser = useSelector(state => state.auth.user)

    const isFollowedUser = useMemo(() => {
        if (loggedUser && user) {
            return loggedUser.follow && loggedUser.follow.includes(user.uid)
        }
    }, [loggedUser])

    const [toggleSubscribeUser, {data}] = useToggleSubscribeUserMutation()

    useEffect(() => { dispatch(getUser()) }, [data])

    // subscribe operations
    const followUser = () => {
        let followers = loggedUser && loggedUser.follow
        const arr = followers ? [...followers] : []
        if (user) {
            arr.push(user.uid)
            toggleSubscribeUser({body: JSON.stringify(arr), id: loggedUser.dbId})
        }
    }

    const unfollowUser = () => {
        let followers = loggedUser && loggedUser.follow
        const arr = followers ? [...followers] : []

        if (user) {
            arr.push(user.uid)
            toggleSubscribeUser({body: JSON.stringify(arr.filter(item => item !== user.uid)), id: loggedUser.dbId})
        }
    }


    return (
        <>
            {
                isFollowedUser ?
                    <SubscribeBtn clickButton={unfollowUser} text="Не стежити" bgColor={'gray'}/>
                    :
                    <SubscribeBtn clickButton={followUser} text="Стежити" bgColor={'blue'}/>
            }
        </>
    )
}