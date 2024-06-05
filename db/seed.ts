import { db, Clients, StudentSubjectMensuality,
   EmployeePayrolls, Teachers, Students,
    Subjects, Employees, Services, Articles,
     Servers, Disciplines, Courses,
      ClientTeacherTexts, ServiceConsumption,
       ClientServerConnections, StudentSubjectEnrolments,
        StudentSubjectFaults, ClientArticleInteractions } from 'astro:db';
import { Weather } from '../src/consts/types';

export default async function seed() {

  let today = new Date();
  today.setHours(22, 0, 0, 0); // 20 es para las 8 de la tarde
  today.setDate(today.getDate()+1);

  const teacherRecords = [
    {   
      id: 1,
      name: 'John Smith', 
      surname: 'Smith', 
      email: 'johnsmith@example.com', 
      phone_number: '111111111', 
      address: '789 Oak St', 
      city: 'Chicago', 
      bornDate: new Date('1980-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'johnsmith', 
      confirmed: true, 
      image: 'https://static.diariofemenino.com/media/13502/carta-gracias-profesor.jpg', 
      active: true,
      is_admin: true
    },
    { 
      id: 2,
      name: 'Emily Johnson', 
      surname: 'Johnson', 
      email: 'victor.valdescobos@riberadeltajo.es',
      phone_number: '222222222', 
      address: '321 Pine St', 
      city: 'San Francisco', 
      bornDate: new Date('1975-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'emilyjohnson', 
      confirmed: true, 
      image: 'https://static9.depositphotos.com/1070812/1091/i/450/depositphotos_10916856-stock-photo-teacher-on-background-of-blackboard.jpg', 
      active: true
    },
    { 
      id: 3,
      name: 'Michael Brown', 
      surname: 'Brown', 
      email: 'michaelbrown@example.com', 
      phone_number: '333333333', 
      address: '987 Maple St', 
      city: 'Seattle', 
      bornDate: new Date('1970-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'michaelbrown', 
      confirmed: true, 
      image: 'https://th.bing.com/th/id/R.636fe924035c8adfacdc45693c21db94?rik=3s8CyZiJBqaDbw&pid=ImgRaw&r=0', 
      active: true 
    },
    { 
      id: 4,
      name: 'Sarah Davis', 
      surname: 'Davis', 
      email: 'sarahdavis@example.com', 
      phone_number: '444444444', 
      address: '654 Walnut St', 
      city: 'Boston', 
      bornDate: new Date('1965-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'sarahdavis', 
      confirmed: true, 
      image: 'https://th.bing.com/th/id/R.a82f5839edfe663ed6de9962565373bc?rik=QtmuPebfhMAVfA&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f03%2f01%2f304194-face-women-portrait.jpg&ehk=eyuWeJvwcHdgi1YNycX2f0pF4PvajRD1sv5AVAP2Qlw%3d&risl=&pid=ImgRaw&r=0', 
      active: true 
    },
  ];
  console.log('teacherRecords created');

  function isTeacher(employeeId: number): boolean {
    return teacherRecords.some(record => record.id === employeeId);
  }

  const serviceConsumptionRecords = [];
  for (let i = 0; i < 300; i++) {
    const weather = Math.random() < 0.33 ? Weather.Snowy : (Math.random() < 0.5 ? Weather.Sunny : Weather.Cloudy);
    const delay = weather === Weather.Snowy ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 20);

    let reserved_at = new Date();
    reserved_at.setFullYear(2024); // Establece el año a 2024
    reserved_at.setMonth(Math.floor(Math.random() * 6)); // Genera un mes aleatorio
    reserved_at.setDate(Math.floor(Math.random() * 28) + 1); // Genera un día aleatorio
    reserved_at.setMinutes(Math.random() < 0.5 ? 30 : 0);
    reserved_at.setSeconds(0);
    
    const employee_id = Math.floor(Math.random() * 20) + 1;
    let rating = Math.round((Math.random() * 5) * 10) / 10;
    if (isTeacher(employee_id)) {
      rating = Math.round((Math.random() * 2 + 6) * 10) / 10; // Asegura un rating de al menos 6.0 para los profesores
    }
  
    const record = {
      service_id: Math.floor(Math.random() * 8) + 1, // Hay 8 servicios
      employee_id: employee_id, // Hay 4 profesores y 20 alumnos, total 24
      client_id: Math.floor(Math.random() * 2) + 1, // Hay 2 clientes      rating: rating,
      price: Math.round((Math.random() * 500) * 10) / 10,
      delay: delay,
      created_at: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      reserved_at: reserved_at,
      state: Math.random() < 0.5 ? 'Pending' : 'Cancelled',
      weather: weather,
      rating: isTeacher(employee_id) ? Math.floor(Math.random() * 6) + 5 : Math.floor(Math.random() * 6),
    };
    serviceConsumptionRecords.push(record);
  }
  console.log('serviceConsumptionRecords created');
  
  await db.insert(Clients).values([
    { 
      name: 'Víctor', 
      surname: 'Valdés Cobos', 
      email: 'victorvaldescobos@gmail.com', 
      phone_number: '123459789', 
      address: '123 Main St', 
      city: 'New York', 
      bornDate: new Date('1990-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'johndoedd', 
      confirmed: true, 
      active: true,
    },
    { 
      name: 'Jane Smith', 
      surname: 'Smith', 
      email: 'janesmith@example.com', 
      phone_number: '987654121', 
      address: '456 Elm St', 
      city: 'Los Angeles', 
      bornDate: new Date('1985-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'janesmith', 
      confirmed: true, 
      active: true 
    }
  ]);
  console.log('Clients inserted');

  await db.insert(Teachers).values(teacherRecords);
  console.log('Teachers inserted');

  await db.insert(Disciplines).values([
    {
      name: 'Estética'
    },
    {
      name: 'Peluquería'
    }
  ]);
  console.log('Discipline inserted');

  await db.insert(Services).values([
    {
        name: 'Tratamiento Facial',
        price: 20,
        description: 'Revitaliza tu piel con nuestro tratamiento facial.',
        discipline: 'Estética',
        image: 'https://example.com/facial.jpg',
    },
    {
        name: 'Manicura',
        price: 10,
        description: 'Obtén una manicura profesional.',
        discipline: 'Estética',
        image: 'https://example.com/manicure.jpg',
    },
    {
        name: 'Pedicura',
        price: 15,
        description: 'Consiente tus pies con nuestro servicio de pedicura.',
        discipline: 'Estética',
        image: 'https://example.com/pedicure.jpg',
    },
    {
        name: 'Exfoliación Corporal',
        price: 20,
        description: 'Exfolia y renueva tu piel con una exfoliación corporal.',
        discipline: 'Estética',
        image: 'https://example.com/bodyscrub.jpg',
    },
    {
        name: 'Corte de Pelo',
        price: 5,
        description: 'Obtén un corte de pelo con estilo de nuestros estilistas profesionales.',
        discipline: 'Peluquería',
        image: 'https://example.com/haircut.jpg',
    },
    {
        name: 'Coloración de Pelo',
        price: 20,
        description: 'Añade color a tu cabello con nuestro servicio de coloración.',
        discipline: 'Peluquería',
        image: 'https://example.com/haircoloring.jpg',
    },
    {
        name: 'Peinado',
        price: 20,
        description: 'Consigue el peinado perfecto para cualquier ocasión.',
        discipline: 'Peluquería',
        image: 'https://example.com/hairstyling.jpg',
    },
    {
        name: 'Tratamiento de Keratina',
        price: 30,
        description: 'Alisa y fortalece tu cabello con un tratamiento de keratina.',
        discipline: 'Peluquería',
        image: 'https://example.com/keratin.jpg',
    },
  ]);
  console.log('Services inserted');

  await db.insert(Articles).values([
    {
      serial_number: 'A123',
      name: 'T-Shirt',
      price: 20,
      color: 'Blue',
      description: 'Comfortable cotton t-shirt.',
      type: 'Clothing',
      volume: 0.1,
      weight: 0.2,
      IVA: 0.21,
      gross_price: 24.2,
      supplier: 'ABC Clothing',
      stock: 100,
      image1: 'https://example.com/tshirt.jpg',
      image2: 'https://example.com/tshirt-back.jpg',
      image3: 'https://example.com/tshirt-side.jpg',
      image4: 'https://example.com/tshirt-closeup.jpg',
    },
    {
      serial_number: 'B456',
      name: 'Running Shoes',
      price: 80,
      color: 'Black',
      description: 'High-performance running shoes.',
      type: 'Footwear',
      volume: 0.2,
      weight: 0.5,
      IVA: 0.21,
      gross_price: 96.8,
      supplier: 'XYZ Sports',
      stock: 50,
      image1: 'https://example.com/shoes.jpg',
      image2: 'https://example.com/shoes-side.jpg',
      image3: 'https://example.com/shoes-top.jpg',
      image4: 'https://example.com/shoes-bottom.jpg',
    },
    {
      serial_number: 'C789',
      name: 'Yoga Mat',
      price: 30,
      color: 'Purple',
      description: 'Non-slip yoga mat.',
      type: 'Equipment',
      volume: 0.3,
      weight: 1.0,
      IVA: 0.21,
      gross_price: 36.3,
      supplier: '123 Fitness',
      stock: 20,
      image1: 'https://example.com/yogamat.jpg',
      image2: 'https://example.com/yogamat-closeup.jpg',
      image3: 'https://example.com/yogamat-rolled.jpg',
      image4: 'https://example.com/yogamat-studio.jpg',
    },
    {
      serial_number: 'D012',
      name: 'Dumbbells',
      price: 50,
      color: 'Silver',
      description: 'Set of adjustable dumbbells.',
      type: 'Equipment',
      volume: 0.5,
      weight: 5.0,
      IVA: 0.21,
      gross_price: 60.5,
      supplier: '456 Fitness',
      stock: 10,
      image1: 'https://example.com/dumbbells.jpg',
      image2: 'https://example.com/dumbbells-closeup.jpg',
      image3: 'https://example.com/dumbbells-side.jpg',
      image4: 'https://example.com/dumbbells-gym.jpg',
    },
    {
      serial_number: 'E345',
      name: 'Protein Powder',
      price: 40,
      color: 'White',
      description: 'High-quality protein powder.',
      type: 'Supplement',
      volume: 0.3,
      weight: 0.5,
      IVA: 0.21,
      gross_price: 48.4,
      supplier: '789 Nutrition',
      stock: 30,
      image1: 'https://example.com/protein.jpg',
      image2: 'https://example.com/protein-nutrition.jpg',
      image3: 'https://example.com/protein-shaker.jpg',
      image4: 'https://example.com/protein-scoop.jpg',
    },
  ]);
  console.log('Articles inserted');

  const students = [
    {
      matriculation_number: '001',
      DNI: '12345678A',
      employed: false,
      educational_level: 'ESO',
      name: 'Juan',
      surname: 'Pérez',
      email: 'juanperez@example.com',
      phone_number: '123456789',
      address: 'Calle Mayor 1',
      city: 'Madrid',
      bornDate: new Date('1990-01-01'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'juanperez',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '002',
      DNI: '23456789B',
      employed: true,
      educational_level: 'Grado medio',
      name: 'María',
      surname: 'Gómez',
      email: 'mariagomez@example.com',
      phone_number: '234567890',
      address: 'Calle Menor 2',
      city: 'Barcelona',
      bornDate: new Date('1989-02-02'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'mariagomez',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '003',
      DNI: '111111111C',
      employed: false,
      educational_level: 'ESO',
      name: 'Michael',
      surname: 'Brown',
      email: 'michaelbrown@example.com',
      phone_number: '333333333',
      address: '987 Maple St',
      city: 'Seattle',
      bornDate: new Date('1970-01-01'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'michaelbrown',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '004',
      DNI: '34567890C',
      employed: true,
      educational_level: 'Bachillerato',
      name: 'Carlos',
      surname: 'Martínez',
      email: 'carlosmartinez@example.com',
      phone_number: '345678901',
      address: 'Calle Central 3',
      city: 'Valencia',
      bornDate: new Date('1988-03-03'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'carlosmartinez',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '005',
      DNI: '45678901D',
      employed: false,
      educational_level: 'Universidad',
      name: 'Ana',
      surname: 'Fernández',
      email: 'anafernandez@example.com',
      phone_number: '456789012',
      address: 'Calle Lateral 4',
      city: 'Sevilla',
      bornDate: new Date('1987-04-04'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'anafernandez5',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '006',
      DNI: '56789012E',
      employed: true,
      educational_level: 'Grado superior',
      name: 'Pedro',
      surname: 'García',
      email: 'pedrogarcia@example.com',
      phone_number: '567890123',
      address: 'Calle Principal 5',
      city: 'Bilbao',
      bornDate: new Date('1986-05-05'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'pedrogarcia83',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '007',
      DNI: '67890123F',
      employed: false,
      educational_level: 'Universidad',
      name: 'Laura',
      surname: 'López',
      email: 'lauralopez@example.com',
      phone_number: '678901234',
      address: 'Calle Secundaria 6',
      city: 'Zaragoza',
      bornDate: new Date('1985-06-06'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'lauralopez1',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '008',
      DNI: '78901234G',
      employed: true,
      educational_level: 'Bachillerato',
      name: 'Javier',
      surname: 'Rodríguez',
      email: 'javierrodriguez@example.com',
      phone_number: '789012345',
      address: 'Calle Terciaria 7',
      city: 'Málaga',
      bornDate: new Date('1984-07-07'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'javierrodriguez2',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '009',
      DNI: '89012345H',
      employed: false,
      educational_level: 'Universidad',
      name: 'Carmen',
      surname: 'Sánchez',
      email: 'carmensanchez@example.com',
      phone_number: '890123456',
      address: 'Calle Cuarta 8',
      city: 'Granada',
      bornDate: new Date('1983-08-08'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'carmensanchez13',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '010',
      DNI: '90123456I',
      employed: true,
      educational_level: 'Grado medio',
      name: 'Fernando',
      surname: 'Torres',
      email: 'fernandotorres@example.com',
      phone_number: '901234567',
      address: 'Calle Quinta 9',
      city: 'Córdoba',
      bornDate: new Date('1982-09-09'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'fernandotorres35',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '011',
      DNI: '91234567J',
      employed: true,
      educational_level: 'Grado superior',
      name: 'Luis',
      surname: 'Morales',
      email: 'luismorales@example.com',
      phone_number: '912345678',
      address: 'Calle Sexta 10',
      city: 'Alicante',
      bornDate: new Date('1981-10-10'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'luismorales',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '012',
      DNI: '02345678K',
      employed: false,
      educational_level: 'Universidad',
      name: 'Sara',
      surname: 'Ramírez',
      email: 'sararamirez@example.com',
      phone_number: '023456789',
      address: 'Calle Séptima 11',
      city: 'Murcia',
      bornDate: new Date('1980-11-11'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'sararamirez',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '013',
      DNI: '13456789L',
      employed: true,
      educational_level: 'Bachillerato',
      name: 'Roberto',
      surname: 'Ortega',
      email: 'robertoortega@example.com',
      phone_number: '134567890',
      address: 'Calle Octava 12',
      city: 'Salamanca',
      bornDate: new Date('1979-12-12'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'robertoortega',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '014',
      DNI: '24567890M',
      employed: false,
      educational_level: 'Grado medio',
      name: 'Patricia',
      surname: 'Castillo',
      email: 'patriciacastillo@example.com',
      phone_number: '245678901',
      address: 'Calle Novena 13',
      city: 'Valladolid',
      bornDate: new Date('1978-01-13'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'patriciacastillo',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '015',
      DNI: '35678901N',
      employed: true,
      educational_level: 'Universidad',
      name: 'Ricardo',
      surname: 'Guerrero',
      email: 'ricardoguerrero@example.com',
      phone_number: '356789012',
      address: 'Calle Décima 14',
      city: 'Toledo',
      bornDate: new Date('1977-02-14'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'ricardoguerrero',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '016',
      DNI: '46789012O',
      employed: false,
      educational_level: 'Grado superior',
      name: 'Marta',
      surname: 'Peña',
      email: 'martapena@example.com',
      phone_number: '467890123',
      address: 'Calle Undécima 15',
      city: 'Pamplona',
      bornDate: new Date('1976-03-15'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'martapena',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '017',
      DNI: '57890123P',
      employed: true,
      educational_level: 'Universidad',
      name: 'Antonio',
      surname: 'Navarro',
      email: 'antonionavarro@example.com',
      phone_number: '578901234',
      address: 'Calle Duodécima 16',
      city: 'Santander',
      bornDate: new Date('1975-04-16'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'antonionavarro',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '018',
      DNI: '68901234Q',
      employed: false,
      educational_level: 'Bachillerato',
      name: 'Isabel',
      surname: 'Molina',
      email: 'isabelmolina@example.com',
      phone_number: '689012345',
      address: 'Calle Decimotercera 17',
      city: 'Oviedo',
      bornDate: new Date('1974-05-17'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'isabelmolina',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '019',
      DNI: '79012345R',
      employed: true,
      educational_level: 'Universidad',
      name: 'Alberto',
      surname: 'Herrera',
      email: 'albertoherrera@example.com',
      phone_number: '790123456',
      address: 'Calle Decimocuarta 18',
      city: 'Gijón',
      bornDate: new Date('1973-06-18'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'albertoherrera',
      confirmed: true,
      active: true
    },
    {
      matriculation_number: '020',
      DNI: '80123456S',
      employed: false,
      educational_level: 'Grado medio',
      name: 'Cristina',
      surname: 'Delgado',
      email: 'cristinadelgado@example.com',
      phone_number: '801234567',
      address: 'Calle Decimoquinta 19',
      city: 'Burgos',
      bornDate: new Date('1972-07-19'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'cristinadelgado',
      confirmed: true,
      active: true
    }
  ]
  await db.insert(Students).values(students);
  console.log('Students inserted');

  await db.insert(Courses).values([
    {
      acronym: 'FP_MP1',
      name: 'Grado medio peluquería 1',
      turn: 'Diurno',
      attendance_threshold: 80,
      educational_level: 'Beginner',
      duration: 60,
      practical_hours: 20,
      discipline: 'Peluquería',
    },
    {
      acronym: 'FP_MP2',
      name: 'Grado medio peluquería 2',
      turn: 'Nocturno',
      attendance_threshold: 80,
      educational_level: 'Intermediate',
      duration: 90,
      practical_hours: 30,
      discipline: 'Peluquería',
    },
    {
      acronym: 'FP_BE2',
      name: 'Grado basico estética 2',
      turn: 'Nocturno',
      attendance_threshold: 80,
      educational_level: 'Advanced',
      duration: 120,
      practical_hours: 40,
      discipline: 'Estética',
    },
    {
      acronym: 'FP_BE1',
      name: 'Grado basico estética 1',
      turn: 'Diurno',
      attendance_threshold: 80,
      educational_level: 'Intermediate',
      duration: 120,
      practical_hours: 40,
      discipline: 'Estética',
    },
  ]);
  console.log('Courses inserted');

  await db.insert(Subjects).values([
    // Asignaturas para el curso de Peluquería
    {
      acronym: 'CPP',
      teacher_id: 1,
      course_id: 'FP_MP1',
      name: 'Corte de cabello y peinados',
      price: 20
    },
    {
      acronym: 'COC',
      teacher_id: 2,
      course_id: 'FP_MP1',
      name: 'Coloración del cabello',
      price: 20
    },
    {
      acronym: 'TCP',
      teacher_id: 3,
      course_id: 'FP_MP1',
      name: 'Tratamientos capilares',
      price: 20
    },
    // Asignaturas para el curso de Estética 1
    {
      acronym: 'CPL',
      teacher_id: 1,
      course_id: 'FP_BE1',
      name: 'Cuidado de la piel',
      price: 20
    },
    {
      acronym: 'MPR',
      teacher_id: 3,
      course_id: 'FP_BE1',
      name: 'Maquillaje profesional',
      price: 20
    },
    {
      acronym: 'MYP',
      teacher_id: 2,
      course_id: 'FP_BE1',
      name: 'Manicura y pedicura',
      price: 20
    },
    // Asignaturas para el curso de Peluquería 2
    {
      acronym: 'CBB',
      teacher_id: 4,
      course_id: 'FP_MP2',
      name: 'Corte de barba y bigote',
      price: 20
    },
    {
      acronym: 'ECB',
      teacher_id: 4,
      course_id: 'FP_MP2',
      name: 'Estilismo en el cabello',
      price: 20
    },
    {
      acronym: 'BAR',
      teacher_id: 4,
      course_id: 'FP_MP2',
      name: 'Cuidado de la barba',
      price: 20
    },
    // Asignaturas para el curso de Estética 2
    {
      acronym: 'ICO',
      teacher_id: 1,
      course_id: 'FP_BE2',
      name: 'Introducción a la cosmetología',
      price: 20
    },
    {
      acronym: 'PCO',
      teacher_id: 2,
      course_id: 'FP_BE2',
      name: 'Uñas de gel y acrílicas',
      price: 20
    },
    {
      acronym: 'TAC',
      teacher_id: 1,
      course_id: 'FP_BE2',
      name: 'Técnicas de aplicación de cosméticos',
      price: 20
    },
  ]);
  console.log('Subjects inserted');

  async function insertEmployees() {
    // Prepare array for all employees
    const employees = [];
    // Prepare teachers
    const teachers = [
        { teacher_id: 1, social_security: "123456789" },
        { teacher_id: 2, social_security: "987654321", salary: 6000 },
        { teacher_id: 3, social_security: "111111111", salary: 5500 },
        { teacher_id: 4, social_security: "222222222", salary: 5200 }
    ];
    // Add teachers to employees array
    employees.push(...teachers);
    // Prepare students
    for (let i = 1; i <= 20; i++) {
        const student = {
            student_id: i,
            social_security: (i + 200000000).toString(),
        };
        // Add each student to employees array
        employees.push(student);
    }
    // Insert all employees
    await db.insert(Employees).values(employees);
    console.log({'Employees inserted': employees});
  }
  insertEmployees();

  await db.insert(Servers).values([
    {
      nickname: 'server1',
      IP: 'localhost',
      Port: 4321,
      id: 1,
    }
  ]);
  console.log('Servers inserted');

  const EmployeePayrollsGenerator = async () => {
    // Genera las fechas de cada mes desde enero hasta hoy
    const months = [];
      for (let month = 1; month <= new Date().getMonth(); month++) {
        if (
          month > new Date().getMonth() + 1
        ) {
          break;
        }
        months.push(month);
      }

    // Para cada empleado y para cada fecha, inserta un registro
    for (let employee_id = 2; employee_id <= 4; employee_id++) {
      let amount = Math.floor(100 + Math.random() * 1100); // Genera un salario aleatorio de 3 cifras

      for (const month of months) {
        await db.insert(EmployeePayrolls).values([
          {
            employee_id: employee_id,
            month: month,
            amount: amount,
          },
        ]);

        // Ocasionalmente, aumenta el salario
        if (Math.random() < 0.1) {
          amount += 50;
        }
      }
    }
  };
  EmployeePayrollsGenerator();
  console.log('EmployeePayrolls inserted');

  await db.insert(ClientTeacherTexts).values([
    {
      client_id: 1,
      teacher_id: 1,
      sent_from_client: true,
      sent_from_teacher: false,
      message: "Hola, ¿cómo estás?",
      date: new Date(),
    },
    {
      client_id: 2,
      teacher_id: 2,
      sent_from_client: false,
      sent_from_teacher: true,
      message: "Estoy bien, gracias.",
      date: new Date(),
    },
    {
      client_id: 1,
      teacher_id: 3,
      sent_from_client: true,
      sent_from_teacher: false,
      message: "¿Podemos programar una reunión?",
      date: new Date(),
    },
    {
      client_id: 1,
      teacher_id: 4,
      sent_from_client: false,
      sent_from_teacher: true,
      message: "Claro, ¿qué tal el viernes?",
      date: new Date(),
    },
    {
      client_id: 1,
      teacher_id: 4,
      sent_from_client: true,
      sent_from_teacher: false,
      message: "Perfecto, nos vemos el viernes.",
      date: new Date(),
    },
  ]);
  console.log('ClientTeacherTexts inserted');

  await db.insert(ServiceConsumption).values(serviceConsumptionRecords);
  console.log('ServiceConsumption inserted');

  const subjects = ['CPP', 'COC', 'TCP', 'CPL', 'MPR', 'MYP', 'CBB', 'ECB', 'BAR', 'ICO', 'PCO', 'TAC'];
  const enrolments = [];
  
  for (let i = 1; i <= students.length; i++) {
    for (let j = 0; j < 3; j++) {
      enrolments.push({
        student_id: i,
        subject_acronym: subjects[(i + j - 1) % subjects.length],
        enrolled_at: new Date(2023, 8, Math.floor(Math.random() * 30) + 1)
      });
    }
  }
  
  await db.insert(StudentSubjectEnrolments).values(enrolments);
  console.log('StudentSubjectEnrolments inserted');

  await db.insert(ClientArticleInteractions).values([
    {
      client_id: 1,
      serial_number: 'A123',
      interaction_type: 'booking',
      date: new Date(),
      updated_at: new Date(),
      discount: 10,
      pickedup_date: null,
      pickingup_date: null,
      price: 18,
    },
    {
      client_id: 2,
      serial_number: 'B456',
      interaction_type: 'pickup',
      date: new Date(),
      updated_at: new Date(),
      discount: null,
      pickedup_date: new Date(),
      pickingup_date: new Date(),
      price: null,
    },
    {
      client_id: 1,
      serial_number: 'C789',
      interaction_type: 'booking',
      date: new Date(),
      updated_at: new Date(),
      discount: 5,
      pickedup_date: null,
      pickingup_date: null,
      price: 28,
    },
    {
      client_id: 1,
      serial_number: 'D012',
      interaction_type: 'pickup',
      date: new Date(),
      updated_at: new Date(),
      discount: null,
      pickedup_date: new Date(),
      pickingup_date: new Date(),
      price: null,
    },
    {
      client_id: 2,
      serial_number: 'E345',
      interaction_type: 'booking',
      date: new Date(),
      updated_at: new Date(),
      discount: 15,
      pickedup_date: null,
      pickingup_date: null,
      price: 34,
    },
  ]);
  console.log('ClientArticleInteractions inserted');



  // Obtén el mes actual
  const currentMonth = new Date().getMonth() + 1;
  // Calcula el número de meses desde septiembre
  const monthsSinceSeptember = currentMonth >= 9 ? currentMonth - 9 : currentMonth + 3;
  // Crea un array para almacenar los valores a insertar
  const mensualities = [];

  // Itera sobre los ID de los estudiantes
  for (let student_id = 1; student_id <= 20; student_id++) {
    // Para cada estudiante, crea un pago para cada mes desde septiembre
    for (let month = 0; month < monthsSinceSeptember + 1; month++) {
      mensualities.push({
        student_id: student_id,
        amount: 60,
        date: new Date(2023, 8 + month, 1),
      });
    }
  }

  // Inserta los valores en la base de datos
  await db.insert(StudentSubjectMensuality).values(mensualities);

};
