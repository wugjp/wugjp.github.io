export type Locale = (typeof locales)[number]

export const locales = ['ja'] as const
export const localeLabels = [{ emoji: '🇯🇵', label: '日本語' }] as const

export const defaultLocale: Locale = 'ja'

export const currentLocale = (process.env.NEXT_PUBLIC_LANG || defaultLocale) as Locale

export const currentBaseUrl = currentLocale === 'ja' ? 'https://tokiken.com' : `https://${currentLocale}.tokiken.com`

export const isDefaultLocale = currentLocale === defaultLocale
