import { fetchContents } from "@/lib/api"

export default async function Home() {
  const contents = await fetchContents();

  return (
    <main>
      <h1>コンテンツ一覧</h1>
        <ul>
          {contents.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
    </main>
  )
}