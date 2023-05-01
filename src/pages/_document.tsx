import Footer from 'components/Footer'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <body className="bg-white text-gray-700 antialiased prose-base sm:prose-base md:prose-lg lg:prose-xl dark:bg-neutral-800 dark:text-white flex flex-col min-h-screen">
        <Main />
        <NextScript />
        <Footer>Giahuy's Website</Footer>
      </body>
    </Html>
  )
}