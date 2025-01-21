import { currentBaseUrl, currentLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

const getMetadata = async (title?: string, description?: string, thumbnailUrl?: string): Promise<Metadata> => {
  const { common: t } = await getDictionary()
  return {
    title: title || t.title,
    description: description || t.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: './300x300.png',
    },
    metadataBase: new URL(currentBaseUrl),
    openGraph: {
      title: title || t.title,
      description: description || t.description,
      siteName: title,
      locale: currentLocale,
      type: 'website',
      images: [
        {
          url: thumbnailUrl || `${currentBaseUrl}/300x300.png`,
          width: 300,
          height: 300,
        },
      ],
    },
    twitter: {
      title: title || t.title,
      description: description || t.description,
      creator: '@gomi_ningen',
      images: [thumbnailUrl || `${currentBaseUrl}/300x300.png`],
      card: 'summary',
    },
  }
}

export default getMetadata
