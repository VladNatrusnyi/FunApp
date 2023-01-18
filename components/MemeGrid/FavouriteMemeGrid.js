import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {MemeGrid} from "./MemeGrid";
import {ScrollView, Text} from "react-native";
import {useEffect} from "react";
import { getFavouriteMeme } from "../../store/memeOperations/memeOperations";

export const FavouriteMemeGrid = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const loggedUser = useSelector(state => state.auth.user)

    const {favouriteMeme, isLoad} = useSelector(state => state.currentMeme)



    useEffect(() => {
        if (!favouriteMeme.length && loggedUser.favouriteMemes) { dispatch(getFavouriteMeme(loggedUser.favouriteMemes)) }
    },[])



    if (!loggedUser.favouriteMemes || !loggedUser.favouriteMemes.length) {
        return (
            <Text style={{textAlign: "center", marginTop: 20}}>У вас ще немає збережених мемів</Text>
        )
    }


    if (favouriteMeme.length) {
        return (
            <ScrollView>
                <MemeGrid memeArr={favouriteMeme} type={'me'}/>
            </ScrollView>
        )
    }

}