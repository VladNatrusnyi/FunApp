import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image, Alert, Button
} from "react-native";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import colors from "../colors";
import {useDispatch, useSelector} from "react-redux";
import {setAuthIsLoading, setAuthUser} from "../store/auth/authActions";
import API from "../api"
import {loadMemesImg} from "../store/memeImg/memeImgActions";
import {MemeImgList} from "../components/MemeImgList";
import {selectMemesImg} from "../store/memeImg/memeImgSelectors";
import {
  clearMemeData,
  createNewMeme,
  setCreatedMemError,
  setIsOpenMemeListModal,
  setNewMemeText
} from "../store/create-meme/createMemeActions";
import MyButton from "../components/ui/MyButton";
import MyModal from "../components/MyModal";
import {COLORS} from "../assets/colors";
import LightButton from "../components/ui/LightButton";
import MemeListModal from "../components/MemeListModal";
import {USER_LOGOUT} from "../store/rootReducer";


export default function CreateMeme({ navigation }) {
  const dispatch = useDispatch()
  const {memeImg, memeTopText, memeBottomText} = useSelector(state => state.createMeme.newMemeData)
  const error = useSelector(state => state.createMeme.error)
  const createdMeme = useSelector(state => state.createMeme.createdMeme)


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Конструктор мемів',
    });
  }, [navigation]);


  const readyMeme = useMemo(() => {
    if (createdMeme) {
      return (
        <MyModal memeImg={createdMeme.url}/>
      )
    }
  }, [createdMeme])

  const chooseMemeImgButton = useMemo(() => {
    const status = memeImg
      ? {icon: 'create-outline', text: 'Обрати інший мем'}
      : {icon: 'add-circle-outline', text: 'Обрати мем'}

      return (
        <LightButton
          clickButton={() => dispatch(setIsOpenMemeListModal(true))}
          text={status.text}
          iconName={status.icon}
        />
      )
  }, [memeImg])

  useMemo(() => {
    if (!!error) {
      Alert.alert(
        "Помилка", error,
        [
          { text: "OK", onPress: () => dispatch(setCreatedMemError(null)) }
        ]
      );
    }
  }, [error]);

  const isNewMemeDataExist = useMemo(() => memeImg || memeTopText || memeBottomText,
    [memeImg, memeTopText, memeBottomText])

  const setText = (position, text) => {
    console.log('TEEEEXT', text)
    dispatch(setNewMemeText(position, text))
  }

  const createMeme = () => {
    if ((memeTopText || memeBottomText) && memeImg ) {
      dispatch(createNewMeme())
    } else {
      dispatch(setCreatedMemError('Ви не ввели необхідні дані'))
    }
  }

  const clearMemeCreationData = () => {
    dispatch(clearMemeData())
  }

  return (
    <View style={styles.container}>
      { readyMeme }
      <MemeListModal />
      <SafeAreaView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Введіть перший напис"
          autoCapitalize="none"
          keyboardType="default"
          value={memeTopText}
          onChangeText={(text) => setText('top', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Введіть другий напис"
          autoCapitalize="none"
          autoCorrect={false}
          value={memeBottomText}
          onChangeText={(text) => setText('bottom', text)}
        />


        { chooseMemeImgButton }

        { !!memeImg
        &&
        <View style={styles.checkedImgWrap}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: memeImg.memeUrl,
            }}
            resizeMode='contain'
          />
        </View>
        }

        { isNewMemeDataExist
          ? <MyButton clickButton={clearMemeCreationData} text="Очистити" bgColor="gray"/>
          : null
        }
        <MyButton clickButton={createMeme} text="Створити мем" bgColor={COLORS.orange}/>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 30,
    marginTop: 20
  },
  tinyLogo: {
    width: 200,
    height: 150,
  },
  checkedImgWrap: {
    alignItems: 'center',
    marginBottom: 10,
  }
});
