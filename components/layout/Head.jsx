import React from 'react'
import Head from 'next/head'

export default React.memo(() => {
  return (
    <Head>
      <title>Blogging</title>
      <meta charSet="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css" />
    </Head>
  )
})
