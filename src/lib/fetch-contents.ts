import { Content } from '@/types/content';

export async function fetchContents(): Promise<Content[]> {
  const res = await fetch('http://localhost:3000/content', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('データの取得に失敗しました');
  }

  return res.json();
}