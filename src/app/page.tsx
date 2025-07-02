import { fetchContents } from '@/lib/fetch-contents';

export default async function HomePage() {
  const contents = await fetchContents();

  return (
    <main>
      <h1>コンテンツ一覧</h1><br></br>
        <ul>
          {contents.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p><br></br>
            </li>
          ))}
        </ul>
    </main>
  );
}
