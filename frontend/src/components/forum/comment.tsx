import { type Comment } from "@/types/ForumData"
import { type User } from "@/types/Account"
import users from "@/data/Accounts.json"

import {
    parseISO,
    formatRelative
} from "date-fns"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import {
    InputGroup,
    InputGroupButton,
    InputGroupTextarea
} from "@/components/ui/input-group"

import {
    IconUserFilled,
    IconCornerDownLeft,
    IconPencil,
    IconTrash
} from "@tabler/icons-react"
import { enGB } from "date-fns/locale"
import { useAuth } from "@/context/AuthContext"
import LikeToggle from "./like-toggle"
import React from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog"

export default function Comment({ comment }: { comment: Comment }) {
    const user = useAuth().user!
    let author = users.find(user => user.id === comment.author) as User
    if (!author) {
        author = {
            id: -1,
            email: "Deleted user",
            name: "Deleted user",
            avatar: "/avatars/default.jpg",
            permission: "Employee",
        }
    }

    const [editing, setEditing] = React.useState(false)
    const [replying, setReplying] = React.useState(false)

    return (
        <div className="flex pt-4 gap-2" >
            <Avatar>
                <AvatarImage src={author.avatar} />
                <AvatarFallback><IconUserFilled /></AvatarFallback>
            </Avatar>
            <div className="pl-2 border-l-2 border-gray-300 w-full">
                <div className="flex gap-2">
                    <span className="font-bold">{author.email}</span>
                    <span className="text-muted-foreground">
                        {formatRelative(parseISO(comment.timestamp), new Date(), { locale: enGB })}
                    </span>
                </div>
                <div contentEditable={editing}>{comment.content}</div>
                {!editing && <div className="flex flex-col items-start gap-2 p-1 w-full">
                    <div className="flex flex-row gap-2 w-full">
                        <LikeToggle item={comment} user={user} />
                        {user.id === comment.author && <>
                            <Button variant="outline" onClick={() => setEditing(!editing)}>
                                <IconPencil />Edit
                            </Button>
                            <Button variant="outline" className="text-destructive">
                                <IconTrash />Delete
                            </Button>
                        </>}
                        <Button variant="outline" onClick={() => setReplying(!replying)}>
                            <IconCornerDownLeft /> Reply
                        </Button>
                    </div>
                    {replying && <InputGroup className="sm:w-full">
                        <InputGroupTextarea
                            className="min-h-16 resize-none rounded-md"
                            placeholder="Say something..."
                        />
                        <InputGroupButton variant="default" className="m-3 mt-auto">
                            Reply
                        </InputGroupButton>
                    </InputGroup>}
                </div>}
                {
                    editing && <div className="flex flex-row gap-2 p-2">
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="outline">Cancel</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Discard changes?</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to discard your changes to this comment?
                                </DialogDescription>
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
                                <DialogTitle>Save changes?</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to save your changes to this comment?
                                    The previous version will be lost.
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button variant="default">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                }
                {
                    comment.replies.map(reply => (
                        <Comment comment={reply} />
                    ))
                }
            </div >
        </div >
    )
}