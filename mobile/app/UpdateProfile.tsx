import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import COLORS from './theme'
import { useAuth } from '@/context/AuthContext';

const UpdateProfile = () => {
    const params = useLocalSearchParams();
    const [fullName, setFullName] = useState(params.fullname ? String(params.fullname) : '');
    const [email, setEmail] = useState(params.email ? String(params.email) : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(params.profilePictureUrl ? String(params.profilePictureUrl) : null);
    const { updateProfile } = useAuth();
    const [updating, setUpdating] = useState(false);

    // Store initial values for change detection
    const initialFullName = params.fullname ? String(params.fullname) : '';
    const initialEmail = params.email ? String(params.email) : '';
    const initialImageUri = params.profilePictureUrl ? String(params.profilePictureUrl) : null;

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

    const handleUpdateProfile = async () => {

        try {
            setUpdating(true);
            const response = await updateProfile({
                fullname: fullName,
                email: email,
                profilePictureUrl: imageUri || undefined,
                ...(password ? { password } : {}),
            });
            if (!response.success) {
                alert(response.error || 'Profile update failed');
                setUpdating(false);
                return;
            }
            router.replace('/(tabs)');
            setUpdating(false);
        }
        catch (error) {
            console.error('Profile update failed:', error);
            setUpdating(false);
            return;
        }

    }

    // Check if any field has changed
    const isChanged =
        fullName !== initialFullName ||
        email !== initialEmail ||
        password.length > 0 ||
        confirmPassword.length > 0 ||
        imageUri !== initialImageUri;

    // Passwords must match if either is filled
    const passwordMismatch = (password.length > 0 || confirmPassword.length > 0) && password !== confirmPassword;

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 15 }}>
            {/* Logo */}
            <Text style={styles.heading}>Update Profile</Text>

            {/* Inputs */}
            <View>
                {/* Image Input */}
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                        {imageUri ? (
                            <View style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
                                <Image source={{ uri: imageUri }} style={styles.image} />
                                <Text style={{ position: 'absolute', bottom: 0, color: '#fff', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%', textAlign: 'center', lineHeight: 150 }}>Change Photo</Text>
                            </View>
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
                        value={fullName}
                        onChangeText={(name) => setFullName(name)}
                        placeholder="John Doe"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder="abc@example.com"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.label}>New Password (optional)</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            placeholder="Enter new password"
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
                <View>
                    <Text style={styles.label}>Confirm Password (optional)</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm new password"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                    />
                    {passwordMismatch && (
                        <Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>Passwords do not match</Text>
                    )}
                </View>
            </View>

            {/* Actions */}
            <View>
                <TouchableOpacity
                    onPress={handleUpdateProfile}
                    style={[styles.button, (!isChanged || passwordMismatch) && { opacity: 0.5 }]}
                    disabled={!isChanged || passwordMismatch}
                >
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>
                        {updating ? 'Updating...' : 'Update Profile'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)')}
                    style={[styles.button, { backgroundColor: COLORS.default, marginTop: 10 }]}
                >
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UpdateProfile

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
        borderColor: COLORS.accent,
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
        color: COLORS.accent,
        textAlign: 'left',
        width: 325
    },
    button: {
        backgroundColor: COLORS.accent,
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: 325,
    }
});