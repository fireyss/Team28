import type { ForumData } from "@/types/ForumData"
import forumData from "@/data/forumData.json"

import PostList from "@/components/forum/post-list"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { IconPlus, IconSearch } from "@tabler/icons-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export default function Home() {
    const forum = forumData as ForumData
    const [topics, setTopics] = useState<string[]>([])
    const [search, setSearch] = useState("")
    return (
        <div>
            <div className="flex flex-wrap gap-2 m-2 items-center">
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
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline" className="p-none">
                            <IconPlus />New Topic
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Topic</DialogTitle>
                            <DialogDescription>
                                Create a new topic to post about.
                            </DialogDescription>
                        </DialogHeader>
                        <Label htmlFor="name">Topic Name</Label>
                        <Input id="name" name="name" />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <InputGroup>
                <InputGroupInput
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <InputGroupAddon>
                    <IconSearch />
                </InputGroupAddon>
            </InputGroup>

            <PostList posts={forum.posts} topics={topics} search={search.toLowerCase()} />
        </div>
    )
}