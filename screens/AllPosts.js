import {MemeCard} from "./MemeCard/MemeCard";
import {Button, View} from "react-native";
import apiDB from "../apiDB";
import {useMemo, useState} from "react";
import {getCurrentUser} from "../store/auth/authSlice";
import {useGetCurrentUserQuery} from "../store/queries/dbApi";

//pollingInterval – дозволяє запиту автоматично перезавантажуватися через заданий інтервал, указаний у мілісекундах.
export function AllPosts () {

    const [status, setStatus] = useState(false)

    const { user, isLoading } = useGetCurrentUserQuery('wkq6Z8Da7eU92FePbQZiOz0nsBe2', {
        skip: !status,
        selectFromResult: ({data}) => ({
            user: data?.user
        })
    })

  const foo = () => {
      setStatus(status => !status)
  }

  console.log('PROBA', user)


  return (
    <>
      {/*<MemeCard />*/}
        <Button title={'Sciwjdcedofvodjvsd'} onPress={foo}/>
    </>
  )
}
