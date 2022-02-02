function Hero() {
  return (
    <div className="flex items-center justify-between bg-yellow-300 py-10 lg:py-0 ">
      <div className="space-y-4 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4 ">
            Medium
          </span>
          &nbsp;is a place to write, read, and connect
        </h1>
        <p className="max-w-md">
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </p>
        <a
          href="#"
          className=" inline-block rounded-full border border-black py-2 px-5"
        >
          Start Writing
        </a>
      </div>
      <div>
        <img
          className="hidden h-32 md:inline-block lg:h-full"
          src="https://i.ibb.co/ft21FMH/medium-m.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Hero
