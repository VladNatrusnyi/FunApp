import {Image, Modal, Pressable, Text, StyleSheet, View, ActivityIndicator} from "react-native";
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MemeImgList} from "./MemeImgList";
import {COLORS} from "../../assets/colors";
import {useGetUsersQuery} from "../../store/queries/dbApi";
import {useLoadMemesImgQuery} from "../../store/queries/imgFlipApi";
import {setIsOpenMemeListModal} from "../../store/create-meme/createMemeSlice";


export default function MemeListModal () {
  const dispatch = useDispatch()
  const isOpenMemeListModal = useSelector(state => state.createMeme.isOpenMemeListModal)

  const { memesImage, isLoading, isError  } = useLoadMemesImgQuery(undefined, {
    skip: !isOpenMemeListModal,
    selectFromResult: ({data}) => ({
      memesImage: data?.memesImg
    })
  })

  // console.log('IMAGES MEME', memesImage)

  const memeImages = () => {
    if (isLoading) {
      return(<ActivityIndicator size="large" color={COLORS.orange} />)
    }

    if (memesImage) {
      return (
        <MemeImgList memeImages={memesImage}/>
      )
    }

    if (isError) {
      return (
        <Text style={{ color: 'red'}}> Помилка завантаження </Text>
      )
    }
  };

  return(
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenMemeListModal}
        onRequestClose={() => dispatch(setIsOpenMemeListModal(false))}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: 250}}>
              { memeImages() }
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
});
