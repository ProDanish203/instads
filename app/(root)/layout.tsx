import type { Metadata } from 'next'
import '../globals.css'
import { BottomBar, Sidebar } from '@/components/shared'
import { Theme } from "@/store/Theme";
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/utils/AuthProvider';

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
      <body>
      
        <Theme>
        <Toaster
        position="top-right"
        reverseOrder={true}
        />

        <AuthProvider>

        <main className='min-h-screen w-screen'>

          <div className='flex'>
            <div className='max-sm:hidden sm:border-r'>
              <Sidebar/>
            </div>

            <div className='relative min-h-screen max-w-5xl w-full mx-auto'>
              <div className='md:px-10 py-4 px-3'>
                {children}
              </div>
            </div>

            <div className='sm:hidden'>
              <BottomBar/>
            </div>

          </div>
        </main>
        
        </AuthProvider>
        </Theme>
        
      </body>
    </html>
  )
}
