import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import getMetadata from '@/components/common/Meta'
import { currentLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { DictionaryProvider } from '@/i18n/hook'
import './globals.css'

export async function generateMetadata() {
  const { common } = await getDictionary()
  const { title, description } = common
  return getMetadata(title, description)
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dictionary = await getDictionary(currentLocale)
  return (
    <html lang='ja'>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <Header />
          <main>{children}</main>
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  )
}
