import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import getMetadata from '@/components/common/Meta'
import { currentLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { DictionaryProvider } from '@/i18n/hook'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'

export async function generateMetadata() {
  const { common } = await getDictionary()
  const { title, description } = common
  return getMetadata(title, description)
}

const gaId = 'G-WGNR1BPQJ8'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dictionary = await getDictionary(currentLocale)
  return (
    <html lang='ja'>
      <GoogleTagManager gtmId='G-WGNR1BPQJ8' />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy='afterInteractive' async />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
        `}
      </Script>
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
