import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { fromJSON } from 'postcss';


export const metadata: Metadata = {
  title: 'UETech Next.js',
  description: 'Hawk Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>UETech Hawk</title>
        <link rel="icon" href="@/public/UETech.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}