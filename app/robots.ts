import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://calculadora-isr-mexico-livid.vercel.app/sitemap.xml',
  }
}
