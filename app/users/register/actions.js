"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function register(formData) {
    const supabase = await createClient()

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    const { error } = await supabase.auth.signUp(data)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}