import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';
import { stylesSeleccionarUsuario as styles, stylesSeleccionarUsuario } from '../styles/styles'; 

export default function SeleccionarUsuario({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/usuarios`)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  const seleccionar = (usuarioId) => {
    navigation.navigate('MenuUsuario', { usuarioId });
  };

  return (
    <View style={stylesSeleccionarUsuario.container}>
      <Text style={stylesSeleccionarUsuario.title}>Seleccionar Usuario</Text>
      <FlatList
        data={usuarios.filter(u => u.id === 1 || u.id === 2)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={stylesSeleccionarUsuario.userButton} 
            onPress={() => seleccionar(item.id)}
          >
            <Text style={stylesSeleccionarUsuario.userText}>
              {item.nombre}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
