"use client"

import { useState, useEffect} from "react"
import { createClient } from "./utils/supabase/client"
import Link from "next/link"

const getAllItems = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const supabase = createClient()
    const {data} = await supabase.from("all_items").select("*")
    setItems(data)
  }
  return items
}

//TODO:画像を表示させる

const ReadAllItems = () => {
  const allItems= getAllItems()
  return (
    <div className="grid-container-in">
      {allItems.map(item =>
        <Link href={`/items/readsingle/${item.id}`} key={item.id}>
        {/* <Image src={item.image} width={750} height={500} alt="item-image" priority/> */}
          <div>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default ReadAllItems