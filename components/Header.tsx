import Link from 'next/link'

function Header() {
  return (
    <header className=" flex items-center  justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="https://i.ibb.co/F3nF9BJ/1-s986x-IGqhfs-N8-U-09-Ad-A.png"
            alt="Medium"
          />
        </Link>

        <div className="hidden items-center space-x-5 md:inline-flex ">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="rounded-full border border-green-600 py-1 px-4 ">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
