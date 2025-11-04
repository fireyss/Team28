import type { User } from "@/types/Account"

import React from "react"
import { Toggle } from "../ui/toggle"
import { IconArrowBigUp } from "@tabler/icons-react"

export default function LikeToggle({ item, user }: { item: { likes: number[] }, user: User }) {
    const [likes, setLikes] = React.useState(item.likes)
    const getLiked = () => likes.includes(user.id)
    return (
        <Toggle
            aria-label={getLiked() ? "Like post" : "Unlike post"}
            variant="outline"
            className="text-md data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-[var(--primary)] *:[svg]:stroke-[var(--primary)]"
            pressed={getLiked()}
            onPressedChange={pressed => {
                if (pressed) {
                    setLikes([...likes, user.id])
                } else {
                    setLikes(likes.filter(id => id != user.id))
                }
            }}
        >
            <IconArrowBigUp />
            {likes.length} Like{likes.length != 1 && "s"}
        </Toggle>
    )
}