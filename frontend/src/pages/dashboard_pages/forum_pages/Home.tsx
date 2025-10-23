import type { ForumData } from "@/types/ForumData"
import forumData from "@/data/forumData.json"

import PostList from "@/components/forum/post-list"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react"

export default function Home() {
    const forum = forumData as ForumData
    const [topics, setTopics] = useState<string[]>([])
    return (
        <div>
            Topics
            <ToggleGroup
                type="multiple"
                value={topics}
                onValueChange={setTopics}
                className="flex flex-wrap gap-2 m-2"
            >
                {forum.topics.map(topic => (
                    <ToggleGroupItem value={topic} variant="outline" className="flex-none rounded-md w-auto" >
                        {topic}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <PostList posts={forum.posts} topics={topics} />
        </div>
    )
}