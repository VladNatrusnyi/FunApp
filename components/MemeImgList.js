import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, Button } from 'react-native'
import {MemeImg} from "./MemeImg";

export const MemeImgList = ({ memeImages }) => {
  let content = (
    <View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={memeImages}
        renderItem={({ item }) => (
          <View style={styles.memeList}>
            <MemeImg memeImageItem={item} />
          </View>
        )}
      />
    </View>
  )

  if (memeImages.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require('../assets/no-items.png')}
        />
        <Button style={{marginTop: 20}} title="Завантажити меми" />
      </View>
    )
  }

  return (
    <View>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  memeList: {
    marginBottom: 10
  },

  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
