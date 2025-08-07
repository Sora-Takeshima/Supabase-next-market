"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../utils/supabase/client"

const DeleteItem = (context) => {
    const [formParams, setFormParams] = useState({
        title: "",
        price: "",
        image: "",
        description: ""
    })
    const [loading, setLoading] = useState(false)

    const supabase = createClient()

    const router = useRouter()

    useEffect(() => {
        const getSingleItem = async() => {
            const params = await context.params
            const { data } = await supabase
                .from("all_items")
                .select()
                .eq("id", `${params.id}`)
                .single()
            setFormParams(data)
            setLoading(true)
        }
        getSingleItem()
    }, [context])

    const deleteItem = async(e) => {
        e.preventDefault()
        const params = await context.params
        const { error } = await supabase
            .from("all_items")
            .delete()
            .eq("id", `${params.id}`)
        if (error) {
            alert("権限がありません")
        }else{
            router.push("/")
            router.refresh()
            alert("アイテム削除成功")
        }
    }
    if(loading){
        return (
            <div>
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={deleteItem}>
                    <input value={formParams.title} type="text" name="title" disabled/>
                    <input value={formParams.price} type="text" name="price" disabled/>
                    <input value={formParams.image} type="text" name="image"  disabled/>
                    <textarea value={formParams.description} name="description" rows={15} disabled></textarea>
                    <button>削除</button>
                </form>
            </div>
        )
    } else {
        return(<h1>ローディング中...</h1>)
    }
}

export default DeleteItem