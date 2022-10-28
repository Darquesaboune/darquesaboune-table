import Head from 'next/head'
import { VFXProvider, VFXSpan } from 'react-vfx';
import { useState } from 'react'
import BmsTable from '../components/table';
import Slideover from '../components/slideover';

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>d a r q u e s a b o u n e</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VFXProvider zIndex={0}>
        <div className="pt-12 pb-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-lg font-semibold text-red-600"><VFXSpan shader="glitch">La table de difficulté</VFXSpan></h2>
              <p className="mt-2 text-white text-xl sm:text-3xl font-bold leading-8 tracking-tight md:text-4xl sm:tracking-[1em] tracking-[0.4em]"><VFXSpan shader="pixelate">darquesaboune</VFXSpan></p>
              <p className="mt-4 max-w-2xl text-l text-gray-500 lg:mx-auto"><a href="/">Retour à la maison</a></p>
              <button className="py-2 px-3 text-xs text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-center mb-2 mt-2" onClick={() => setOpen(true)}>Quoi de neuf?</button>
            </div>
          </div>
        </div>
        <Slideover isOpen={open} onStateChange={() => setOpen(false)} />
        <BmsTable />
      </VFXProvider>
    </>
  )
}
