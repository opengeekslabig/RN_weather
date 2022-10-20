import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Weather from "./Weather";

const Tab = createMaterialTopTabNavigator();

export default function Navigator({weathers}){
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={weathers[0].time}
                >{
                    weathers.map(el=>(
                        <Tab.Screen
                            key={el.time}
                            name={el.time}
                            options={{
                                tabBarShowLabel: false,
                                tabBarScrollEnabled: false,
                                tabBarStyle: { display: 'none' },
                            }}
                        >
                            {(props) => <Weather {...props}
                                    temp={el.temp}
                                    weather={el.weather}
                                    name={el.name}
                                    wind={el.wind}
                                    time={el.time}
                                    />}
                        </Tab.Screen>
                    ))
                }</Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}
