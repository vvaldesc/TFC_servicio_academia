import { db, Clients, Stundents, Employees, Services, Teachers, Subjects, Articles, Servers, Courses, ClientTeacherTexts, ServiceConsumption, ClientServerConnections, StudentSubjectEnrolments, StudentSubjectFaults, ClientArticleInteractions } from 'astro:db';

// Función para generar la semilla
export default async function seed() {
  // Insertar registros para la tabla Clients
  await db.insert(Clients).values([
    { id: 1, name: 'Nombre Cliente', surname: 'Apellido Cliente', email: 'cliente@email.com', phone_number: '123456789', address: 'Dirección Cliente', city: 'Ciudad Cliente', bornDate: '2000-01-01', created_at: new Date(), updated_at: new Date(), username: 'username_cliente', password: 'contraseña_cliente', confirmed: true, image: 'url_imagen_cliente', active: true },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Stundents
  await db.insert(Stundents).values([
    { id: 1, matriculation_number: 'ABC123', DNI: '12345678A', employed: true, educational_level: 'Universitario', name: 'Nombre Estudiante', surname: 'Apellido Estudiante', email: 'estudiante@email.com', phone_number: '987654321', address: 'Dirección Estudiante', city: 'Ciudad Estudiante', bornDate: '1998-05-15', created_at: new Date(), updated_at: new Date(), username: 'username_estudiante', password: 'contraseña_estudiante', confirmed: true, image: 'url_imagen_estudiante', active: true },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Employees
  await db.insert(Employees).values([
    { id: 1, teacher_id: 1, student_id: 1, social_security: '123456789A', salary: 2000 },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Services
  await db.insert(Services).values([
    { id: 1, name: 'Servicio 1', price: 50, duration: 60, description: 'Descripción del servicio 1', discipline: 'Disciplina del servicio 1', image: 'url_imagen_servicio_1' },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Teachers
  await db.insert(Teachers).values([
    { id: 1, is_admin: true, name: 'Nombre Profesor', surname: 'Apellido Profesor', email: 'profesor@email.com', phone_number: '987654321', address: 'Dirección Profesor', city: 'Ciudad Profesor', bornDate: '1980-10-20', created_at: new Date(), updated_at: new Date(), username: 'username_profesor', password: 'contraseña_profesor', confirmed: true, image: 'url_imagen_profesor', active: true },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Subjects
  await db.insert(Subjects).values([
    { acronym: 'MAT101', teacher_id: 1, course_id: 'CS101', name: 'Matemáticas 101' },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Articles
  await db.insert(Articles).values([
    { serial_number: '123456', name: 'Artículo 1', price: 100, color: 'Rojo', description: 'Descripción del artículo 1', type: 'Tipo del artículo 1', volume: 10, weight: 5, IVA: 0.16, gross_price: 116, supplier: 'Proveedor 1', stock: 50, image1: 'url_imagen_articulo_1' },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Servers
  await db.insert(Servers).values([
    { nickname: 'Server1', IP: '192.168.1.1', id: 1 },
    // Puedes agregar más registros aquí si lo deseas
  ]);

  // Insertar registros para la tabla Courses
  await db.insert(Courses).values([
    { acronym: 'CS101', attendance_threshold: 75, educational_level: 'Universitario', duration: 4, practical_hours: 100 },
    // Puedes agregar más registros aquí si lo deseas
  ]);

// Insertar registros para la tabla ClientTeacherTexts
await db.insert(ClientTeacherTexts).values([
	{ client_id: 1, teacher_id: 1, sent_from_client: true, sent_from_teacher: false, date: new Date() },
	// Puedes agregar más registros aquí si lo deseas
  ]);
  
  // Insertar registros para la tabla ServiceConsumption
  await db.insert(ServiceConsumption).values([
	{ service_id: 1, employee_id: 1, client_id: 1, rating: 5, price: 50, created_at: new Date(), updated_at: new Date() },
	// Puedes agregar más registros aquí si lo deseas
  ]);
  
  // Insertar registros para la tabla ClientServerConnections
  await db.insert(ClientServerConnections).values([
	{ client_id: 1, server_id: 1, estimated_client_location: 'Ubicación estimada', device_type: 'Tipo de dispositivo', file_download: 'Archivo descargado', created_at: new Date(), client_IP: '192.168.1.2' },
	// Puedes agregar más registros aquí si lo deseas
  ]);
  
  // Insertar registros para la tabla StudentSubjectEnrolments
  await db.insert(StudentSubjectEnrolments).values([
	{ student_id: 1, subject_acronym: 'MAT101', date: new Date() },
	// Puedes agregar más registros aquí si lo deseas
  ]);
  
  // Insertar registros para la tabla StudentSubjectFaults
  await db.insert(StudentSubjectFaults).values([
	{ student_id: 1, subject_acronym: 'MAT101', date: new Date(), justified: true, justification: 'Justificación del fallo', description: 'Descripción del fallo' },
	// Puedes agregar más registros aquí si lo deseas
  ]);
  
  // Insertar registros para la tabla ClientArticleInteractions
  await db.insert(ClientArticleInteractions).values([
	{ client_id: 1, serial_number: '123456', interaction_type: 'booking', date: new Date(), updated_at: new Date(), discount: 10, pickedup_date: new Date(), pickingup_date: new Date(), price: 90 },
	// Puedes agregar más registros aquí si lo deseas
  ]);
  
}
