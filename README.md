Cifrado y Descifrado con Criptografía de Curva Elíptica
¡Bienvenido al proyecto de Cifrado y Descifrado con Criptografía de Curva Elíptica! Este repositorio contiene una implementación en JavaScript de un mecanismo básico de cifrado y descifrado utilizando Criptografía de Curva Elíptica (ECC). Este proyecto demuestra cómo se puede utilizar ECC para la comunicación segura cifrando y descifrando mensajes mediante claves públicas y privadas derivadas de operaciones de curva elíptica.

Tabla de Contenidos
Introducción
Características
Cómo Empezar
Uso
Cómo Funciona
Detalles Técnicos
Contribuciones
Licencia
Agradecimientos
Introducción
La Criptografía de Curva Elíptica (ECC) es una técnica potente y eficiente de criptografía de clave pública basada en la estructura algebraica de las curvas elípticas sobre campos finitos. ECC se utiliza ampliamente en los sistemas de cifrado modernos debido a su tamaño de clave más pequeño y mayor seguridad en comparación con los métodos tradicionales como RSA.

Este proyecto implementa un mecanismo sencillo de cifrado y descifrado basado en ECC en JavaScript. Incluye funciones para mapear caracteres ASCII a puntos en la curva elíptica, cifrar mensajes con una clave pública y descifrarlos usando una clave privada.

Características
Operaciones de Curva Elíptica: Implementación de suma de puntos, multiplicación escalar e inversa modular.
Cifrado Aleatorio: Cada operación de cifrado es única gracias a un valor k generado aleatoriamente, garantizando la seguridad.
Mapeo ASCII a Puntos: Conversión de caracteres a puntos en la curva elíptica para el cifrado.
Manejo de Errores: Manejo robusto de errores y validación para asegurar que los puntos estén correctamente mapeados y que las operaciones sean válidas.
Interfaz de Usuario Interactiva: Interfaz web sencilla para cifrar y descifrar mensajes.
Cómo Empezar
Requisitos Previos
Para ejecutar este proyecto, necesitas conocimientos básicos de JavaScript y un navegador web moderno. No se requieren bibliotecas o frameworks adicionales.

Instalación
Clona el repositorio:

bash
Copiar código
git clone https://github.com/tuusuario/elliptic-curve-cryptography.git
cd elliptic-curve-cryptography
Abre index.html en tu navegador web: Simplemente abre el archivo index.html en tu navegador favorito para empezar a usar la herramienta de cifrado y descifrado.

Uso
Cifrar un Mensaje
Ingresa el mensaje de texto plano en el cuadro de entrada.
Haz clic en el botón "Cifrar Mensaje".
El texto cifrado se mostrará en la sección "Texto Cifrado".
Descifrar un Mensaje
Ingresa la clave privada del destinatario en el cuadro de entrada proporcionado.
Haz clic en el botón "Descifrar Mensaje".
El mensaje descifrado aparecerá en la sección "Mensaje Descifrado".
Cómo Funciona
El proyecto utiliza las propiedades matemáticas de las curvas elípticas para realizar un cifrado y descifrado seguro:

Generación de Claves: Genera un par de claves pública y privada utilizando la multiplicación de curvas elípticas.
Mapeo de Mensajes: Mapea cada carácter del texto plano a un punto en la curva elíptica.
Cifrado: Cifra cada punto utilizando un valor aleatorio k y la clave pública del destinatario.
Descifrado: Utiliza la clave privada para descifrar el texto cifrado de vuelta al mensaje original.
Detalles Técnicos
Parámetros de la Curva Elíptica
Ecuación de la Curva: 
𝑦
2
≡
𝑥
3
+
𝑎
𝑥
+
𝑏
m
o
d
 
 
𝑝
y 
2
 ≡x 
3
 +ax+bmodp
Parámetros de la Curva:
𝑎
=
2
a=2
𝑏
=
3
b=3
𝑝
=
97
p=97 (un número primo que define el campo finito)
Punto Generador (G): 
[
3
,
6
]
[3,6]
Operaciones Clave
Suma de Puntos: Suma de dos puntos en la curva elíptica.
Multiplicación Escalar: Multiplicación de un punto por un escalar (entero).
Inversa Modular: Cálculo de la inversa de un número módulo p.
Características de Seguridad
Cifrado Aleatorio: Cada operación de cifrado utiliza un valor aleatorio k, asegurando que el cifrado del mismo mensaje produce textos cifrados diferentes.
Validación: Asegura que todos los puntos sean válidos y estén en la curva antes de proceder con las operaciones.
Contribuciones
¡Las contribuciones son bienvenidas! Si tienes sugerencias de mejoras o quieres agregar nuevas características, no dudes en hacer un fork del repositorio y enviar un pull request.

Haz un fork del proyecto
Crea tu rama de características (git checkout -b feature/CaracteristicaAsombrosa)
Haz commit de tus cambios (git commit -m 'Agrega una Caracteristica Asombrosa')
Haz push a la rama (git push origin feature/CaracteristicaAsombrosa)
Abre un Pull Request
Licencia
Distribuido bajo la Licencia MIT. Ver LICENSE para más información.

Agradecimientos
Este proyecto se inspiró en la necesidad de métodos de comunicación seguros utilizando criptografía moderna.
Agradecimientos especiales a los colaboradores y a la comunidad de código abierto por proporcionar recursos valiosos y apoyo.
