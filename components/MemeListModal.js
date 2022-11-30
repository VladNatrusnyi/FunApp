import {Image, Modal, Pressable, Text, StyleSheet, View, ActivityIndicator} from "react-native";
import React, {useEffect, useMemo} from "react";
import {setIsOpenMemeListModal, setIsOpenModal} from "../store/create-meme/createMemeActions";
import {useDispatch, useSelector} from "react-redux";
import {MemeImgList} from "./MemeImgList";
import {selectMemesImg} from "../store/memeImg/memeImgSelectors";
import {COLORS} from "../assets/colors";
import {loadMemesImg} from "../store/memeImg/memeImgActions";


export default function MemeListModal () {
  const dispatch = useDispatch()
  const isOpenMemeListModal = useSelector(state => state.createMeme.isOpenMemeListModal)

  const isLoadedMemeImg = useSelector(state => state.memeImg.isLoadedMemeImg)
  const memesImages = useSelector(selectMemesImg)

  useEffect(() => {
    if (isOpenMemeListModal) {
      dispatch(loadMemesImg())
    }
  }, [isOpenMemeListModal])

  const memeImages = useMemo(() => {
    console.log('Changed isLoadedMeme', isLoadedMemeImg)
    if (!isLoadedMemeImg) {
      return(<ActivityIndicator size="large" color={COLORS.orange} />)
    } else {
      return (
        <MemeImgList memeImages={memesImages}/>
      )
    }
  }, [isLoadedMemeImg]);

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
              { memeImages }
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
