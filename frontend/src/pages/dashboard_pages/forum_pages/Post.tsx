import { useParams } from "react-router-dom";
import type { ForumData } from "@/types/ForumData"
import forumData from "@/data/forumData.json"
import accountsData from "@/data/Accounts.json"
import type { User } from "@/types/Account"

import {
    parseISO,
    formatRelative
} from "date-fns"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import {
    InputGroup,
    InputGroupButton,
    InputGroupTextarea
} from "@/components/ui/input-group"

import { Link } from "react-router"

import Comment from "@/components/forum/comment"

export default function PostPage() {
    const forum = forumData as ForumData
    const { postID } = useParams<{ postID: string }>();

    const post = forum.posts.find(p => p.id === Number(postID))

    if (!post) return (
        <div>{/* TODO */} Post not found </div>
    )

    const users = accountsData as User[]
    let author = users.find(user => user.id === post.author)
    if (!author) {
        author = {
            id: -1,
            email: "Deleted user",
            name: "Deleted user"
        }
    }

    return (
        <div className="p-4">
            <div>
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback className="rounded-lg">{author?.name.toUpperCase().substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">
                            {author.email}
                        </p>
                        <p className="text-muted-foreground text-xs">
                            {formatRelative(parseISO(post.posted), new Date())}
                        </p>
                    </div>
                </div>
                <h1 className="text-2xl font-bold">{post.title} </h1>
                <div className="flex gap-2 my-2">
                    <Badge asChild><Link to={"../topic/" + post.topic}>{post.topic}</Link></Badge>
                    <Badge>{post.type}</Badge>
                </div>
                <p>{post.content}</p>
            </div>
            <div id="comments" className="py-2">
                <h2 className="text-xl font-bold m-2">Comments</h2>
                <InputGroup className="m-3">
                    <InputGroupTextarea
                        className="min-h-16 resize-none rounded-md"
                        placeholder="Say something..."
                    />
                    <InputGroupButton variant="default" className="m-3 mt-auto">
                        Comment
                    </InputGroupButton>
                </InputGroup>
                {post.comments.map(comment => (
                    <Comment comment={comment} />
                ))}
            </div>
        </div >
    )
}