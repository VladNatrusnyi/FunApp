import {Image, Modal, Pressable, Text, StyleSheet, View} from "react-native";
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../assets/colors";
import Preloader from "./ui/Preloader";
import {clearCreatedMeme, setIsOpenModal} from "../store/create-meme/createMemeSlice";
import {usePublishMemeMutation} from "../store/queries/dbApi";


export default function MyModal({ memeImg, clearFields }) {
  const dispatch = useDispatch()
  const isOpenModal = useSelector(state => state.createMeme.isOpenModal)
  const isPublished = useSelector(state => state.createMeme.isPublished)

  const createdMeme = useSelector(state => state.createMeme.createdMeme)


  const creator = useSelector(state => state.auth.user.uid)

  const [publishMeme, {data, isLoading, isError}] = usePublishMemeMutation()

  console.log('POSTED MEME', data)

  const publishPost = async () => {
    await publishMeme(JSON.stringify({
      url: createdMeme,
      creatorId: creator,
      date: new Date(),
      likes: '',
      comments: ''
    }))

    //передана через пропс функція очищення текстових полів
    clearFields(null)
  }


  return(
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenModal}
        onRequestClose={() => {
          dispatch(setIsOpenModal(false))
          dispatch(clearCreatedMeme())
        }}
      >
        <View style={styles.centeredView}>
          {
            !isPublished
              ?
                <View style={styles.modalView}>
                <View>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: memeImg,
                    }}
                    resizeMode='contain'
                  />
                </View>
                {/*<Pressable*/}
                {/*  style={[styles.button, styles.buttonClose]}*/}
                {/*>*/}
                {/*  <Text style={styles.textStyle}>Зберегти на телефон</Text>*/}
                {/*</Pressable>*/}
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={publishPost}
                >
                  <Text style={styles.textStyle}>Опублікувати на сторінці</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    dispatch(setIsOpenModal(false))
                    dispatch(clearCreatedMeme())
                  }}
                >
                  <Text style={styles.textStyle}>Скасувати</Text>
                </Pressable>
              </View>
              :
              <View style={styles.modalView}>
                <View style={{width: 150, height: 150}}>
                  <Image
                    style={{width: 150, height: 150}}
                    source={require('../assets/success.gif')}
                    resizeMode='contain'
                  />
                </View>
                  <Text style={styles.textSuccess}>Мем успішно завантажено</Text>
              </View>
          }
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
    marginTop: 22
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
    elevation: 2,
    marginBottom: 15,
    marginTop: 15
  },
  buttonOpen: {
    backgroundColor: COLORS.orange,
  },
  buttonClose: {
    backgroundColor: "gray",
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
  textSuccess: {
    color: 'black',
    fontSize: 18,
    fontWeight: "bold"
  }
});
