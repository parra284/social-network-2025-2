import Form from '@/components/Form';
import ModalCamera from '@/components/ModalCamera';
import { AuthContext } from '@/contexts/AuthContext';
import { colors } from "@/styles/colors";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function EditProfile() {
  const router = useRouter();
  const { user, updateProfile } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(user.avatar_url);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || '',
  });

  const [cameraVisible, setCameraVisible] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectImage = () => {
    Alert.alert(
      'Cambiar foto de perfil',
      'Selecciona una opción',
      [
        { text: 'Cámara', onPress: () => setCameraVisible(true) },
        { text: 'Galería', onPress: () => pickImage() },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleCapture = (uri: string) => {
    setAvatar(uri);
  }; 

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    if (!formData.username.trim()) {
      Alert.alert('Error', 'El usuario es requerido');
      return;
    }

    if (formData.username.length < 3) {
      Alert.alert('Error', 'El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    try {
      await updateProfile({
        name: formData.name.trim(),
        username: formData.username.trim(),
        bio: formData.bio.trim() || undefined,
      }, avatar);

      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => router.back() }
      ]);

    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil. Intenta de nuevo.');
    }
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={selectImage} style={styles.avatarContainer}>
          <Image
            source={{uri: avatar}}
            style={styles.avatar}
          />
          <View style={styles.avatarOverlay}>
            <Ionicons name="camera" size={20} color={colors.neutral50} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectImage}>
          <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>
      </View>
      <Form 
        inputs={[
          {
            label: "Nombre",
            placeholder: "Tu nombre completo",
            value: formData.name,
            onChangeText: (value) => handleInputChange('name', value)
          },
          {
            label: "Usuario",
            placeholder: "Tu usuario",
            value: formData.username,
            onChangeText: (value) => handleInputChange('username', value)
          },
          {
            label: "Bigografía",
            placeholder: "Cuéntanos sobre ti...",
            value: formData.bio,
            onChangeText: (value) => handleInputChange('bio', value),
            multiline: true,
            minHeight: 80
          }
        ]}
        buttonLabel= "Guardar"
        onPress={handleSave}
      />
      {cameraVisible && (
        <ModalCamera 
        onClose={() => setCameraVisible(false)}
        onCapture={handleCapture}/>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral50,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary100,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.neutral800 + 'B0', // Black w/ opacity, or use alpha from your colors
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.neutral50,
  },
  changePhotoText: {
    fontSize: 16,
    color: colors.primary500,
    fontWeight: '500',
  },
  form: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary700,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary100,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: colors.neutral100,
    color: colors.neutral900,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  bioInput: {
    height: 80,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: colors.primary500,
    marginHorizontal: 20,
    paddingVertical: 10,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: colors.neutral50,
    fontWeight: '500',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  bottomPadding: {
    height: 50,
  },
})
