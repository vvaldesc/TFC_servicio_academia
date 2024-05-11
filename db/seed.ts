import { db, Clients, Teachers, Students, Subjects, Employees, Services, Articles, Servers, Courses, ClientTeacherTexts, ServiceConsumption, ClientServerConnections, StudentSubjectEnrolments, StudentSubjectFaults, ClientArticleInteractions } from 'astro:db';

export default async function seed() {
  
  await db.insert(Clients).values([
    { 
      name: 'John Doe', 
      surname: 'Doe', 
      email: 'johndoe@example.com', 
      phone_number: '123456789', 
      address: '123 Main St', 
      city: 'New York', 
      bornDate: new Date('1990-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'johndoe', 
      password: 'password123', 
      confirmed: true, 
      image: 'https://example.com/johndoe.jpg', 
      active: true 
    },
    { 
      name: 'Jane Smith', 
      surname: 'Smith', 
      email: 'janesmith@example.com', 
      phone_number: '987654321', 
      address: '456 Elm St', 
      city: 'Los Angeles', 
      bornDate: new Date('1985-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'janesmith', 
      password: 'password456', 
      confirmed: true, 
      image: 'https://example.com/janesmith.jpg', 
      active: true 
    }
  ]);


  await db.insert(Teachers).values([
    { 
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
      password: 'password789', 
      confirmed: true, 
      image: 'https://example.com/johnsmith.jpg', 
      active: true 
    },
    { 
      name: 'Emily Johnson', 
      surname: 'Johnson', 
      email: 'emilyjohnson@example.com', 
      phone_number: '222222222', 
      address: '321 Pine St', 
      city: 'San Francisco', 
      bornDate: new Date('1975-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'emilyjohnson', 
      password: 'password101', 
      confirmed: true, 
      image: 'https://example.com/emilyjohnson.jpg', 
      active: true 
    },
    { 
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
      password: 'password202', 
      confirmed: true, 
      image: 'https://example.com/michaelbrown.jpg', 
      active: true 
    },
    { 
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
      password: 'password303', 
      confirmed: true, 
      image: 'https://example.com/sarahdavis.jpg', 
      active: true 
    },
    { 
      name: 'David Wilson', 
      surname: 'Wilson', 
      email: 'davidwilson@example.com', 
      phone_number: '555555555', 
      address: '852 Cedar St', 
      city: 'Miami', 
      bornDate: new Date('1960-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'davidwilson', 
      password: 'password404', 
      confirmed: true, 
      image: 'https://example.com/davidwilson.jpg', 
      active: true 
    }
  ]);
  

  await db.insert(Services).values([
    {
      name: 'Yoga Class',
      price: 20,
      duration: 60,
      description: 'Join our relaxing yoga class.',
      discipline: 'Yoga',
      image: 'https://example.com/yoga.jpg',
    },
    {
      name: 'Pilates Class',
      price: 25,
      duration: 60,
      description: 'Improve your flexibility with pilates.',
      discipline: 'Pilates',
      image: 'https://example.com/pilates.jpg',
    },
    {
      name: 'Zumba Class',
      price: 15,
      duration: 45,
      description: 'Dance your way to fitness with zumba.',
      discipline: 'Zumba',
      image: 'https://example.com/zumba.jpg',
    },
    {
      name: 'Boxing Class',
      price: 30,
      duration: 60,
      description: 'Get fit and learn self-defense with boxing.',
      discipline: 'Boxing',
      image: 'https://example.com/boxing.jpg',
    },
    {
      name: 'Spin Class',
      price: 18,
      duration: 45,
      description: 'Burn calories and improve your cardiovascular health with spin.',
      discipline: 'Spin',
      image: 'https://example.com/spin.jpg',
    },
  ]);
  

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


  await db.insert(Students).values([
    {
      matriculation_number: '001',
      DNI: '123456789A',
      employed: false,
      educational_level: 'High School',
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      phone_number: '123456789',
      address: '123 Main St',
      city: 'New York',
      bornDate: new Date('1990-01-01'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'johndoe',
      password: 'password123',
      confirmed: true,
      image: 'https://example.com/johndoe.jpg',
      active: true
    },
    {
      matriculation_number: '002',
      DNI: '987654321B',
      employed: true,
      educational_level: 'University',
      name: 'Jane',
      surname: 'Smith',
      email: 'janesmith@example.com',
      phone_number: '987654321',
      address: '456 Elm St',
      city: 'Los Angeles',
      bornDate: new Date('1985-01-01'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'janesmith',
      password: 'password456',
      confirmed: true,
      image: 'https://example.com/janesmith.jpg',
      active: true
    },
    {
      matriculation_number: '003',
      DNI: '111111111C',
      employed: false,
      educational_level: 'High School',
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
      password: 'password202',
      confirmed: true,
      image: 'https://example.com/michaelbrown.jpg',
      active: true
    },
    {
      matriculation_number: '004',
      DNI: '222222222D',
      employed: true,
      educational_level: 'University',
      name: 'Sarah',
      surname: 'Davis',
      email: 'sarahdavis@example.com',
      phone_number: '444444444',
      address: '654 Walnut St',
      city: 'Boston',
      bornDate: new Date('1965-01-01'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'sarahdavis',
      password: 'password303',
      confirmed: true,
      image: 'https://example.com/sarahdavis.jpg',
      active: true
    },
    {
      matriculation_number: '005',
      DNI: '333333333E',
      employed: false,
      educational_level: 'High School',
      name: 'David',
      surname: 'Wilson',
      email: 'davidwilson@example.com',
      phone_number: '555555555',
      address: '852 Cedar St',
      city: 'Miami',
      bornDate: new Date('1960-01-01'),
      created_at: new Date(),
      updated_at: new Date(),
      username: 'davidwilson',
      password: 'password404',
      confirmed: true,
      image: 'https://example.com/davidwilson.jpg',
      active: true
    }
  ]);


  await db.insert(Courses).values([
    {
      acronym: 'CS101',
      attendance_threshold: 80,
      educational_level: 'Beginner',
      duration: 60,
      practical_hours: 20,
    },
    {
      acronym: 'MATH202',
      attendance_threshold: 75,
      educational_level: 'Intermediate',
      duration: 90,
      practical_hours: 30,
    },
    {
      acronym: 'PHYS303',
      attendance_threshold: 85,
      educational_level: 'Advanced',
      duration: 120,
      practical_hours: 40,
    },
    {
      acronym: 'CHEM404',
      attendance_threshold: 90,
      educational_level: 'Advanced',
      duration: 120,
      practical_hours: 40,
    },
    {
      acronym: 'BIO505',
      attendance_threshold: 80,
      educational_level: 'Intermediate',
      duration: 90,
      practical_hours: 30,
    },
  ]);


  await db.insert(Subjects).values([
    {
      acronym: 'ENG101',
      teacher_id: 1,
      course_id: 'CS101',
      name: 'English 101',
    },
    {
      acronym: 'MATH201',
      teacher_id: 2,
      course_id: 'MATH202',
      name: 'Mathematics 201',
    },
    {
      acronym: 'PHYS301',
      teacher_id: 3,
      course_id: 'PHYS303',
      name: 'Physics 301',
    },
    {
      acronym: 'CHEM401',
      teacher_id: 4,
      course_id: 'CHEM404',
      name: 'Chemistry 401',
    },
    {
      acronym: 'BIO501',
      teacher_id: 5,
      course_id: 'BIO505',
      name: 'Biology 501',
    },
  ]);


  await db.insert(Employees).values([
    {
      teacher_id: 1,
      student_id: 1,
      social_security: '123456789',
      salary: 5000,
    },
    {
      teacher_id: 2,
      student_id: 2,
      social_security: '987654321',
      salary: 6000,
    },
    {
      teacher_id: 3,
      student_id: 3,
      social_security: '111111111',
      salary: 5500,
    },
    {
      teacher_id: 4,
      student_id: 4,
      social_security: '222222222',
      salary: 5200,
    },
    {
      teacher_id: 5,
      student_id: 5,
      social_security: '333333333',
      salary: 5300,
    },
  ]);


  await db.insert(Servers).values([
    {
      nickname: 'server1',
      IP: 'localhost',
      Port: 4321,
      id: 1,
    }
  ]);


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
      teacher_id: 5,
      sent_from_client: true,
      sent_from_teacher: false,
      message: "Perfecto, nos vemos el viernes.",
      date: new Date(),
    },
  ]);


  await db.insert(ServiceConsumption).values([
    {
      service_id: 1,
      employee_id: 1,
      client_id: 1,
      rating: 4,
      price: 25,
      delay: 5,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      service_id: 2,
      employee_id: 2,
      client_id: 2,
      rating: 5,
      price: 30,
      delay: 30,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      service_id: 3,
      employee_id: 3,
      client_id: 1,
      rating: 3,
      price: 20,
      delay: 20,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      service_id: 4,
      employee_id: 4,
      client_id: 1,
      rating: null,
      price: 35,
      delay: 35,
      created_at: new Date(),
      updated_at: null,
    },
    {
      service_id: 5,
      employee_id: 5,
      client_id: 2,
      rating: 4,
      price: 28,
      delay: 21,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);


  await db.insert(ClientServerConnections).values([
  ]);


  await db.insert(StudentSubjectEnrolments).values([
    {
      student_id: 1,
      subject_acronym: 'ENG101',
      date: new Date(),
    },
    {
      student_id: 2,
      subject_acronym: 'MATH201',
      date: new Date(),
    },
    {
      student_id: 3,
      subject_acronym: 'PHYS301',
      date: new Date(),
    },
    {
      student_id: 4,
      subject_acronym: 'CHEM401',
      date: new Date(),
    },
    {
      student_id: 5,
      subject_acronym: 'BIO501',
      date: new Date(),
    },
  ]);


  await db.insert(StudentSubjectFaults).values([
    {
      student_id: 1,
      subject_acronym: 'MATH201',
      date: new Date(),
      justified: true,
      justification: 'Medical leave',
      description: 'Missed class due to illness',
    },
    {
      student_id: 2,
      subject_acronym: 'MATH201',
      date: new Date(),
      justified: false,
      justification: null,
      description: 'Missed class without reason',
    },
    {
      student_id: 3,
      subject_acronym: 'PHYS301',
      date: new Date(),
      justified: true,
      justification: 'Family emergency',
      description: 'Missed class due to personal reasons',
    },
    {
      student_id: 4,
      subject_acronym: 'CHEM401',
      date: new Date(),
      justified: false,
      justification: null,
      description: 'Missed class without reason',
    },
    {
      student_id: 5,
      subject_acronym: 'BIO501',
      date: new Date(),
      justified: true,
      justification: 'Vacation',
      description: 'Missed class due to travel',
    },
  ]);


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

};