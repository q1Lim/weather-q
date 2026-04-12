import Link from 'next/link'

const locations = [
  { name: '서울', path: 'Seoul' },
  { name: '런던', path: 'London' },
  { name: '파리', path: 'Paris' },
]

export default function Home() {
  return (
    <main>
      <h1> 날씨 조회 서비스</h1>
      <p>다양한 도시의 날씨를 조회해보세요. :) </p>
      <ul>
        {locations.map((location) => (
          <li key={location.path}>
            <Link href={`/${location.path}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
