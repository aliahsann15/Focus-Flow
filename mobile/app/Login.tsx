import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import { useAuth } from '@/context/AuthContext';
import COLORS from './theme'

const Login = () => {
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            router.replace('/(tabs)');
        }
    }, [user]);

    const handleLogin = async () => {
        setIsLoading(true);

        const response = await login(email, password);

        if (!response.success) {
            Alert.alert('Login Failed', response.error || 'An error occurred during login.');
            setIsLoading(false);
            return;
        }
        router.replace('/(tabs)');
        setIsLoading(false);
    }



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
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="abc@example.com"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Enter your password"
                            style={[styles.input, { flex: 1 }]}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword((prev) => !prev)}
                            style={{ position: 'absolute', right: 10 }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <FontAwesome
                                name={showPassword ? 'eye-slash' : 'eye'}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Link href={"/"} style={styles.link}>Forgot Password?</Link>
            </View>

            {/* Actions */}
            <View>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>
                        {isLoading ? 'Logging In...' : 'Login'}
                    </Text>
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