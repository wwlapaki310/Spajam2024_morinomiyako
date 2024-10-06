import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createContext, useContext, useState } from 'react';
import { AnimationDef } from "@/components/AnimatedCircle";


const _animationDef: AnimationDef = {
  duration: 5000, // 5秒
  music: 'https://example.com/music.mp3',
  major: [
    { position: 0, hue: 0 },   // 赤
    { position: 0.5, hue: 120 }, // 緑
    { position: 1, hue: 240 }  // 青
  ],
  minor: [
    { position: 0, hue: 60 },  // 黄
    { position: 1, hue: 300 }  // 紫
  ]
};

export const DataContext = createContext(_animationDef);
export const SetDataContext = createContext((val: AnimationDef | ((prev: AnimationDef) => AnimationDef)) => { });

export const TabBarHiddenContext = createContext(false);
export const SetTabBarHiddenContext = createContext((flag: boolean) => { });

export default function TabLayout() {

  const [animationDef, setAnimationDef] = useState<AnimationDef>(_animationDef);
  const [tabBarHidden, setTabBarHidden] = useState(false);

  return (
    <DataContext.Provider value={animationDef}>
      <SetDataContext.Provider value={setAnimationDef}>
        <TabBarHiddenContext.Provider value={tabBarHidden}>
          <SetTabBarHiddenContext.Provider value={setTabBarHidden}>
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#ffd33d",
                headerStyle: {
                  backgroundColor: "#25292e",
                },
                headerShadowVisible: false,
                headerTintColor: "#fff",
                tabBarStyle: {
                  backgroundColor: "#25292e",
                  display: tabBarHidden ? "none" : "flex",
                },
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: "Home",
                  tabBarIcon: ({ color, focused }) => (
                    <Ionicons
                      name={focused ? "home-sharp" : "home-outline"}
                      color={color}
                      size={24}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="light"
                options={{
                  title: "Light",
                  tabBarIcon: ({ color, focused }) => (
                    /* @tutinfo */
                    <Ionicons
                      name={focused ? "bulb-sharp" : "bulb-outline"}
                      color={color}
                      size={24}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="howtouse"
                options={{
                  title: "How to use",
                  tabBarIcon: ({ color, focused }) => (
                    /* @tutinfo */
                    <Ionicons
                      name={focused ? "help-circle" : "help-circle-outline"}
                      color={color}
                      size={24}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="settings"
                options={{
                  title: "Settings",
                  tabBarIcon: ({ color, focused }) => (
                    /* @tutinfo */
                    <Ionicons
                      name={focused ? "settings-sharp" : "settings-outline"}
                      color={color}
                      size={24}
                    />
                  ),
                }}
              />
            </Tabs>
          </SetTabBarHiddenContext.Provider>
        </TabBarHiddenContext.Provider>
      </SetDataContext.Provider>
    </DataContext.Provider>
  );
}

