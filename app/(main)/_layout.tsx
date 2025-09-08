import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from "expo-router";

export default function LayoutMain() {
    return (
        <Tabs>
            <Tabs.Screen 
            name="home"
            options={{
                title:"Home",
                tabBarIcon: ({ color, size, focused }) => <AntDesign name="home" size={24} color="black" />
            }}/>

            <Tabs.Screen 
            name="profile"
            options={{
                title:"Profile",
                tabBarIcon: ({ color, size, focused }) => <AntDesign name="user" size={24} color="black" />
            }}/>
        </Tabs>
    )
}