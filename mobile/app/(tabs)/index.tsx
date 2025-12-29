import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../theme";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";

export default function Index() {
  const [userData, setUserData] = useState<any>(null);
  const { user, token, logout } = useAuth();
  const userid = user?._id;
  const API_BASE_URL = process.env.BACKEND_API_URL || 'http://192.168.100.194:5000/api';

  useEffect(() => {
    if (!token || !userid) {
      setUserData(null);
      return;
    }

    const fetchUserData = async () => {
      const response = await fetch(`${API_BASE_URL}/users/${userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch user data');
        return;
      }

      const data = await response.json();
      setUserData(data);
    }
    fetchUserData();
  }, [API_BASE_URL, userid, token]); // @use

  const handelLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => { },
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            const response = await logout();
            if (response.success) {
              Alert.alert("Logged out", "You have been logged out successfully.");
              router.replace("/Login");
            } else {
              Alert.alert("Logout Failed", response.error || "An error occurred during logout.");
            }
          },
        },
      ],
      { cancelable: true }
    );
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", minHeight: "100%", paddingHorizontal: 20 }} contentContainerStyle={{ alignItems: "flex-start", gap: 20, paddingVertical: 20 }}>

        {/* Profile Pic & Name, Email */}
        <View style={[styles.card, { position: "relative", width: "100%" }]}>
          {/* Edit Profile Icon (top-right) */}
          <View style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
            <TouchableOpacity onPress={() => {
                router.replace({
                  pathname: "/UpdateProfile",
                  params: {
                    fullname: userData?.fullname,
                    email: userData?.email,
                    profilePictureUrl: userData?.profilePictureUrl || "",
                  },
                });
              }}
              hitSlop={10}>
              <FontAwesome name="pencil" size={24} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
          {/* Logout Icon (bottom-right) */}
          <View style={{ position: "absolute", bottom: 10, right: 10, zIndex: 2 }}>
            <TouchableOpacity onPress={() => handelLogout()} hitSlop={10}>
              <MaterialIcons name="logout" size={24} color={COLORS.danger} />
            </TouchableOpacity>
          </View>
          {/*  */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10, paddingVertical: 10 }}>
            <Image source={userData?.profilePictureUrl ? { uri: userData.profilePictureUrl } : images.defaultProfile} style={styles.profileImage} />
            <View style={{ maxWidth: "70%" }}>
              <Text style={{ fontSize: 22, fontWeight: "600" }}>Hi! {userData?.fullname}</Text>
              <Text>{userData?.email}</Text>
            </View>
          </View>
        </View>

        {/* Home Dashboard Cards & Widgets */}

        {/* Streak Counter Widget */}
        <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f9f6e7' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="fire" size={24} color="#ff9800" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Streak</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ff9800' }}>5 days</Text>
        </View>

        {/* Today's Focus Time Card */}
        <View style={styles.card}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 6 }}>Today&apos;s Focus Time</Text>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: COLORS.accent }}>1h 45m</Text>
          {/* Daily Progress Bar Widget */}
          <View style={{ marginTop: 10, marginBottom: 4 }}>
            <View style={{ height: 12, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden' }}>
              <View style={{ width: '70%', height: '100%', backgroundColor: COLORS.accent, borderRadius: 6 }} />
            </View>
            <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>70% of daily goal</Text>
          </View>
        </View>

        {/* Active Task Summary Card */}
        <View style={[styles.card, { minHeight: 200 }]}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 6 }}>Active Task Summary</Text>
          <Text style={{ fontSize: 16, color: COLORS.accent, marginBottom: 2 }}>Task: Deep Work Session</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>Time Remaining: 25m</Text>
        </View>

        {/* Quick Start Focus Button Card */}
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={
            [styles.card,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.accent, padding: 12 }]
          } onPress={() => { /* TODO: Start focus session */ }}>
            <FontAwesome name="play-circle" size={28} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
              Quick Start Focus
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.cardBg,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
