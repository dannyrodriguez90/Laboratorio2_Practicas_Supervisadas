Documentación de la API
Autenticación
Iniciar sesión
POST /v1/auth/login
Cuerpo:
json
Copiar
Editar
{
  "correo": "string",
  "contraseña": "string"
}
Estudiantes
Registrar Estudiante
POST /v1/auth/register
Cuerpo:
json
Copiar
Editar
{
  "nombre": "Nombre",
  "apellido": "Apellido",
  "correo": "email@example.com",
  "contraseña": "Contraseña123!",
  "telefono": "12345678",
  "rol": "ROL_ESTUDIANTE"
}
Obtener Estudiante por ID
GET /v1/student/findStudent/:uid
Parámetros:
uid (string): ID del estudiante
Obtener Todos los Estudiantes
GET /v1/student/
Parámetros: Ninguno
Eliminar Estudiante
DELETE /v1/student/deleteStudent/:uid
Parámetros:
uid (string): ID del estudiante
Actualizar Contraseña
PATCH /v1/student/updatePassword/:uid
Parámetros:
uid (string): ID del estudiante
Cuerpo:
json
Copiar
Editar
{
  "nuevaContraseña": "string"
}
Actualizar Estudiante
PUT /v1/student/updateStudent/:uid
Parámetros:
uid (string): ID del estudiante
Cuerpo:
json
Copiar
Editar
{
  "nombre": "string",
  "correo": "string",
  "edad": "número",
  "clase": "string"
}
Asignar Clase al Estudiante
POST /v1/student/assignClass/:uid
Parámetros:
uid (string): ID del estudiante
Cuerpo:
json
Copiar
Editar
{
  "idClase": "string"
}
Obtener Clases Asignadas
GET /v1/student/assignedClasses/:uid
Parámetros:
uid (string): ID del estudiante
Profesores
Registrar Profesor
POST /v1/auth/register
Cuerpo:
json
Copiar
Editar
{
  "nombre": "Nombre del profesor",
  "apellido": "Apellido del profesor",
  "correo": "email@example.com",
  "contraseña": "Contraseña123!",
  "asignatura": "Asignatura",
  "rol": "ROL_PROFESOR"
}
Obtener Profesor por ID
GET /v1/teacher/findTeacher/:uid
Parámetros:
uid (string): ID del profesor
Obtener Todos los Profesores
GET /v1/teacher/
Parámetros: Ninguno
Eliminar Profesor
DELETE /v1/teacher/deleteTeacher/:uid
Parámetros:
uid (string): ID del profesor
Actualizar Contraseña
PATCH /v1/teacher/updatePassword/:uid
Parámetros:
uid (string): ID del profesor
Cuerpo:
json
Copiar
Editar
{
  "nuevaContraseña": "string"
}
Actualizar Profesor
PUT /v1/teacher/updateTeacher/:uid
Parámetros:
uid (string): ID del profesor
Cuerpo:
json
Copiar
Editar
{
  "nombre": "string",
  "correo": "string",
  "edad": "número",
  "asignatura": "string"
}
Asignar Clase al Profesor
POST /v1/teacher/assignClass/:uid
Parámetros:
uid (string): ID del profesor
Cuerpo:
json
Copiar
Editar
{
  "idClase": "string"
}
Obtener Clases Asignadas
GET /v1/teacher/assignedClasses/:uid
Parámetros:
uid (string): ID del profesor
Clases
Crear Clase
POST /v1/class/createClass
Cuerpo:
json
Copiar
Editar
{
  "nombreClase": "Mate",
  "profesor": "67a9450a5a6075f422d88dbb",
  "horario": "Horario de la clase"
}
Obtener Clase por ID
GET /v1/class/findClass/:classId
Parámetros:
classId (string): ID de la clase
Obtener Todas las Clases
GET /v1/class/
Parámetros: Ninguno
Eliminar Clase
DELETE /v1/class/deleteClass/:classId
Parámetros:
classId (string): ID de la clase
Actualizar Clase
PATCH /v1/class/updateClass/:classId
Parámetros:
classId (string): ID de la clase
Cuerpo:
json
Copiar
Editar
{
  "nombre": "string",
  "descripcion": "string",
  "idProfesor": "string"
}
Obtener Estudiantes Asignados
GET /v1/class/assignedStudents/:classId
Parámetros:
classId (string): ID de la clase
