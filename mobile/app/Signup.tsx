import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import COLORS from './theme'

const Signup = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        // Ask for permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions!');
            return;
        }
        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 40 }}>
            {/* Logo */}
            <Text style={styles.heading}>Create Account</Text>

            {/* Inputs */}
            <View>
                {/* Image Input */}
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>Add Photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        placeholder="John Doe"
                        style={styles.input}
                    />
                </View>
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
            </View>

            {/* Actions */}
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center' }}>
                    Already have an account?
                    <Link href={"../Login"} style={styles.link}> Login</Link>
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        fontWeight: '600',
        marginTop: 50,
        marginBottom: 0,
        textAlign: 'center',
    },
    imageWrapper: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholder: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e293b',
    },
    placeholderText: {
        color: '#fffafa',
        fontSize: 14,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15,
        paddingHorizontal: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 1,
        width: 325,
    },
    link: {
        marginTop: 5,
        paddingHorizontal: 5,
        color: COLORS.accentColor,
        textAlign: 'left',
        width: 325
    },
    button: {
        backgroundColor: COLORS.accentColor,
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: 325,
    }
});