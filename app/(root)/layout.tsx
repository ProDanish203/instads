import type { Metadata } from 'next'
import '../globals.css'
import { BottomBar, Sidebar } from '@/components/shared'
import { Theme } from "@/store/Theme";
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/utils/auth';
import { AuthProvider } from '@/utils/AuthProvider';
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en" className='dark'>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className='dark:bg-neutral-950'>
      
        <Theme>
        <Toaster position="top-right" richColors/>

        <AuthProvider>

        <main className='min-h-screen w-screen'>

          <div className='flex'>
            <div className='max-sm:hidden sm:border-r border-r-neutral-300 dark:border-r-neutral-800'>
              <Sidebar/>
            </div>

            <div className='relative min-h-screen max-w-6xl w-full mx-auto'>
              <div className='relative md:px-10 max-w-3xl w-full max-sm:py-20 py-3 px-3'>
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
