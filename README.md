# Documentación de la API

## **Autenticación**
---

### **Iniciar sesión**
- **POST** `/v1/auth/iniciarSesion`
  - **Cuerpo**:
    ```json
    {
      "correo": "string",
      "contraseña": "string"
    }
    ```

### **Registrar Usuario**
- **POST** `/v1/auth/registrar`
  - **Cuerpo**:
    ```json
    {
      "nombre": "Nombre",
      "apellido": "Apellido",
      "correo": "email@example.com",
      "contraseña": "Contraseña123!",
      "telefono": "12345678",
      "rol": "ROL_ESTUDIANTE" // o "ROL_PROFESOR"
    }
    ```

---

## **Estudiantes**
---

### **Obtener Estudiante por ID**
- **GET** `/v1/estudiante/buscarEstudiante/:uid`
  - **Parámetros**:
    - `uid` (string): ID del estudiante

### **Obtener Todos los Estudiantes**
- **GET** `/v1/estudiante/`
  - **Parámetros**: Ninguno

### **Eliminar Estudiante**
- **DELETE** `/v1/estudiante/eliminarEstudiante/:uid`
  - **Parámetros**:
    - `uid` (string): ID del estudiante

### **Actualizar Contraseña**
- **PATCH** `/v1/estudiante/actualizarContraseña/:uid`
  - **Parámetros**:
    - `uid` (string): ID del estudiante
  - **Cuerpo**:
    ```json
    {
      "nuevaContraseña": "string"
    }
    ```

### **Actualizar Estudiante**
- **PUT** `/v1/estudiante/actualizarEstudiante/:uid`
  - **Parámetros**:
    - `uid` (string): ID del estudiante
  - **Cuerpo**:
    ```json
    {
      "nombre": "string",
      "correo": "string",
      "edad": "número",
      "clase": "string"
    }
    ```

### **Asignar Clase al Estudiante**
- **POST** `/v1/estudiante/asignarClase/:uid`
  - **Parámetros**:
    - `uid` (string): ID del estudiante
  - **Cuerpo**:
    ```json
    {
      "idClase": "string"
    }
    ```

### **Obtener Clases Asignadas**
- **GET** `/v1/estudiante/clasesAsignadas/:uid`
  - **Parámetros**:
    - `uid` (string): ID del estudiante

---

## **Profesores**
---

### **Obtener Profesor por ID**
- **GET** `/v1/profesor/buscarProfesor/:uid`
  - **Parámetros**:
    - `uid` (string): ID del profesor

### **Obtener Todos los Profesores**
- **GET** `/v1/profesor/`
  - **Parámetros**: Ninguno

### **Eliminar Profesor**
- **DELETE** `/v1/profesor/eliminarProfesor/:uid`
  - **Parámetros**:
    - `uid` (string): ID del profesor

### **Actualizar Contraseña**
- **PATCH** `/v1/profesor/actualizarContraseña/:uid`
  - **Parámetros**:
    - `uid` (string): ID del profesor
  - **Cuerpo**:
    ```json
    {
      "nuevaContraseña": "string"
    }
    ```

### **Actualizar Profesor**
- **PUT** `/v1/profesor/actualizarProfesor/:uid`
  - **Parámetros**:
    - `uid` (string): ID del profesor
  - **Cuerpo**:
    ```json
    {
      "nombre": "string",
      "correo": "string",
      "edad": "número",
      "asignatura": "string"
    }
    ```

### **Asignar Clase al Profesor**
- **POST** `/v1/profesor/asignarClase/:uid`
  - **Parámetros**:
    - `uid` (string): ID del profesor
  - **Cuerpo**:
    ```json
    {
      "idClase": "string"
    }
    ```

### **Obtener Clases Asignadas**
- **GET** `/v1/profesor/clasesAsignadas/:uid`
  - **Parámetros**:
    - `uid` (string): ID del profesor

---

## **Clases**
---

### **Crear Clase**
- **POST** `/v1/clase/crearClase`
  - **Cuerpo**:
    ```json
    {
      "nombreClase": "Mate",
      "profesor": "67a9450a5a6075f422d88dbb",
      "horario": "Horario de la clase"
    }
    ```

### **Obtener Clase por ID**
- **GET** `/v1/clase/buscarClase/:classId`
  - **Parámetros**:
    - `classId` (string): ID de la clase

### **Obtener Todas las Clases**
- **GET** `/v1/clase/`
  - **Parámetros**: Ninguno

### **Eliminar Clase**
- **DELETE** `/v1/clase/eliminarClase/:classId`
  - **Parámetros**:
    - `classId` (string): ID de la clase

### **Actualizar Clase**
- **PATCH** `/v1/clase/actualizarClase/:classId`
  - **Parámetros**:
    - `classId` (string): ID de la clase
  - **Cuerpo**:
    ```json
    {
      "nombre": "string",
      "descripcion": "string",
      "idProfesor": "string"
    }
    ```

### **Obtener Estudiantes Asignados**
- **GET** `/v1/clase/estudiantesAsignados/:classId`
  - **Parámetros**:
    - `classId` (string): ID de la clase
