import { StyleSheet } from 'react-native';

const baseColor = '#e3f2fd'; // Azul claro para el fondo
const accentColor = '#1e88e5'; // Azul vibrante para botones y títulos
const darkAccentColor = '#1565c0'; // Azul oscuro para detalles y bordes
const lightGray = '#bbdefb'; // Azul claro para elementos secundarios
const textColor = '#0d47a1'; // Azul oscuro para el texto
const borderRadius = 12; // Radio de bordes más suaves

export const stylesCrearPedido = StyleSheet.create({
  // Estilos para los nuevos botones y lista de productos
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: baseColor,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  productoItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: lightGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  agregarBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  agregarTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productosTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPedido: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemTexto: {
    fontSize: 16,
  },
  guardarContainer: {
    marginTop: 20,
  },
  guardarBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  btnDeshabilitado: {
    backgroundColor: '#ddd',
  },
  guardarTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemInfoContainer: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    alignItems: 'center', // Alinea verticalmente
    justifyContent: 'space-between', // Alinea el texto a la izquierda y el botón a la derecha
    marginVertical: 5, // Espacio entre los elementos
  },
  eliminarBtn: {
    backgroundColor: '#FF0000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eliminarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export const stylesMenuUsuario = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColor, // Fondo celeste
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    
  },
  logo: {
    width: 250,
    height: 300,
    marginBottom: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkAccentColor, // Título en azul oscuro
    marginBottom: 30,
  },
  botonRedondeado: {
    backgroundColor: accentColor, // el azul vibrante que definiste
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: borderRadius, // <- Usa el mismo borderRadius de 24 por ejemplo
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Sombra suave
    shadowColor: darkAccentColor,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    marginVertical: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export const stylesPedidos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColor, // Fondo celeste
    padding: 20,
    color: darkAccentColor, // Texto azul oscuro
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    color: darkAccentColor, // Texto azul oscuro
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: darkAccentColor, // Título en azul oscuro
  },
  pedido: {
    backgroundColor: '#ffffff', // Fondo blanco para los pedidos
    marginBottom: 20,
    padding: 15,
    borderRadius: borderRadius,
    shadowColor: darkAccentColor, // Sombra azul oscuro
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#bbdefb', // Líneas divisorias en azul claro
  },
  celda: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: textColor, // Texto en azul oscuro
  },
  botonRedondeado: {
    backgroundColor: accentColor, // el azul vibrante que definiste
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: borderRadius, // <- Usa el mismo borderRadius de 24 por ejemplo
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Sombra suave
    shadowColor: darkAccentColor,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    marginVertical: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: baseColor, // Fondo celeste
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: darkAccentColor, // Título en azul oscuro
  },
  optionText: {
    padding: 12,
    backgroundColor: lightGray, // Fondo azul claro para las opciones
    marginVertical: 6,
    textAlign: 'center',
    borderRadius: 10,
    width: '80%',
    color: darkAccentColor, // Texto en azul oscuro
    fontWeight: '600',
    elevation: 2,
  },
});
export const stylesSeleccionarUsuario = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: darkAccentColor,
    marginBottom: 30,
  },
  userButton: {
    width: '100%',
    backgroundColor: lightGray,
    padding: 15,
    marginVertical: 10,
    borderRadius: borderRadius,
    alignItems: 'center',
    elevation: 2,
  },
  userText: {
    fontSize: 18,
    fontWeight: '600',
    color: textColor,
  },
});

