import {
    View,
    StyleSheet,
    FlatList, ActivityIndicator, RefreshControl, Text, TouchableOpacity
} from 'react-native';
import {useGetAllMemesQuery, useGetMyMemesQuery} from "../store/queries/dbApi";
import {COLORS} from "../assets/colors";
import {MemeCard} from "./MemeCard/MemeCard";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const AllPosts = () => {
    const dispatch = useDispatch()

    const loggedUser = useSelector(state => state.auth.user)

    const [refreshing, setRefreshing] = useState(false);

    const [tabStatus, setTabStatus] = useState('My');

    const { allMemes, isLoading, isError, refetch  } = useGetAllMemesQuery('s',{
        // skip: !allMemeLoad,
        selectFromResult: ({data}) => {
            return {
                allMemes: data?.allMemes
            }
        },

    })


    const memes = useMemo(() => {
        if (allMemes) {
            if (tabStatus === 'My') {
                return allMemes
                    .filter(item => loggedUser.follow && loggedUser.follow.includes(item.creatorId))
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
            }

            if (tabStatus === 'Popular') {
                return [...allMemes]
                    .filter(item => item.likes && item.likes.length)
                    .sort((a, b) => new Date(b.likes.length) - new Date(a.likes.length))
            }
        }
    }, [allMemes, tabStatus])

    console.log('allMemes', memes)


    const onRefresh = () => {
        refetch()
    }


    if (isLoading) {
        return (  <ActivityIndicator size="large" color={COLORS.orange} /> )
    }

    // if (memes && !memes.length) {
    //     return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //         <Text>У вас покищо немає стрічки новин</Text>
    //         <Text>Почніть стежити за іншими користувачами</Text>
    //     </View>
    // }

        return (
            <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => setTabStatus('My')} style={{
                        ...styles.tabItem,
                        borderBottomWidth: tabStatus === 'My' ? 2 : null,
                    }}>
                        <Text style={styles.tabText}>Ваша стрічка</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTabStatus('Popular')} style={{
                        ...styles.tabItem,
                        borderBottomWidth: tabStatus === 'Popular' ? 2 : null
                    }}>
                        <Text style={styles.tabText}>Популярне</Text>
                    </TouchableOpacity>
                </View>
                {
                    memes && memes.length ?
                    <View style={{flex: 1}}>

                        <FlatList
                            keyExtractor={item => item.id}
                            data={memes}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            renderItem={({ item }) => (
                                <View style={{marginBottom: 30}}>
                                    <MemeCard meme={item} />
                                </View>
                            )}
                        />
                    </View>
                        :
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>У вас покищо немає стрічки новин</Text>
                            <Text>Почніть стежити за іншими користувачами</Text>
                        </View>
                }

            </>
        );

};

const styles = StyleSheet.create({

    tabItem: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: COLORS.orange,

    },

    tabActive: {
        borderBottomWidth: 2,
    },


    tabText: {
        color: COLORS.orange,
        fontSize: 16,
        fontWeight: "bold"
    }
});
