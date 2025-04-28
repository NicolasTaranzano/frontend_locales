import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Button, Image } from 'react-native'; // Importás Image
import { stylesMenuUsuario as styles } from '../styles/styles';
import axios from 'axios';
import { API_URL } from '../config';

export default function MenuUsuario({ route, navigation }) {
  const { usuarioId } = route.params;
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/${usuarioId}`);
        setNombreUsuario(response.data.nombre);
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  // Función para navegar a la pantalla de Crear Pedido
  const handleCrearPedido = () => {
    navigation.navigate('CrearPedido', { usuarioId }); // Navega directamente a Crear Pedido
  };

  // Función para navegar a la pantalla de Ver Pedidos
  const handleVerPedidos = () => {
    navigation.navigate('Pedidos', { usuarioId }); // Navega directamente a Ver Pedidos
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logoFCA.png')} // Asegurate que exista esta imagen
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.titulo}>
        {nombreUsuario || 'Cargando...'}
      </Text>
      <TouchableOpacity style={styles.botonRedondeado} onPress={handleVerPedidos}>
        <Text style={styles.textoBoton}>Ver pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonRedondeado} onPress={handleCrearPedido}>
        <Text style={styles.textoBoton}>Crear Nuevo Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}
