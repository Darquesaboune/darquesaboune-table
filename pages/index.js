import Head from 'next/head'
import Link from 'next/link'
import { VFXProvider, VFXSpan } from 'react-vfx';
import BmsTable from '../components/table';

export default function Home() {
  return (
    <>
      <Head>
        <title>d a r q u e s a b o u n e</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VFXProvider>
        <div className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-lg font-semibold text-red-600">La table de difficulté</h2>
              <p className="mt-2 text-white text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl tracking-[1em]"><VFXSpan shader="pixelate">darquesaboune</VFXSpan></p>
              <p className="mt-4 max-w-2xl text-l text-gray-500 lg:mx-auto"><Link href="/">Retour à la maison</Link></p>
            </div>
          </div>
        </div>
        <BmsTable />
      </VFXProvider>
    </>
  )
}
