export const API_KEY = 'e45868bda62b1105d22a83dd4554d863';
export const getUrl = (lat,lon,key = API_KEY)=>{
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
}

export const getWeather = (code) =>{
    switch(true) {
        case (code>=200 && code<300):{
            return {title: 'Гроза', gradient:['#141E30', '#243B55']};
        }
        case (code>=300 && code<400):{
            return {title: 'Морось', gradient:['#3a7bd5', '#3a6073']};
        }
        case (code>=500 && code<600):{
            return {title: 'Дождь', gradient:['#000046','#1CB5E0']};
        }
        case (code>=600 && code<700):{
            return {title: 'Снег', gradient:['#83a4d4','#b6fbff']};
        }
        case (code>=700 && code<800):{
            return {title: 'Туман', gradient:['#B79891', '#94716B']};
        }
        case (code===800):{
            return {title: 'Чистое небо', gradient:['#56CCF2', '#2F80ED']};
        }
        case code>800 && code<900:{
            return {title: 'Облака', gradient:['#757F9A', '#D7DDE8']};
        }
        default: return {title: 'Чистое небо', gradient:['#56CCF2', '#2F80ED']};
    }
}

