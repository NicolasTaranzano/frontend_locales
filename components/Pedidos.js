import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { API_URL } from '../config';
import { stylesPedidos as styles } from '../styles/styles';

export default function Pedidos({ route }) {
  const { usuarioId } = route.params;
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarRecibidos, setMostrarRecibidos] = useState(false); // 👈 NUEVO

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch(`${API_URL}/pedidos/usuario/${usuarioId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const pedidosOrdenados = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          setPedidos(pedidosOrdenados);
        } else {
          console.warn('La respuesta no es un arreglo válido:', data);
          setPedidos([]);
        }
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [usuarioId]);

  const handleSeleccionarPedido = (pedido) => {
    setPedidoSeleccionado(pedido.id === pedidoSeleccionado?.id ? null : pedido);
  };

  const handleCambiarEstado = (pedidoId) => {
    Alert.alert(
      'Confirmar acción',
      '¿Estás seguro de que deseas marcar este pedido como recibido?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
        { text: 'Sí', onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/pedidos/${pedidoId}/recibir`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: 'recibido' }),
              });

              if (response.ok) {
                const updatedPedidos = pedidos.map((p) =>
                  p.id === pedidoId ? { ...p, estado: 'recibido' } : p
                );
                setPedidos(updatedPedidos);
                if (pedidoSeleccionado?.id === pedidoId) {
                  setPedidoSeleccionado({ ...pedidoSeleccionado, estado: 'recibido' });
                }
              } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Desconocido'}`);
              }
            } catch (error) {
              console.error('Error al cambiar estado:', error);
            }
          }
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  if (pedidos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay pedidos aún para este usuario.</Text>
      </View>
    );
  }

  // 👇 NUEVO: filtramos qué pedidos mostrar
  const pedidosParaMostrar = pedidos.filter(p => 
    mostrarRecibidos ? p.estado === 'recibido' : (p.estado === 'pendiente' || p.estado === 'enviado')
  );

  const renderProducto = (producto) => (
    <View style={styles.fila} key={producto.id}>
      <Text style={styles.celda}>{producto.nombre}</Text>
      <Text style={styles.celda}>{producto.PedidoProducto.cantidadpedida}</Text>
      <Text style={styles.celda}>{producto.PedidoProducto.cantidadenviada || 'Pendiente'}</Text>
    </View>
  );

  const obtenerEstiloBorde = (estado) => {
    switch (estado) {
      case 'pendiente':
        return { borderColor: 'orange', borderWidth: 2 };
      case 'enviado':
        return { borderColor: 'blue', borderWidth: 2 };
      case 'recibido':
        return { borderColor: 'green', borderWidth: 2 };
      default:
        return { borderColor: 'gray', borderWidth: 2 };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedidos del usuario {usuarioId}</Text>

      {/* 👇 Botón para alternar entre activos y recibidos */}
      <TouchableOpacity
        style={styles.botonRedondeado}
        onPress={() => setMostrarRecibidos(!mostrarRecibidos)}
      >
        <Text style={styles.textoBoton}>
          {mostrarRecibidos ? "Ver Pedidos Activos" : "Ver Pedidos Recibidos"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={pedidosParaMostrar}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.pedido, obtenerEstiloBorde(item.estado)]}>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Estado: {item.estado}</Text>
            <TouchableOpacity
              style={styles.botonRedondeado}
              onPress={() => handleSeleccionarPedido(item)}
            >
              <Text style={styles.textoBoton}>
                {pedidoSeleccionado?.id === item.id ? 'Ocultar productos' : 'Ver productos'}
              </Text>
            </TouchableOpacity>
            {pedidoSeleccionado?.id === item.id && (
              <ScrollView style={styles.tabla}>
                <View style={styles.fila}>
                  <Text style={styles.celda}>Producto</Text>
                  <Text style={styles.celda}>Cantidad Pedida</Text>
                  <Text style={styles.celda}>Cantidad Enviada</Text>
                </View>
                {item.Productos?.map(renderProducto)}
              </ScrollView>
            )}
            {/* Solo mostrar botón "Marcar como recibido" si no está recibido */}
            {item.estado !== 'recibido' && !mostrarRecibidos && (
              <TouchableOpacity
                style={styles.botonRedondeado}
                onPress={() => handleCambiarEstado(item.id)}
              >
                <Text style={styles.textoBoton}>Marcar como recibido</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}
