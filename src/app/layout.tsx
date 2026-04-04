import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import ThemeWrapper from '@/components/ThemeWrapper';
import Header from '@/components/Layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinanceFlow',
  description: 'Track and manage your finances with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeWrapper>
            <Header />
            <main className="main-content">
              {children}
            </main>
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
