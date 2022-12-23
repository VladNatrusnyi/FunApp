import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useGetMyMemesQuery} from "../../store/queries/dbApi";
import Preloader from "../ui/Preloader";

const MyMemes = () => {
  const navigation = useNavigation();

  const myId = useSelector(state => state.auth.user.uid)

  const { myMemes, isFetching, isError  } = useGetMyMemesQuery(myId, {
    skip: !myId,
    selectFromResult: ({data}) => ({
      myMemes: data?.myMemes
    })
  })

  if (myMemes && !myMemes.length) {
    return (
      <Text style={styles.memeNotExist}>Ви ще не створили своїх мемів</Text>
    )
  }

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
  }

  if (isFetching) {
    return (
      <Preloader />
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

  memeNotExist: {
    textAlign: "center",
    marginTop: 20
  }
})
