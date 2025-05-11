import { type PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface AIProps extends PageProps {
  sillyPoem: string;
}

export default function AI({ sillyPoem }: AIProps) {
  const { auth } = usePage<PageProps>().props;

  return (
    <>
      <Head title="AI Poetry">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
          <nav className="flex items-center justify-between">
            <Link
              href={route('home')}
              className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
              Back Home
            </Link>
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link
                  href={route('login')}
                  className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                >
                  Log in
                </Link>
                <Link
                  href={route('register')}
                  className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </header>
        <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
          <main className="flex w-full max-w-[750px] flex-col">
            <div className="rounded-lg bg-white p-8 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
              <h1 className="mb-6 text-center text-3xl font-medium">AI Poetry Corner</h1>

              <div className="mb-8 flex flex-col items-center">
                <div className="flex justify-center">
                  <div className="w-16 border-b-2 border-[#f53003] dark:border-[#FF4433]"></div>
                </div>
                <h2 className="mt-4 text-xl font-medium text-[#f53003] dark:text-[#FF4433]">
                  A Silly Poem About Recursion
                </h2>
              </div>

              <div className="prose max-w-none rounded-lg bg-[#FDFDFC] p-6 shadow-sm dark:bg-[#0a0a0a]">
                <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                  {sillyPoem}
                </pre>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                  Generated using OpenAI's ChatGPT API
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/ai"
                className="rounded-md bg-[#f53003] px-6 py-3 text-white transition hover:bg-[#d92b03] dark:bg-[#FF4433] dark:hover:bg-[#e63e2d]"
              >
                Generate Another Poem
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
