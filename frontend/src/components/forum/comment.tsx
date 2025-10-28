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
    IconCornerDownLeft
} from "@tabler/icons-react"

export default function Comment({ comment }: { comment: Comment }) {
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

    return (
        <div className="flex pt-4 gap-2" >
            <Avatar>
                <AvatarImage src={author.avatar} />
                <AvatarFallback><IconUserFilled /></AvatarFallback>
            </Avatar>
            <div className="pl-2 border-l-2 border-gray-300">
                <div className="flex gap-2">
                    <span className="font-bold">{author.email}</span>
                    <span className="text-muted-foreground">
                        {formatRelative(parseISO(comment.timestamp), new Date())}
                    </span>
                </div>
                <div>{comment.content}</div>
                <Collapsible className="flex items-start gap-2 m-1">
                    <CollapsibleTrigger>
                        <Button variant="outline">
                            <IconCornerDownLeft /> Reply
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <InputGroup className="resize">
                            <InputGroupTextarea
                                className="min-h-16 min-w-80 resize-none rounded-md"
                                placeholder="Say something..."
                            />
                            <InputGroupButton variant="default" className="m-3 mt-auto">
                                Reply
                            </InputGroupButton>
                        </InputGroup>
                    </CollapsibleContent>
                </Collapsible>
                {comment.replies.map(reply => (
                    <Comment comment={reply} />
                ))}
            </div>
        </div >
    )
}