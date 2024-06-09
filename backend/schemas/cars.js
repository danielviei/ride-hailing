import {z} from 'zod';

const CarSchema = z.object ({
  brand: z.string ().min (1),
  model: z.string ().min (1),
  year: z
    .number ()
    .int ()
    .min (1900)
    .max (2100)
    .refine (year => /^\d{4}$/.test (year), {
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
