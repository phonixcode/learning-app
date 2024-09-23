import React from 'react';
import { AppProvider } from './context/AppContext';
import '@/styles/globals.css'

export const metadata = {
  title: 'Learning',
  description: 'Learning',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
