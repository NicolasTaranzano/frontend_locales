import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeleccionarUsuario from './components/SeleccionarUsuario';
import MenuUsuario from './components/MenuUsuario';
import Pedidos from './components/Pedidos'; // 👈 Asegurate que este archivo exista
import CrearPedido from './components/CrearPedido';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SeleccionarUsuario">
        <Stack.Screen name="SeleccionarUsuario" component={SeleccionarUsuario} />
        <Stack.Screen name="MenuUsuario" component={MenuUsuario} />
        <Stack.Screen name="Pedidos" component={Pedidos} /> 
        <Stack.Screen name= "CrearPedido" component={CrearPedido}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
