import type { Metadata } from 'next'
import '../globals.css'
import { Sidebar } from '@/components/shared'
import { Theme } from "@/store/Theme";
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
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
  if(!session?.user) redirect("/login");

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className=''>

        <Theme>
        <Toaster
        position="top-right"
        reverseOrder={true}
        />
        <div className='flex h-screen relative flex-col md:flex-row md:overflow-hidden'>
          <div className='w-20 flex-none lg:w-64 md:border-r'>
            <Sidebar/>
          </div>

          <main className='main-container flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 p-2 max-w-7xl mx-auto'>
            {children}
          </main>

        </div>
        
        </Theme>
        
      </body>
    </html>
  )
}
