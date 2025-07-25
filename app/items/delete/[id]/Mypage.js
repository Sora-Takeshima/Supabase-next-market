"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../utils/supabase/client"

const DeleteItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    // const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const router = useRouter()

    useEffect(() => {
        const getSingleItem = async() => {
            const params = await context.params
            const { data } = await supabase
                .from("all_items")
                .select()
                .eq("id", `${params.id}`)
            const singleItem = data[0] 
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            // setEmail(data.email)
            setLoading(true)
        }
        getSingleItem()
    }, [context])

    const deleteItem = async(e) => {
        e.preventDefault()
        const params = await context.params
        const { data, error } = await supabase
            .from("all_items")
            .delete()
            .eq("id",`${params.id}` )
        if (error) {
            alert("アイテム削除失敗")
        }else{
            router.push("/")
            router.refresh()
            alert("アイテム削除成功")
        }
    }

    return (
        <div>
            <h1 className="page-title">アイテム削除</h1>
            <form onSubmit={deleteItem}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                <button>削除</button>
            </form>
        </div>
    )
    //     } else {
    //         return <h1>権限がありません</h1>
    //     }
    // } else {
    //     return <h1>ローディング中...</h1>
    // }
}

export default DeleteItem