import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";

export default function LayoutMain() {
    return (
        <Tabs>
            <Tabs.Screen 
            name="home"
            options={{
                title:"Inicio",
                tabBarIcon: ({ color, size, focused}) => <Entypo name="home" size={24} color="black" />
            }}/>
        </Tabs>

    )
}