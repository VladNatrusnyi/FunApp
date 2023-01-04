import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useMemo, useState} from "react";
import {COLORS} from "../assets/colors";
import {MyMemeList} from "./MemeGrid/MyMemesList";
import {useDispatch, useSelector} from "react-redux";


// const myFavouriteMemes = useSelector(state => state.memes.favouriteMemes)

const  renderTabBar  =  props  =>  (
  <TabBar
    { ... props }
    tabStyle = { {  backgroundColor : 'white', borderBottomColor: COLORS.orange, borderBottomWidth: 2   } }
    activeColor={COLORS.orange}
    inactiveColor={'gray'}
    bounces={true}
  />
    ) ;


export default function Tabs() {
  const dispatch = useDispatch()
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Мої меми' },
    { key: 'second', title: 'Збережені' },
  ]);


  const renderScene = SceneMap({
    first: () => <MyMemeList memeType='0' />,
    second: () => <MyMemeList memeType='1'/>,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar = { renderTabBar }
    />
  );
}
