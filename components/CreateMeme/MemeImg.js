import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native'
import {useDispatch} from "react-redux";
import {setIsOpenMemeListModal, setMemeImg} from "../../store/create-meme/createMemeSlice";

export const MemeImg = ({ memeImageItem }) => {
  const dispatch = useDispatch()

  const setMemeImage = () => {
    dispatch(setMemeImg({memeUrl: memeImageItem.url, memeId: memeImageItem.id, box_count: memeImageItem.box_count}))
    dispatch(setIsOpenMemeListModal(false))
  }

  return (
    <TouchableOpacity
      onPress={setMemeImage}
      activeOpacity={0.5}
    >
      <View style={styles.memeWrap}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: memeImageItem.url,
          }}
          resizeMode='contain'
        />

        {/*<Text style={styles.text}>{memeImageItem.name}</Text>*/}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  memeWrap: {
    padding: 3,
    borderWidth: 5,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 5,
  },
  tinyLogo: {
    width: '100%',
    height: 200,
  },
  text: {
    width: 20
  }
})
