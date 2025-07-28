import { Content } from "@/lib/types"

const BASE_URL = "http://localhost:3000"

//一覧取得
export async function fetchContents():Promise<Content[]> {
    const res = await fetch(`${BASE_URL}/content`, { cache: "no-store" })
    return res.json()
}

//詳細画面
export async function fetchContent(
    id: number
): Promise<Content> {
    const res = await fetch(`${BASE_URL}/content/${id}`, { cache: "no-store" })
    return res.json()
}

//新規投稿
export async function createContent(
    content: { title: string; body: string }
) {
    const res = await fetch(`${BASE_URL}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
    })
    return res.json()
}

//タイトル編集
export async function titleUpdate(
    id: number,
    content: { title: string }
) {
    const res = await fetch(`${BASE_URL}/content/${id}`,
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
    })
    return res.json()
}

//本文編集
export async function bodyUpdate(
    id: number,
    content: { body: string }
) {
    const res = await fetch(`${BASE_URL}/content/${id}`,
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
    })
    return res.json()
}

//削除
export async function deleteContent(
    id: number
) {
    await fetch(`${BASE_URL}/content/${id}`, {
        method: "DELETE",
    })
}