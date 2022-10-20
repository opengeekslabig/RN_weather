import Loading from "./src/screens/Loading";
import * as Location from 'expo-location';
import React, { useEffect, useState, useCallback } from 'react';
import {Alert} from "react-native";
import {getManyUrl, getUrl} from "./config";
import axios from "axios";
import Weather from "./src/screens/Weather";
import {mapMany} from "./src/utils";
import Navigator from "./src/screens/NavigatorScreen";


export default function App() {
  const [data, setData] = useState(null);
  const [manyData, setManyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWeather = useCallback(async (latitude,longitude) =>{
    const url = getUrl(latitude,longitude);
    const urlMany = getManyUrl(latitude,longitude,24);
    try{
      const {data} = await axios.get(url)
      const {data:{list,city}} = await axios.get(urlMany)
      setManyData(mapMany(list,city.name))
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
        (isLoading || !manyData.length )? <Loading /> :
            <Navigator weathers={manyData}/>
            // <Weather
            //     temp={Math.round(data.main.temp)}
            //     weather={data?.weather[0]}
            //     name={data?.name}
            //     wind={data?.wind?.speed}
            // />
      }
      </>
  );
}
