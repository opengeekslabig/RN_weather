export const mapMany = (weatherArr,city)=>{
    return weatherArr.map(el=>({
        temp:Math.round(el?.main?.temp),
        weather:el?.weather[0],
        name:city,
        wind:el?.wind?.speed,
        time:dateFormat(el?.dt)
    }))
}

const  weekDay = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'];

export const dateFormat = (string) =>{
    const d= new Date(string* 1000)
    return weekDay[(d.getDay() - 1)>=0 ? (d.getDay() - 1) : 6] +
        ' ' +
        d.getDate() +
        ' ' +
        months[d.getMonth()]+ ' ' +
        [d.getUTCHours(),'00'].join(':')
}
