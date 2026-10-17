import { useRouter } from 'expo-router'; // Herramienta de navegación moderna de Expo
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Lo usamos para cambiar de pantalla

  const iniciarSesion = async () => {
    try {
      // Usa la misma IP que te funcionó en el registro
      const respuesta = await fetch('http://192.168.100.39:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        Alert.alert('¡Bienvenido!', `Hola ${datos.nombre}, entraste como ${datos.perfil}`);
        // Aquí después agregaremos router.push('/home') para ir a la tienda
      } else {
        Alert.alert('Error', datos.error);
      }
    } catch (error) {
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StockVecino</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/registro')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 48, textAlign: 'center', color: '#1a1a1a' },
  input: { borderWidth: 1, borderColor: '#e0e0e0', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#fafafa' },
  button: { backgroundColor: '#0056d2', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  linkText: { marginTop: 24, textAlign: 'center', color: '#0056d2', fontSize: 15, fontWeight: '500' }
});