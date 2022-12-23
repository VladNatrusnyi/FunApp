import React, { useState } from 'react';

import { View, Text } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import colors from "../colors";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";
import {USER_LOGOUT} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {setIsOpenUserPersonalDataModal} from "../store/auth/authSlice";
import UserPersonalDataModal from "./UserPersonalDataModal";

export const CustomMenu = () => {
  const dispatch = useDispatch()

  const userName = useSelector(state => state.auth.user.displayName)
  const userAvatar = useSelector(state => state.auth.user.photoURL)

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const onSignOut = () => {
    signOut(auth).then(() => {
      console.log('Ми вийшли')
      dispatch({type: USER_LOGOUT})
    }).catch((error) => {
      console.log('Error logging out: ', error)
    });
  };

  return (
    <View style={{}}>
      <Menu
        visible={visible}
        anchor={<MaterialCommunityIcons onPress={showMenu} name="dots-vertical" size={24} color={colors.gray} />}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => {
          hideMenu()
          dispatch(setIsOpenUserPersonalDataModal(true))
        }}>Редагувати профіль</MenuItem>
        <MenuDivider />
        <MenuItem onPress={async () => {
          await onSignOut()
          hideMenu()
        }}>
          <Text style={{color: 'red'}}>
            Вийти
          </Text>
        </MenuItem>
      </Menu>
      <UserPersonalDataModal text={userName} img={userAvatar && userAvatar}/>
    </View>
  );
};

