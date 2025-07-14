import { Content } from "@/types/content"

//一覧取得
export async function fetchContents():Promise<Content[]> {
    const res = await fetch("http://localhost:3000/content", { cache: "no-store" })
    return res.json()
}