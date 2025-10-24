import type { ForumData } from "@/types/ForumData"
import forumData from "@/data/forumData.json"

import ForumHome from "@/components/forum/post-list"

export default function Home() {
    const forum = forumData as ForumData
    return (
        <ForumHome forum={forum} />
    )
}