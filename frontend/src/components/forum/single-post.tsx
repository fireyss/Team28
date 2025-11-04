import type { Post } from "@/types/ForumData"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { formatRelative, parseISO } from "date-fns"
import { Badge } from "../ui/badge"
import { InputGroup, InputGroupTextarea, InputGroupButton } from "../ui/input-group"
import LikeToggle from "./like-toggle"
import Comment from "./comment"
import type { User } from "@/types/Account"

export default function SinglePost(
    { post, users, currentUser }: { post: Post, users: User[], currentUser: User }
) {
    let author = users.find(u => u.id === post.author)
    if (!author) {
        author = {
            id: -1,
            email: "Deleted user",
            name: "Deleted user",
            permission: "Employee"
        }
    }

    return (
        <div className="p-4">
            <div>
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback className="rounded-lg">{author.name.toUpperCase().substring(0, 2)}</AvatarFallback>
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
                    <Badge>{post.topic}</Badge>
                    <Badge>{post.type}</Badge>
                </div>
                <div className="pt-2 pb-5">
                    {post.content}
                </div>
                <LikeToggle item={post} user={currentUser} />
            </div>
            <div id="comments" className="p-2">
                <h2 className="text-xl font-bold m-2">Comments</h2>
                <InputGroup className="my-3">
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