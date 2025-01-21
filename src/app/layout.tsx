import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import getMetadata from '@/components/common/Meta'
import { getDictionary } from '@/i18n/dictionaries'
import './globals.css'

export async function generateMetadata() {
  const { common } = await getDictionary()
  const { title, description } = common
  return getMetadata(title, description)
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
