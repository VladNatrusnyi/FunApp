import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useGetMyMemesQuery} from "../../store/queries/dbApi";
import Preloader from "../ui/Preloader";
import {MemeGrid} from "./MemeGrid";
import {MyMemeGrid} from "./MyMemeGrid";
import {FavouriteMemeGrid} from "./FavouriteMemeGrid";


export const MyMemeList = ({memeType}) => {

  return (
    <>{
      memeType === '0'
        ? <MyMemeGrid />
        : <FavouriteMemeGrid />
    }</>
  )
}


