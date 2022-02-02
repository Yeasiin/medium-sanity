import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { Post } from '../typings'
import { sanityClient, urlFor } from './../sanity'

interface Props {
  posts: [Post]
}

export default function Home(props: Props) {

  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title> Medium Sanity </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      {/* Hero Area */}
      <Hero />
      {/* Post */}
      <div className="grid grid-cols-1 gap-3 py-2 px-2 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-3">
        {props.posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className=" group cursor-pointer overflow-hidden rounded-md border ">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between bg-white p-5 ">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-sm">
                    {post.description} By {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full "
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    mainImage,
    description,
    body,
    
    author -> {
    name,
    image
  }
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
