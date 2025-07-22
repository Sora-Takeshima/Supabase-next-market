import { createClient } from "../../../utils/supabase/client"
// import Image from "next/image"
// import Link from "next/link"

export async function generateMetadata(context){
    const params = await context.params
    const singleItemArray = await getSingleItem(params.id)
    const singleItem = singleItemArray[0]
    return {
        title: singleItem.title,
        description: singleItem.description
    }
}

const getSingleItem = async(id) => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        const { data } = await supabase
            .from("all_items")
            .select()
            .eq("id", `${id}`)
        return data
}

//TODO:画像を表示させる、編集ページ・削除ページへのリンクを作る

const ReadSingleItem = async(context) => {
    const params = await context.params
    const singleItemArray = await getSingleItem(params.id)
    const singleItem = singleItemArray[0]
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