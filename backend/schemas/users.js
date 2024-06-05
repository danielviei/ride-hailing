import {z} from 'zod';

const UserSchema = z.object ({
  name: z.string (),
  email: z.string ().email (),
  password: z.string ().min (6),
});

export function validateUser (userData) {
  return UserSchema.parse (userData);
}

export default UserSchema;
