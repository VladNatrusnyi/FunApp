import {Button, Image, Text, View} from "react-native";
import PhotoPicker from "../components/PhotoPicker";
import API from "../api";
import {setIsLoadedMemeImg, setMemeImages} from "../store/memeImg/memeImgActions";
import {useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import apiDB from "../apiDB";

export function AllPosts () {
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (token) {
      axios.get(`https://funapp-caaf5-default-rtdb.firebaseio.com/users.json`)
        .then(function (response) {
          console.log('DB', response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

  }, [])

  return (
    <View>
      <Text> All post pageffff</Text>
      <Text> All post pageffff</Text>
      <Text> All post pageffff</Text>
      <Text> All post pageffff</Text>
      <PhotoPicker />
    </View>
  )
}
