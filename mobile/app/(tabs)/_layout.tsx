
import { Tabs } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


type FontAwesomeIconName =
    | "tasks"
    | "line-chart"
    | "home"
    | "fire"
    | "bell";

type TabConfig = {
    name: string;
    label: string;
    icon: FontAwesomeIconName;
};

const TAB_CONFIG: TabConfig[] = [
    { name: 'TaskPlanner', label: 'Tasks', icon: 'tasks' },
    { name: 'Analytics', label: 'Analytics', icon: 'line-chart' },
    { name: 'index', label: 'Home', icon: 'home' },
    { name: 'Streaks', label: 'Streaks', icon: 'fire' },
    { name: 'DistractionTracking', label: 'Distractions', icon: 'bell' },
];

function CustomTabBar({ state, navigation }: any) {
    return (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabBar}>
                {state.routes.map((route: any, idx: number) => {
                    const config = TAB_CONFIG.find(t => t.name === route.name);
                    const isFocused = state.index === idx;
                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            onPress={() => navigation.navigate(route.name)}
                            style={{ minWidth: 70, position: 'relative' }}
                        >
                            <View style={[styles.tabBorder, isFocused && styles.activeTabBorder]}>
                                <View
                                    style={[styles.tabItem, isFocused && styles.activeTab]}
                                >
                                    <FontAwesome
                                        name={config?.icon || 'circle'}
                                        size={isFocused ? 30 : 24}
                                        color="#fff"
                                        style={isFocused ? styles.activeIcon : undefined}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
            }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="TaskPlanner" />
            <Tabs.Screen name="Analytics" />
            <Tabs.Screen name="index" />
            <Tabs.Screen name="Streaks" />
            <Tabs.Screen name="DistractionTracking" />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: Platform.OS === 'ios' ? 30 : 0,
        alignItems: 'center',
        zIndex: 10,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#2b1e40ff',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 8,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginHorizontal: 2,
        backgroundColor: '#2b1e40ff',
    },
    tabBorder: {
        backgroundColor: 'transparent',
        borderRadius: "100%",
    },
    activeTab: {
        paddingVertical: 16,
        paddingHorizontal: 15,
        backgroundColor: '#6200ff',
    },
    activeTabBorder: {
        backgroundColor: '#2b1e40ff',
        borderRadius: 50,
        width: 95,
        position: 'absolute',
        top: -30,
        left: -10,
        zIndex: -1,
        padding: 13,
    },
    tabLabel: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 12,
    },
    activeLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    activeIcon: {
        color: '#fff',
    },
});
