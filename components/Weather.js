import React,{useMemo} from 'react'
import {StyleSheet,Text,View,Image} from 'react-native'
import * as PropTypes from "prop-types";
import { LinearGradient } from 'expo-linear-gradient';
import {getWeather} from "../config";


const Weather = ({temp,weather,name,wind}) =>{
    const getMapped = useMemo(()=>getWeather(weather.id),[weather])
    return (
        <LinearGradient
            colors={getMapped.gradient}
            style={styles.container}
            >
            <View style={styles.halfContainer}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                    }}
                />
                <Text style={styles.temp}>{temp>0 && '+'}{temp}°</Text>
            </View>
            <View style={{...styles.halfContainer, ...styles.textContainer}}>
                <Text style={styles.subTitle}>Местоположение: {name}</Text>
                <Text style={styles.title}>{getMapped.title}</Text>
                <Text style={styles.subTitle}>Скорость ветра: {wind} м/с</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    halfContainer:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 120,
        height: 90,

    },
    temp:{
        fontSize:46,
        color: 'white',
    },
    title:{
        color: 'white',
        fontSize:44,
        fontWeight:"300",
        marginBottom: 20,
        marginTop: 20,
    },
    subTitle:{
        color: 'white',
        fontWeight:"600",
        fontSize:24,
    },
    textContainer:{
       paddingHorizontal:20,
       alignItems: 'flex-start',
    },
})

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    weather: PropTypes.shape({
        id: PropTypes.number.isRequired,
        main: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    }),
    name:PropTypes.string.isRequired,
    wind: PropTypes.number.isRequired,
}
export default Weather;
