import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {useGetMyMemesQuery} from "../../store/queries/dbApi";
import Preloader from "../ui/Preloader";
import {Text} from "react-native";
import {MemeGrid} from "./MemeGrid";


export const MyMemeGrid = () => {
    const navigation = useNavigation();

    const myId = useSelector(state => state.auth.user.uid)

    const { myMemes, isLoading, isError  } = useGetMyMemesQuery(myId, {
        skip: !myId,
        selectFromResult: ({data}) => ({
            myMemes: data?.myMemes
        })
    })

    if (myMemes && !myMemes.length) {
        return (
            <Text style={{textAlign: "center", marginTop: 20}}>Ви ще не створили своїх мемів</Text>
        )
    }

    if (isLoading) {
        return (
            <Preloader />
        )
    }

    if (myMemes) {
        return (
            <MemeGrid memeArr={myMemes} type={'user'}/>
        )
    }

    if (isError) {
        return (
            <>
                <Text> Some Error</Text>
            </>
        )
    }

}