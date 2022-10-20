import Loading from "./components/Loading";
import * as Location from 'expo-location';
import React, { useEffect, useState, useCallback } from 'react';
import {Alert} from "react-native";
import {getUrl} from "./config";
import axios from "axios";
import Weather from "./components/Weather";


export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(data)
  const getWeather = useCallback(async (latitude,longitude) =>{
    const url = getUrl(latitude,longitude);
    try{
      const {data} = await axios.get(url)
      setData(data)
    } catch {
      Alert.alert('Сервер погоды не отвечает');
      console.log('Сервер погоды не отвечает');
    }
  },[])

  useEffect(() => {
    (async () => {
      try{
        const permission = await Location.getForegroundPermissionsAsync()
        if (permission.status !== 'granted') {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Нет доступа к геолокации');
            console.log('Нет доступа к геолокации');
            return;
          }
        }
        const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({});
        await getWeather(latitude,longitude)
        setIsLoading(false);
      } catch (e) {
        Alert.alert('Не могу определить местоположение');
        console.log(e)
      }
    })();
  }, []);


  return (<>
      {
        (isLoading || !data )? <Loading /> :
            <Weather
                temp={Math.round(data.main.temp)}
                weather={data?.weather[0]}
                name={data?.name}
                wind={data?.wind?.speed}
            />
      }
      </>
  );
}
