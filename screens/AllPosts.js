import {MemeCard} from "./MemeCard/MemeCard";
import {Button, View} from "react-native";
import apiDB from "../apiDB";
import {useMemo, useState} from "react";
import {getCurrentUser} from "../store/auth/authSlice";


export function AllPosts () {

  const foo = () => {
    apiDB.get(`users.json?orderBy="follow"&equalTo="HfSUlahvjAQeCGIAtVLsbdCl6AY2"`)
        .then(function (response) {
          console.log('Фігня якась', response);
        })
        .catch(function (error) {
          console.log('Фігня не працює',error);
        });
  }


  return (
    <>
      {/*<MemeCard />*/}
        <Button title={'Sciwjdcedofvodjvsd'} onPress={foo}/>
    </>
  )
}
