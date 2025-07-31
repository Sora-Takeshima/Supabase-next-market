"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../utils/supabase/client"
import ImgInput from "../../../components/imgInput"

const UpdateItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
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
            const singleItem = data[0] 
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
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
                title: title, 
                price: price,
                image: image,
                description: description
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
                <ImgInput setImage={setImage}/>
                <form onSubmit={updateItem}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
    } else {
        return(<h1>ローディング中...</h1>)
    }
}

export default UpdateItem