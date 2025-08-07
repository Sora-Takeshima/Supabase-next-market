"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../utils/supabase/client"
import ImgInput from "../../../components/imgInput"

const UpdateItem = (context) => {
    const [formParams, setFormParams] = useState({
        title: "",
        price: "",
        image: "",
        description: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormParams((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (imageUrl) => {
        setFormParams((prev) => ({ ...prev, image: imageUrl }))
    }

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

    const updateItem = async(e) => {
        e.preventDefault()

        const params = await context.params
        const { error } = await supabase
            .from("all_items")
            .update({
                ...formParams
            })
            .eq("id",`${params.id}` )
        if (error) {
            alert("権限がありません")
        }else{
            router.push("/")
            router.refresh()
            alert("アイテム編集成功")
        }
    }
    
    if(loading){
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <ImgInput setImage={handleImageChange}/>
                <form onSubmit={updateItem}>
                    <input value={formParams.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={formParams.price} onChange={handleChange} type="text" name="price" placeholder="価格" required/>
                    <input value={formParams.image} onChange={handleChange} type="text" name="image" placeholder="画像" required/>
                    <textarea value={formParams.description} onChange={handleChange} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
    } else {
        return(<h1>ローディング中...</h1>)
    }
}

export default UpdateItem