import {z} from 'zod';

const CarSchema = z.object ({
  brand: z.string (),
  model: z.string (),
  year: z.number ().int ().refine (year => /^\d{4}$/.test (year), {
    message: 'El año debe ser un número de 4 dígitos',
  }),
  status: z.enum (['disponible', 'en servicio', 'en mantenimiento']),
});

export function validateCar (carData) {
  return CarSchema.parse (carData);
}

const CarChangeStatusSchema = z.object ({
  status: z.enum (['disponible', 'en servicio', 'en mantenimiento']),
});

export function validateCarChangeStatus (statusData) {
  return CarChangeStatusSchema.parse (statusData);
}
