import { db, Clients } from 'astro:db';

export default async function seed() {
  await db.insert(Clients).values([
    { 
      name: 'Nombre Cliente', 
      surname: 'Apellido Cliente', 
      email: 'cliente@email.com', 
      phone_number: '123456789', 
      address: 'Dirección Cliente', 
      city: 'Ciudad Cliente', 
      bornDate: new Date('2000-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'username_cliente', 
      password: 'contraseña_cliente', 
      confirmed: true, 
      image: 'url_imagen_cliente', 
      active: true 
    },
    { 
      name: 'Nombre Cliente 2', 
      surname: 'Apellido Cliente 2', 
      email: 'cliente2@email.com', 
      phone_number: '987654321', 
      address: 'Dirección Cliente 2', 
      city: 'Ciudad Cliente 2', 
      bornDate: new Date('1990-01-01'), 
      created_at: new Date(), 
      updated_at: new Date(), 
      username: 'username_cliente2', 
      password: 'contraseña_cliente2', 
      confirmed: true, 
      image: 'url_imagen_cliente2', 
      active: true 
    }
  ]);
}