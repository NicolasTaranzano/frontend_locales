import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, Alert, Keyboard, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API_URL } from '../config';
import { stylesCrearPedido as styles } from '../styles/styles';

export default function CrearPedido({ route }) {
  const { usuarioId } = route.params;

  const [fecha, setFecha] = useState(new Date());
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [itemsPedido, setItemsPedido] = useState([]);
  const [query, setQuery] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/productos`)
      .then((res) => {
        setProductosDisponibles(res.data);
        if (res.data.length > 0) {
          setProductoSeleccionado(res.data[0].id);
        }
      })
      .catch((error) => console.error('Error al cargar productos:', error))
      .finally(() => setCargando(false));
  }, []);

  const agregarItem = () => {
    const producto = productosDisponibles.find(p => p.id === productoSeleccionado);
    if (!cantidad || !producto) return;

    // Reemplazar la coma por punto y convertir a número flotante
    const cantidadNumerica = parseFloat(cantidad.replace(',', '.'));
    if (isNaN(cantidadNumerica)) {
      Alert.alert('Error', 'Por favor ingresa una cantidad válida.');
      return;
    }

    setItemsPedido([...itemsPedido, { ...producto, cantidadpedida: cantidadNumerica }]);
    setCantidad('');
    setQuery(''); // Limpiar la búsqueda después de agregar el producto
    Keyboard.dismiss(); // Cerrar el teclado
  };

  const eliminarItem = (index) => {
    const nuevosItems = itemsPedido.filter((_, i) => i !== index);
    setItemsPedido(nuevosItems);
  };

  const confirmarGuardarPedido = () => {
    Alert.alert(
      'Confirmar Pedido',
      '¿Estás seguro de que deseas guardar este pedido?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: guardarPedido,
        },
      ],
      { cancelable: true }
    );
  };

  const guardarPedido = async () => {
    if (itemsPedido.length === 0) {
      Alert.alert('Error', 'Agregá al menos un producto al pedido.');
      return;
    }

    setGuardando(true);

    const payload = {
      fecha: fecha.toISOString().split('T')[0],
      usuario_id: usuarioId,
      productos: itemsPedido.map(item => ({
        producto_id: item.id,
        cantidadpedida: item.cantidadpedida, // Mantener el número decimal sin redondear
      }))
    };

    try {
      await axios.post(`${API_URL}/pedidos`, payload);
      Alert.alert('Éxito', 'Pedido guardado correctamente.');
      setItemsPedido([]);
    } catch (error) {
      console.error('Error al guardar pedido:', error);
      Alert.alert('Error', `No se pudo guardar el pedido: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setGuardando(false);
    }
  };

  const filterProducts = (query) => {
    return productosDisponibles.filter(producto =>
      producto.nombre.toLowerCase().includes(query.toLowerCase())
    );
  };

  if (cargando) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text>Fecha del pedido:</Text>
      <Button title={fecha.toDateString()} onPress={() => setMostrarPickerFecha(true)} />
      {mostrarPickerFecha && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || fecha;
            setMostrarPickerFecha(false);
            setFecha(currentDate);
          }}
        />
      )}

      <Text>Producto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar producto"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filterProducts(query)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productoItem}
            onPress={() => {
              setProductoSeleccionado(item.id);
              setQuery(item.nombre);
            }}
          >
            <Text style={styles.productoNombre}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />

      <Text>Cantidad:</Text>
      <TextInput
        keyboardType="decimal-pad" // Asegura que se pueda ingresar un número decimal
        value={cantidad}
        onChangeText={setCantidad}
        style={styles.input}
      />

      <TouchableOpacity style={styles.agregarBtn} onPress={agregarItem}>
        <Text style={styles.agregarTexto}>Agregar producto al pedido</Text>
      </TouchableOpacity>

      <Text style={styles.productosTitle}>Productos en el pedido:</Text>
      <FlatList
        data={itemsPedido}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemPedido}>
            <View style={styles.itemInfoContainer}>
              <Text style={styles.itemTexto}>{item.nombre} - {item.cantidadpedida.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.eliminarBtn}
                onPress={() => eliminarItem(index)}
              >
                <Text style={styles.eliminarTexto}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.guardarContainer}>
        <TouchableOpacity
          style={[styles.guardarBtn, guardando && styles.btnDeshabilitado]}
          onPress={confirmarGuardarPedido}
          disabled={guardando}
        >
          <Text style={styles.guardarTexto}>
            {guardando ? 'Guardando...' : 'Guardar Pedido'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
