export interface Comment {
    id: number,
    author: number,
    content: string,
    timestamp: string
    replies: Comment[]
}

export interface Post {
    id: number,
    author: number,
    topic: string,
    type: "Q&A" | "Informational",
    title: string,
    content: string,
    posted: string,
    latest: string,
    comments: Comment[]
}

export interface Topic {
    name: string,
    posts: Post[]
}

export type ForumData = {
    topics: string[],
    posts: Post[]
}