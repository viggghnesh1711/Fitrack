import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pop = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Fittrack",
  description: "Lets grow together !",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body
        className={pop.className}
      >
        {children}
      </body>
    </html>
  );
}
