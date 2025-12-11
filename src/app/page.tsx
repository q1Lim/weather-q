import Link from 'next/link'
import s from './page.module.css'

export default function Home() {
  return (
    <ul className={s.list}>
      <li>
        <Link href="/Seoul">서울</Link>
      </li>
      <li>
        <Link href="/London">런던</Link>
      </li>
      <li>
        <Link href="/Paris">파리</Link>
      </li>
    </ul>
  )
}
