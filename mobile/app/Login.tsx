import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import COLORS from './theme'

const Login = () => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 40 }}>
            {/* Logo */}
            <Image source={images.logo} style={styles.image} />
            <Text style={styles.heading}>Welcome Back</Text>

            {/* Fields */}
            <View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="abc@example.com"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        style={styles.input}
                        secureTextEntry={true}
                    />
                </View>
                <Link href={"/"} style={styles.link}>Forgot Password?</Link>
            </View>

            {/* Actions */}
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Login</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 16 }}>
                    Don&apos;t have an account?
                    <Link href={"../Signup"} style={styles.link}> Sign Up</Link>
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: '600',
        marginTop: -40,
        marginBottom: 0,
        textAlign: 'center',
    },
    image: {
        marginTop: 50,
        width: '100%',
        height: 170,
        resizeMode: 'contain',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
        paddingHorizontal: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 1,
        width: 300,
    },
    link: {
        marginTop: 5,
        paddingHorizontal: 5,
        color: COLORS.accentColor,
        textAlign: 'left',
        width: 300
    },
    button: {
        backgroundColor: COLORS.accentColor,
        padding: 15,
        borderRadius: 5,
        marginTop: 30,
        width: 300,
    }
});