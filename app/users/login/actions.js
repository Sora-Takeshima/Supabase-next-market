"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../utils/supabase/client"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const supabase = createClient()

    const router = useRouter()

    const login = async(e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        const { error } = await supabase.auth.signInWithPassword(data)
        if (error) {
            console.log(error);
            alert("ログイン失敗")
        }else{
            router.push("/")
            router.refresh()
            alert("ログイン成功")
        }
    }
    return (
        <div>
            <h1 className="page-title">ログインページ</h1>
            <form onSubmit={login}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login