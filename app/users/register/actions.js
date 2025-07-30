"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../utils/supabase/client"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const supabase = createClient()

    const router = useRouter()

    const register = async(e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        }
        const { error } = await supabase.auth.signUp(data)
        if (error) {
            alert("ユーザー登録失敗")
        }else{
            router.push("/")
            router.refresh()
            alert("ユーザー登録成功")
        }
    }
    return (
        <div>
            <h1 className="page-title">登録ページ</h1>
            <form onSubmit={register}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" required/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register