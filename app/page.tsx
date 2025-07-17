import { fetchContents } from "@/lib/api"
import {
    Box, Container, Button, Typography
} from "@mui/material"

export default async function Home() {
  const contents = await fetchContents();

  return (
    <Box>
      <h1>コンテンツ一覧</h1>
        <ul>
          {contents.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
    </Box>
  )
}