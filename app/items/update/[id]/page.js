import MyPage from "./Mypage"
import { createClient } from "../../../utils/supabase/client"

const getSingleItem = async(id) => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        const { data } = await supabase
            .from("all_items")
            .select()
            .eq("id", `${id}`)
        return data
}

export async function generateMetadata(context){
    const params = await context.params
    const singleItemArray = await getSingleItem(params.id)
    const singleItem = singleItemArray[0]
    return {
        title: singleItem.title,
        description: singleItem.description
    }
}

const UpdateItem = (context) => {
    return <MyPage {...context}/>
}

export default UpdateItem