import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline text-center">
                Capture and inspect HTTP requests
            </h1>
            <div className="-m-2 text-center">
                <div className="p-2">
                    <div
                        className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">

                        <span className="inline-flex px-2">Hookbin is a free service that enables you to collect, parse, and view HTTP requests.
                Create your unique endpoints to inspect headers, body, query strings, cookies, uploaded files, and much
                more.</span>
                        <span
                            className="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center">
                         <Link href="/a" as="/a">
                        <a> Create New endpoint</a>
                    </Link>
                        </span>
                    </div>
                </div>
            </div>
            <footer className="flex items-center justify-center w-full h-24 border-t">
                <a
                    className="flex items-center justify-center"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}

                </a>
            </footer>
        </div>

    )
}
