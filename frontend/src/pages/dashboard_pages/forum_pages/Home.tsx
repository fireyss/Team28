import type { ForumData } from "@/types/ForumData"
import forumData from "@/data/forumData.json"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export default function Home() {
    const forum = forumData as ForumData
    return (
        <div>
            Topics
            <ToggleGroup type="multiple" className="flex flex-wrap gap-2 m-2">
                {forum.topics.map(topic => (
                    <ToggleGroupItem value={topic} variant="outline" className="flex-none rounded-md w-auto" >
                        {topic}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            {forum.posts.map(post => (
                <div></div>
            ))}
        </div>
    )
}