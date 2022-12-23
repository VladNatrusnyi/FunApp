import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image, Alert
} from "react-native";
import React, {useLayoutEffect, useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import MyButton from "../components/ui/MyButton";
import MyModal from "../components/MyModal";
import {COLORS} from "../assets/colors";
import LightButton from "../components/ui/LightButton";
import MemeListModal from "../components/CreateMeme/MemeListModal";
import {
  createMeme,
  setCreatedMemError,
  setIsOpenMemeListModal,
  setMemeImg
} from "../store/create-meme/createMemeSlice";



export default function CreateMeme({ navigation }) {
  const dispatch = useDispatch()
  const memeImg = useSelector(state => state.createMeme.memeImg)
  const error = useSelector(state => state.createMeme.error)
  const createdMeme = useSelector(state => state.createMeme.createdMeme)

  const [memeTexts, setMemeTexts] = useState(null)

  useMemo(() => {
    if (memeImg) {
      setMemeTexts(Object.assign({}, [...Array(memeImg.box_count).keys()].map((el, idx) => (''))))
    }
  }, [memeImg])

  const inputs = useMemo(() => {
    if (memeTexts) {
      return Object.keys(memeTexts).map((input, idx) => {
        return (
          <TextInput
            key={idx}
            style={styles.input}
            placeholder={`Введіть текст №${idx + 1}`}
            autoCapitalize="none"
            keyboardType="default"
            value={memeTexts[input]}
            onChangeText={(text) => setMemeTexts((memeTexts) => ({...memeTexts, [input]: text }))}
          />
        )
      })
    }

  }, [memeTexts])



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Конструктор мемів',
    });
  }, [navigation]);

  //очищення полів воду і картинки
  const clearFields = (data) => {
    dispatch(setMemeImg(''))
    setMemeTexts(data)
  }


  const readyMeme = useMemo(() => {
    if (createdMeme) {
      return (
        <MyModal memeImg={createdMeme.url} clearFields={clearFields}/>
      )
    }
  }, [createdMeme])

  const chooseMemeImgButton = useMemo(() => {
    const status = memeImg
      ? {icon: 'create-outline', text: 'Обрати інший мем'}
      : {icon: 'add-circle-outline', text: 'Обрати мем'}

      return (
        <View style={!memeImg && styles.btnWrap}>
          <LightButton
            style={{marginBottom: 15}}
            clickButton={() => dispatch(setIsOpenMemeListModal(true))}
            text={status.text}
            iconName={status.icon}
          />
        </View>
      )
  }, [memeImg])

  //Обробка помилки
  useMemo(() => {
    if (!!error) {
      Alert.alert(
        "Помилка", error,
        [{ text: "OK", onPress: () => dispatch(setCreatedMemError(null)) }]
      );
    }
  }, [error]);

  // перевірка чи всі поля заповнені
  const isNewMemeDataExist = useMemo(() => memeImg && memeTexts && Object.values(memeTexts).some(el => el !== ''),
    [memeImg, memeTexts])

  const isNewMemeDataClearExist = useMemo(() => !!memeImg,
    [memeImg])

  //функція створення мему
  const createNewMeme = () => {
    if (isNewMemeDataExist ) {
      const data = Object.values(memeTexts).map(meme => ({text : meme}))

      console.log('Меме дата', data)
      dispatch(createMeme({
        template_id: memeImg.memeId,
        boxes: data
      }))
    } else {
      dispatch(setCreatedMemError('Ви не ввели необхідні дані'))
    }
  }


  return (
    <View style={styles.container}>
      { readyMeme }
      <MemeListModal />
      <SafeAreaView style={styles.form}>
        <View>{inputs}</View>

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

        <>
          { isNewMemeDataClearExist && <MyButton clickButton={() => clearFields(null)} text="Очистити" bgColor="gray"/> }

          { isNewMemeDataExist && <MyButton clickButton={createNewMeme} text="Створити мем" bgColor={COLORS.orange}/> }
        </>

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
  },

  btnWrap: {
    justifyContent: "center",
    marginVertical: 'auto',
    padding: 30,
    borderColor: COLORS.orange,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed"
  }
});
