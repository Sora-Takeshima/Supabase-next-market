"use client"
import { useState } from "react"
import { createClient } from "../../utils/supabase/client"
// import ImgInput from "../../components/imgInput"


const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const supabase = createClient()

    async function newItem(e) {
        e.preventDefault()

        const { data, error } = await supabase.from("items").insert({
            title: title, 
            price: price,
            description: description
        })
        if (error) {
            alert("アイテム作成失敗")
        }
        alert("アイテム作成成功")
    }

    //TODO:画像をアップロードできるようにする
    return (
        <div>
            <h1 className="page-title">アイテム作成</h1>
            {/* <ImgInput setImage={setImage}/> */}
            <form onSubmit={newItem}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                {/* <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/> */}
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                <button>作成</button>
            </form>
        </div>
    )
}

export default CreateItem