import {z} from 'zod'
export const signupSchema = z.object({
  email:z.string().email('Invalid email address'),
  password:z.string().min(8,'password must be at least 8 characters long').regex(/[A-Z]/,'Must contain at least one uppercase letter').regex(/[a-z]/,'Must contain at least one lowercase letter').regex(/[0-9]/,'Must contain at least one number').regex(/[\W_]/,'Must contain at least one special character'),
  firstName:z.string().min(1,'First name is required'),
  lastName:z.string().min(1,'Last name is required'),
})
export type SignupInput = z.infer<typeof signupScehma>