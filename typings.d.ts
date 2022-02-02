export interface Post {
  _id: string
  _createdAt: string
  title: string
  description: string
  comments: Comment[]
  body: [object]
  author: {
    name: string
    image: string
  }
  mainImage: {
    assets: {
      url: string
    }
  }
  slug: {
    current: string
  }
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  _createdAt: string
  _id: string
  _rev: string
  _updatedAt: string
  post: {
    _ref: string
    _type: string
  }
}
