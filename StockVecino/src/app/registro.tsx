import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegistroScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [perfil, setPerfil] = useState('Cliente'); // Por defecto es Cliente
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      {/* Campos de Texto */}
      <TextInput style={styles.input} placeholder="Nombre completo" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

      {/* Selección de Perfil */}
      <Text style={styles.label}>¿Cómo usarás la app?</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          style={[styles.radioBtn, perfil === 'Cliente' && styles.radioBtnActive]} 
          onPress={() => setPerfil('Cliente')}>
          <Text style={[styles.radioText, perfil === 'Cliente' && styles.radioTextActive]}>Soy Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.radioBtn, perfil === 'Tendero' && styles.radioBtnActive]} 
          onPress={() => setPerfil('Tendero')}>
          <Text style={[styles.radioText, perfil === 'Tendero' && styles.radioTextActive]}>Soy Tendero</Text>
        </TouchableOpacity>
      </View>

      {/* Aviso de Privacidad */}
      <View style={styles.privacidadContainer}>
        <Switch value={aceptaPrivacidad} onValueChange={setAceptaPrivacidad} />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.linkPrivacidad}>He leído y acepto el Aviso de Privacidad</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Registrarme */}
      <TouchableOpacity 
        style={[styles.button, !aceptaPrivacidad && styles.buttonDisabled]} 
        disabled={!aceptaPrivacidad}
        onPress={() => console.log('Registro exitoso como:', perfil)}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>

      {/* Modal del Aviso de Privacidad */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aviso de Privacidad</Text>
            <Text style={styles.modalText}>
              De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, StockVecino utilizará su nombre y correo única y exclusivamente para crear su perfil. Sus datos no serán vendidos ni compartidos con terceros sin su consentimiento previo.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); setAceptaPrivacidad(true); }}>
              <Text style={styles.buttonText}>Aceptar y Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#1a1a1a' },
  input: { borderWidth: 1, borderColor: '#e0e0e0', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#fafafa' },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 8, marginBottom: 12, color: '#333' },
  radioContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  radioBtn: { flex: 1, padding: 14, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  radioBtnActive: { backgroundColor: '#0056d2', borderColor: '#0056d2' },
  radioText: { fontSize: 16, color: '#666' },
  radioTextActive: { color: '#ffffff', fontWeight: 'bold' },
  privacidadContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingHorizontal: 4 },
  linkPrivacidad: { color: '#0056d2', fontSize: 14, marginLeft: 12, fontWeight: '500', textDecorationLine: 'underline' },
  button: { backgroundColor: '#0056d2', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#a0c4ff' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  linkText: { marginTop: 24, textAlign: 'center', color: '#0056d2', fontSize: 15, fontWeight: '500' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 24, borderRadius: 16, width: '85%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  modalText: { fontSize: 15, color: '#444', marginBottom: 24, lineHeight: 22 },
  modalButton: { backgroundColor: '#0056d2', padding: 14, borderRadius: 12, alignItems: 'center' }
});