import {
  Image,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  SafeAreaView
} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import {setIsOpenMemeListModal, setIsOpenModal} from "../store/create-meme/createMemeActions";
import {useDispatch, useSelector} from "react-redux";
import {MemeImgList} from "./MemeImgList";
import {selectMemesImg} from "../store/memeImg/memeImgSelectors";
import {COLORS} from "../assets/colors";
import {loadMemesImg} from "../store/memeImg/memeImgActions";
import MyButton from "./ui/MyButton";
import LightButton from "./ui/LightButton";
import {getCurrentUserData, setIsOpenUserPersonalDataModal} from "../store/auth/authActions";


export default function UserPersonalListModal () {

  const [name, setName] = useState('')

  const dispatch = useDispatch()
  const isOpenUserPersonalDataModal = useSelector(state => state.auth.isOpenUserPersonalDataModal)
  const userData = useSelector(state => state.auth.user)

  // const isLoadedMemeImg = useSelector(state => state.memeImg.isLoadedMemeImg)
  // const memesImages = useSelector(selectMemesImg)


  // useMemo(() => setName(userData.personalData.name) || setName(''), [userData.personalData.name])
  // const uName = useMemo(() => userData.personalData.name || '', [userData.personalData.name])


  // const chooseUserAvatar = useMemo(() => {
  //   const status = memeImg
  //     ? {icon: 'create-outline', text: 'Завантажити інше фото'}
  //     : {icon: 'add-circle-outline', text: 'Завантажити фото'}
  //
  //   return (
  //     <LightButton
  //       clickButton={() => dispatch(setIsOpenMemeListModal(true))}
  //       text={status.text}
  //       iconName={status.icon}
  //     />
  //   )
  // }, [memeImg])

  // const setNewUserName = (text) => {
  //   if (text) {
  //     dispatch()
  //   }
  // }

  return(
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpenUserPersonalDataModal}
        // onRequestClose={() => dispatch(setIsOpenUserPersonalDataModal(false))}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: 250}}>

              <SafeAreaView style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Введіть ваше ім'я"
                  autoCapitalize="none"
                  keyboardType="default"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />


                {/*{ chooseUserAvatar }*/}

                {/*{ !!memeImg*/}
                {/*&&*/}
                {/*<View style={styles.checkedImgWrap}>*/}
                {/*  <Image*/}
                {/*    style={styles.tinyLogo}*/}
                {/*    source={{*/}
                {/*      uri: memeImg.memeUrl,*/}
                {/*    }}*/}
                {/*    resizeMode='contain'*/}
                {/*  />*/}
                {/*</View>*/}
                {/*}*/}

                <MyButton clickButton={() => dispatch(getCurrentUserData(name))} text="Зберегти" bgColor={COLORS.orange}/>
              </SafeAreaView>

            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  form: {
    justifyContent: 'flex-start',
    marginHorizontal: 30,
    marginTop: 20
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
});
