import Footer from 'components/Footer';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta property="og:title" content="Huy's Website" />
        <meta
          property="og:description"
          content="It's my own personal website! Follow me as if my life was interesting!"
        />
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/1857296?v=4"
        />
      </Head>
      <body className="prose-base flex min-h-screen flex-col bg-white text-gray-700 antialiased sm:prose-base md:prose-lg lg:prose-xl dark:bg-neutral-800 dark:text-white">
        <Main />
        <NextScript />
        <Footer>Giahuy&apos;s Website</Footer>
      </body>
    </Html>
  );
}
