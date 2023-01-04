import {Text, View} from "react-native";
import LightButton from "../ui/LightButton";
import React, {useEffect, useMemo, useState} from "react";
import {
    useGetCurrentUserQuery,
    useToggleFollowMeMutation,
    useToggleSubscribeUserMutation
} from "../../store/queries/dbApi";
import {getUser} from "../../store/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import SubscribeBtn from "../ui/SubscribeBtn";

export const SubscribeBtnLogic = ({user}) => {
    const dispatch = useDispatch()

    const loggedUser = useSelector(state => state.auth.user)

    // const [userStatus, setUserStatus] = useState(false)

    // const { user, isLoading } = useGetCurrentUserQuery('wkq6Z8Da7eU92FePbQZiOz0nsBe2', {
    //     skip: !userStatus,
    //     selectFromResult: ({data}) => ({
    //         user: data?.user
    //     })
    // })

    const isFollowedUser = useMemo(() => {
        if (loggedUser && user) {
            return loggedUser.follow && loggedUser.follow.includes(user.uid)
        }
    }, [loggedUser])

    const [toggleSubscribeUser, {data}] = useToggleSubscribeUserMutation()

    const [toggleFollowMe, {followMeData}] = useToggleFollowMeMutation({
        selectFromResult: ({data}) => ({
            followMeData: data?.followMeData
        })
    })




    useEffect(() => { dispatch(getUser()) }, [data, followMeData])

    // subscribe operations
    const followUser = () => {
        let followers = loggedUser && loggedUser.follow
        const arr = followers ? [...followers] : []
        if (user) {
            arr.push(user.uid)
            toggleSubscribeUser({body: JSON.stringify(arr), id: loggedUser.dbId})

            let followMe = user.followMe ? [...user.followMe] : []
            followMe.push(loggedUser.uid)
            toggleFollowMe({body: JSON.stringify(followMe), id: user.dbId})
        }
    }

    const unfollowUser = () => {
        let followers = loggedUser && loggedUser.follow
        const arr = followers ? [...followers] : []

        if (user) {
            arr.push(user.uid)
            toggleSubscribeUser({body: JSON.stringify(arr.filter(item => item !== user.uid)), id: loggedUser.dbId})

            let followMe = user.followMe ? [...user.followMe] : []
            // followMe.push(loggedUser.uid)
            toggleFollowMe({body: JSON.stringify(followMe.filter(item => item !== loggedUser.uid)), id: user.dbId})
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