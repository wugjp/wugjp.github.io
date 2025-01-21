import { getDictionary } from '@/i18n/dictionaries'
import { Urls } from '@/lib/urls'
import Link from 'next/link'

const Footer = async () => {
  const { common } = await getDictionary()
  return (
    <footer className='grid gap-4 p-32 text-center text-xs text-gray-500'>
      <div className=''>
        <Link href='/'>{common.title}</Link>
      </div>
      <div className='flex justify-center space-x-4'>
        <Link href={Urls.inqiuryForm} target='_blank'>
          Contact
        </Link>
        <Link href='/privacy'>Privacy Policy</Link>
        <Link href='https://twitter.com/gomi_ningen' target='_blank'>
          Twitter
        </Link>
      </div>
      <div className=''>
        <Link href='https://tokiken.com' target='_blank' className='text-gray-300'>
          CHO TOKIMEKI♡LAB
        </Link>
      </div>
    </footer>
  )
}

export default Footer
