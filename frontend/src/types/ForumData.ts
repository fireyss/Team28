export interface Comment {
    id: number,
    author: number, // user id
    content: string,
    timestamp: string
    likes: number[], // list of user ids
    replies: Comment[]
}

export interface Post {
    id: number,
    author: number, // user id
    topic: string,
    type: "Q&A" | "Informational",
    title: string,
    content: string,
    posted: string,
    latest: string,
    likes: number[], // list of user ids
    comment_count: number, // includes replies
    comments: Comment[]
}

export type ForumData = {
    topics: string[],
    posts: Post[]
}