import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'

const Header = async () => {
  const { common: t } = await getDictionary()
  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 py-2 bg-secondary'>
        <div className='grid grid-cols-3'>
          <div />
          <div className='flex justify-center items-center'>
            <Link href='/'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src='/logo.png' alt={t.title} width={204} height={33} />
            </Link>
          </div>
        </div>
      </header>
      <div className='h-20 w-full' />
    </>
  )
}

export default Header
