"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "next-themes";

export const Theme = ({children}) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted)
    return <>{children}</>;

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>{children}</ThemeProvider>
  )
}