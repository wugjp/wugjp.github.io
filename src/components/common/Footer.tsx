import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'

const Footer = async () => {
  const { common } = await getDictionary()
  return (
    <footer className='grid gap-4 p-32 text-center'>
      <div className=''>
        <Link href='/' className='text-xs text-gray-500'>
          {common.title}
        </Link>
      </div>
      <div className=''>
        <Link href='/' className='text-xs text-gray-500'>
          wugjp.github.io
        </Link>
      </div>
    </footer>
  )
}

export default Footer
