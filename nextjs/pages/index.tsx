import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Taskcore - DataDAO Service</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex w-full h-full flex-1 flex-col items-center justify-center font-nunito px-20 gap-4 text-center bg-black bg-gradient-to-b from-black via-black to-purple-900">
        <h1 className='text-6xl text-slate-50 font-bold'>taskcore</h1>
        <p className='text-slate-300 text-lg'>DataDAO Service</p>
        <p className='text-slate-300 font-medium uppercase text-sm'>coming soon...</p>

      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t bg-black">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  )
}

export default Home
