'use server';

import { z } from 'zod';
import NPool from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';



const pool = NPool; 

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }



//数据校验
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.'
  }
  ),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

//增加
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  //这里的SQL采用了参数化查询来防止SQL注入攻击的写法,和Vercel的很不一样
  try {
    await pool.query(`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES($1, $2, $3, $4)
  `, [customerId, amountInCents, status, date]);
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}




//更新
export async function updateInvoice(
  id: string, formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  //此处更新了SQL语句,用[v1,v2,v3,v4]替换$1.$2,$3,$4 //
  try {
    await pool.query(`
      UPDATE invoices
      SET customer_id = $1, amount = $2, status = $3
      WHERE id = $4`, [customerId, amountInCents, status, id]);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}




//删除
//修改了Vercel的SQL语法,由WHERE id = ${1}`改为[id]WHERE id = $1`,[id]//
//后期优化需要增加删除的确认按钮//
export async function deleteInvoice(id: string) {
  try {
    await pool.query(`DELETE FROM invoices WHERE id = $1`, [id]);

    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}