"use client"
import { useState } from "react"
import { createClient } from "../../utils/supabase/client"
import ImgInput from "../../components/imgInput"

const CreateItem = () => {
    const [formParams, setFormParams] = useState({
        title: "",
        price: "",
        image: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormParams((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (imageUrl) => {
        setFormParams((prev) => ({ ...prev, image: imageUrl }))
    }

    async function newItem(e) {
        e.preventDefault()
        
        const supabase = createClient()
        const {data: { user }} = await supabase.auth.getUser()
        const userEmail = user.email
        const { error } = await supabase.from("all_items").insert({
            ...formParams,
            email: userEmail
        })
        if (error) {
            alert("アイテム作成失敗")
        }
        alert("アイテム作成成功")
    }

    return (
        <div>
            <h1 className="page-title">アイテム作成</h1>
            <ImgInput setImage={handleImageChange}/>
            <form onSubmit={newItem}>
                <input value={formParams.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required/>
                <input value={formParams.price} onChange={handleChange} type="text" name="price" placeholder="価格" required/>
                <input value={formParams.image} onChange={handleChange} type="text" name="image" placeholder="画像" required/>
                <textarea value={formParams.description} onChange={handleChange} name="description" rows={15} placeholder="商品説明" required></textarea>
                <button>作成</button>
            </form>
        </div>
    )
}

export default CreateItem