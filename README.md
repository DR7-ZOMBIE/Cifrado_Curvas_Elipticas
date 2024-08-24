# ![Logo](https://via.placeholder.com/300x100.png?text=ECC+Cryptography)  
# **Cifrado y Descifrado con Criptografía de Curva Elíptica**

¡Bienvenido al proyecto de **Cifrado y Descifrado con Criptografía de Curva Elíptica**! Este repositorio contiene una implementación en JavaScript de un mecanismo básico de cifrado y descifrado utilizando Criptografía de Curva Elíptica (ECC). Este proyecto demuestra cómo ECC puede utilizarse para comunicación segura cifrando y descifrando mensajes mediante claves públicas y privadas derivadas de operaciones de curva elíptica.

## 📚 Tabla de Contenidos
- [🔍 Introducción](#-introducción)
- [✨ Características](#-características)
- [🚀 Cómo Empezar](#-cómo-empezar)
- [🛠️ Uso](#️-uso)
- [⚙️ Cómo Funciona](#️-cómo-funciona)
- [🔬 Detalles Técnicos](#-detalles-técnicos)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)
- [💡 Agradecimientos](#-agradecimientos)

## 🔍 **Introducción**

La **Criptografía de Curva Elíptica (ECC)** es una técnica potente y eficiente de criptografía de clave pública basada en la estructura algebraica de las curvas elípticas sobre campos finitos. ECC se utiliza ampliamente en los sistemas de cifrado modernos debido a su **menor tamaño de clave** y **mayor seguridad** en comparación con los métodos tradicionales como RSA.

Este proyecto implementa un mecanismo sencillo de cifrado y descifrado basado en ECC utilizando JavaScript. Incluye funciones para mapear caracteres ASCII a puntos en la curva elíptica, cifrar mensajes con una clave pública y descifrarlos usando una clave privada.

## ✨ **Características**

- **Operaciones de Curva Elíptica**: Implementación de suma de puntos, multiplicación escalar e inversa modular.
- **Cifrado Aleatorio**: Cada operación de cifrado es única gracias a un valor `k` generado aleatoriamente, garantizando la seguridad.
- **Mapeo ASCII a Puntos**: Conversión de caracteres a puntos en la curva elíptica para el cifrado.
- **Manejo de Errores**: Manejo robusto de errores y validación para asegurar que los puntos estén correctamente mapeados y que las operaciones sean válidas.
- **Interfaz de Usuario Interactiva**: Interfaz web sencilla para cifrar y descifrar mensajes.

## 🚀 **Cómo Empezar**

### **Requisitos Previos**

Para ejecutar este proyecto, necesitas conocimientos básicos de **JavaScript** y un **navegador web moderno**. No se requieren bibliotecas o frameworks adicionales.

### **Instalación**

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/DR7-ZOMBIE/Cifrado_Curvas_Elipticas
   cd Cifrado_Curvas_Elipticas
   
2. **Abre `index.html` en tu navegador web:**

   Simplemente abre el archivo `index.html` en tu navegador favorito para comenzar a usar la herramienta de cifrado y descifrado.

## 🛠️ **Uso**

### **Cifrar un Mensaje**

1. Ingresa el mensaje de texto plano en el cuadro de entrada.
2. Haz clic en el botón **"Cifrar Mensaje"**.
3. El texto cifrado se mostrará en la sección **"Texto Cifrado"**.

### **Descifrar un Mensaje**

1. Ingresa la clave privada del destinatario en el cuadro de entrada proporcionado.
2. Haz clic en el botón **"Descifrar Mensaje"**.
3. El mensaje descifrado aparecerá en la sección **"Mensaje Descifrado"**.

## ⚙️ **Cómo Funciona**

El proyecto utiliza las propiedades matemáticas de las curvas elípticas para realizar un cifrado y descifrado seguro:

1. **Generación de Claves**: Genera un par de claves pública y privada utilizando la multiplicación de curvas elípticas.
2. **Mapeo de Mensajes**: Mapea cada carácter del texto plano a un punto en la curva elíptica.
3. **Cifrado**: Cifra cada punto utilizando un valor aleatorio `k` y la clave pública del destinatario.
4. **Descifrado**: Utiliza la clave privada para descifrar el texto cifrado de vuelta al mensaje original.

## 🔬 **Detalles Técnicos**

### **Parámetros de la Curva Elíptica**

- **Ecuación de la Curva**: \(y^2 \equiv x^3 + ax + b \mod p\)
- **Parámetros de la Curva**:
  - \(a = 2\)
  - \(b = 3\)
  - \(p = 97\) (un número primo que define el campo finito)
  - **Punto Generador (G)**: \([3, 6]\)

### **Operaciones Clave**

- **Suma de Puntos**: Suma de dos puntos en la curva elíptica.
- **Multiplicación Escalar**: Multiplicación de un punto por un escalar (entero).
- **Inversa Modular**: Cálculo de la inversa de un número módulo `p`.

### **Características de Seguridad**

- **Cifrado Aleatorio**: Cada operación de cifrado utiliza un valor aleatorio `k`, asegurando que el cifrado del mismo mensaje produce textos cifrados diferentes.
- **Validación**: Asegura que todos los puntos sean válidos y estén en la curva antes de proceder con las operaciones.

## 🤝 **Contribuciones**

¡Las contribuciones son bienvenidas! Si tienes sugerencias de mejoras o quieres agregar nuevas características, no dudes en hacer un **fork** del repositorio y enviar un **pull request**.

### **Cómo Contribuir**

1. **Haz un fork del proyecto**
2. Crea tu rama de características (`git checkout -b feature/CaracteristicaAsombrosa`)
3. Haz commit de tus cambios (`git commit -m 'Agrega una Caracteristica Asombrosa'`)
4. Haz push a la rama (`git push origin feature/CaracteristicaAsombrosa`)
5. Abre un **Pull Request**

## 📄 **Licencia**

Distribuido bajo la Licencia MIT. Ver el archivo `LICENSE` para más información.

## 💡 **Agradecimientos**

- Este proyecto se inspiró en la necesidad de métodos de comunicación seguros utilizando criptografía moderna.
- Agradecimientos especiales a los colaboradores y a la comunidad de código abierto por proporcionar recursos valiosos y apoyo.

---

¡Gracias por visitar este proyecto! Si encuentras útil esta herramienta o tienes alguna sugerencia, no dudes en dejar tus comentarios o contribuir. ¡Esperamos que disfrutes usando esta herramienta de cifrado y descifrado de curva elíptica!
