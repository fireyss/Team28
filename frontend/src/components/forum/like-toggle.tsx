import type { User } from "@/types/Account"

import { Toggle } from "../ui/toggle"
import { IconArrowBigUp } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import React from "react"

export default function LikeToggle({ item, user, className, ...props }: {
    item: { author: number, likes: number[] },
    user: User
} & React.ComponentProps<typeof Toggle>) {
    const [likes, setLikes] = React.useState(item.likes)
    const getLiked = () => likes.includes(user.id)
    return (
        <div className="flex items-center">
            <Toggle
                disabled={user.id == item.author}
                aria-label={getLiked() ? "Like post" : "Unlike post"}
                className={cn(
                    className,
                    "text-md data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-[var(--primary)] *:[svg]:stroke-[var(--primary)]",
                    { "hover:cursor-pointer hover:bg-transparent": user.id !== item.author }
                )}
                pressed={getLiked()}
                onPressedChange={pressed => {
                    if (pressed) {
                        setLikes([...likes, user.id])
                    } else {
                        setLikes(likes.filter(id => id !== user.id))
                    }
                }}
                {...props}
            >
                <IconArrowBigUp />
            </Toggle >
            {likes.length} Like{likes.length !== 1 && "s"}
        </div>
    )
}