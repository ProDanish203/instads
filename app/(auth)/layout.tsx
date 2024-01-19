import type { Metadata } from 'next'
import '../globals.css'
import { Theme } from "@/store/Theme";
import { getAuthSession } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'InstaDS | Your social gallery',
  description: 'Discover instaDS, your go-to social platform for seamless photo and video sharing. Elevate your social experience with dynamic feeds, HD media sharing, and enhanced privacy controls. Join now for a vibrant community, creative filters, and a secure social space. #instaDS #SocialMediaRevolution',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getAuthSession();
  if(session && session.user) redirect("/");

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className='min-h-screen'>
        <Toaster
        position="top-right"
        reverseOrder={true}
        />
        <Theme>

          <main>
            {children}
          </main>

        
        </Theme>
        
      </body>
    </html>
  )
}
