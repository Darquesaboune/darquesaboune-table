// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="bmstable" content="header.json" />
      </Head>
        <body className="bg-black">
          <div className="bg-opacity md:pb-4">
            <Main />
            <NextScript />
          </div>
        </body>
    </Html>
  )
}