import Header from '../../components/Header'
import { Post } from '../../typings'
import { sanityClient, urlFor } from '../../sanity'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface Props {
  post: Post
}
interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  console.log(post)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onsubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data) => {
        setSubmitted(true)
        console.log(data)
      })
      .catch((err) => {
        setSubmitted(false)
        console.log(err)
      })
  }

  return (
    <main className="mx-auto max-w-7xl">
      <Header />

      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl font-medium">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <h3 className="text-sm font-light">
            Blog Post By{' '}
            <span className="text-green-600">{post.author.name}</span>-
            Published At {new Date(post._createdAt).toLocaleString()}
          </h3>
        </div>

        <div className="mt-10">
          <PortableText
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}{' '}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="my-5 mx-auto  max-w-2xl border border-yellow-500 " />

      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white  ">
          <h3 className="text-3xl font-bold capitalize">
            Thank you for submitting you comment
          </h3>
          <p className="capitalize">
            once it has been approved, it will appear below!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed The Article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-yellow-500 focus:ring-1 "
              placeholder="John Appleseed"
              type="text"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border px-3 py-2 shadow outline-none ring-yellow-500 focus:ring-1"
              placeholder="Example@mail.com"
              type="email"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className=" form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1 "
              placeholder="Comment"
              rows={8}
            />
          </label>

          {/* Errors */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">The Name is required field</span>
            )}
            {errors.email && (
              <span className="text-red-500">The Email is required field</span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                The Comment is required field
              </span>
            )}
          </div>

          <input
            type="submit"
            className="cursor-pointer rounded bg-yellow-500 px-4 py-2 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
          />
        </form>
      )}

      {/* Comment */}

      <div className="mx-auto my-10 flex max-w-2xl flex-col border p-10 shadow-sm shadow-yellow-500 ">
        <h3 className="text-2xl font-bold">Comment</h3>
        <hr className="my-3" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}</span> :{' '}
              {comment.comment}{' '}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Post

export async function getStaticPaths() {
  const query = `*[_type == "post"]{
        _id, 
        slug {
            current
        },
      }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: any) {
  const query = `*[_type == "post" && slug.current == $slug ][0] {
        _id,
        _createdAt,
        title,
        slug,
        mainImage,
        description,
        body,        
        author -> {
        name,
        image
      },
      'comments' : *[_type == 'comment' && post._ref ==^._id && approved == true]
    }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
