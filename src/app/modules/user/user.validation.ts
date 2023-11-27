import z from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// const orderValidationSchema = z.object({
//   productName: z.string(),
//   price: z.number(),
//   quantity: z.number(),
// });

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});

const userUpdateValidationSchema = z.object({
  userId: z.number().optional(),

  username: z.string().optional(),

  password: z.string().optional(),

  fullName: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),

  age: z.number().optional(),

  email: z.string().email().optional(),

  isActive: z.boolean().optional(),

  hobbies: z.array(z.string()).optional(),

  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  orders: z.array(z.custom()).optional(),
});
const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
  //   orders: z.array(orderValidationSchema),
});

export const validation = {
  userValidationSchema,
  userUpdateValidationSchema,
  orderValidationSchema,
};
