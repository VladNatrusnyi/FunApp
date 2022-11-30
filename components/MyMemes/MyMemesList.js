import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useMemo} from "react";
import {getMyMemes} from "../../store/meme/memeActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const MyMemes = () => {
  const myMemes = useSelector(state => state.memes.myMemes)
  const dispatch = useDispatch()

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getMyMemes())
  }, [])

  const memes = useMemo(() => {
    if (myMemes) {
      return (
        <View style={styles.row}>
          {
            myMemes.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.5}
                  style={styles.box}
                  onPress={() => navigation.navigate("Meme item", {memeData: item})}
                >
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{
                      uri: item.url.url,
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    } else {
      return (
        <Text>Немає </Text>
      )
    }
  }, [myMemes])

  return (
    <>
      {memes}
    </>
  )
}

export const MyMemeList = ({memeType}) => {
  return (
    <>{
      memeType === '0'
        ? <MyMemes />
        : <Text>Улюблені меми</Text>
    }</>
  )
}

const styles = StyleSheet.create({
  row: {
  flexDirection: 'row',
  flexWrap: "wrap",

},
box: {
  width: '31%',
  height: 100,
  backgroundColor: 'white',
  marginHorizontal: '1%',
  marginVertical: '1%',
  padding: 5,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'lightgray'
},
})
