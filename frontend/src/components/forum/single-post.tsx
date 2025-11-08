import type { Post } from "@/types/ForumData"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { formatRelative, parseISO } from "date-fns"
import { Badge } from "../ui/badge"
import { InputGroup, InputGroupTextarea, InputGroupButton } from "../ui/input-group"
import LikeToggle from "./like-toggle"
import Comment from "./comment"
import type { User } from "@/types/Account"
import { Button } from "../ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Link } from "react-router-dom"
import { IconPencil, IconTrash } from "@tabler/icons-react"

export default function SinglePost(
    { post, users, currentUser, editing = false }:
        { post: Post, users: User[], currentUser: User, editing?: boolean }
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
                <h1 className="text-2xl font-bold" contentEditable={editing}>{post.title} </h1>
                <div className="flex gap-2 my-2">
                    <Badge>{post.topic}</Badge>
                    <Badge>{post.type}</Badge>
                </div>
                <div className="pt-2 pb-5" contentEditable={editing}>
                    {post.content}
                </div>
                {!editing && <div className="flex items-center gap-2">
                    <LikeToggle item={post} user={currentUser} />
                    {(currentUser.id == post.author) && <>
                        <Dialog>
                            <DialogTrigger>
                                <Link to={"edit"}>
                                    <Badge
                                        variant="outline"
                                        className="text-md hover:cursor-pointer"
                                    >
                                        <IconPencil /> Edit
                                    </Badge>
                                </Link>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit post</DialogTitle>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button variant="default">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog><Dialog>
                            <DialogTrigger>
                                <Badge
                                    variant="outline"
                                    className="text-md text-destructive hover:cursor-pointer"
                                >
                                    <IconTrash /> Delete
                                </Badge>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete post</DialogTitle>
                                    <div>
                                        Are you sure you want to delete this post "{post.title}"?
                                        This cannot be undone.
                                    </div>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button variant="destructive">Delete</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>}
                </div>
                }
            </div>
            {!editing && <div id="comments" className="p-2">
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
            </div>}
            {editing && <div className="flex flex-row gap-4 my-10">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Discard changes?</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to cancel editing?
                                All changes will be lost.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="destructive">Discard</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="default">Save changes</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Save changes?</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to save these changes to this post?
                                The current version will be lost.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="default">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>}
        </div >
    )
}