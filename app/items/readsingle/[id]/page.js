//TODO:アイテムを一つだけ教示する方法を考える

// "use client"
// import { useState, useEffect} from "react"
import { createClient } from "../../../utils/supabase/client"
// import Image from "next/image"
// import Link from "next/link"

// export async function generateMetadata(context){
//     const params = await context.params
//     const singleItem = await getSingleItem(params.id)
//     return {
//         title: singleItem.title,
//         description: singleItem.description
//     }
// }

const getSingleItem = async() => {

    // useEffect(() => {
    //     fetchUsers(id)
    // }, [])

    // function fetchUsers(id) {
        const supabase = createClient()
        const {data} =await supabase.from("item_per_user").select("*")
        return data
    // }
}

const ReadSingleItem = () => {
    const singleItem = getSingleItem()
    return (
        <div className="grid-container-si">
            {/* <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div> */}
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
            {/* <div>
                <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
            </div> */}
        </div>
    )
}

export default ReadSingleItem