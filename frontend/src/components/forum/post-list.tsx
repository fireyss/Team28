import type { Post } from "@/types/ForumData"

import React from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import { Link } from "react-router"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function SinglePost({ post }: { post: Post }) {
    return (
        <Link to={"post/" + post.id}>
            <Card>{post.title}</Card>
        </Link>
    )
}

export default function PostList({ posts, topics }: { posts: Post[], topics: string[] }) {
    let filteredPosts: Post[]

    if (topics.length == 0) {
        filteredPosts = posts
    } else {
        filteredPosts = posts.filter(post => (topics.includes(post.topic)))
    }

    const [pageIndex, setPageIndex] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(5)

    const startIndex = pageIndex * pageSize
    let endIndex = startIndex + pageSize
    const visiblePosts = filteredPosts.slice(startIndex, endIndex)

    return (
        <div>
            <h1>Posts</h1>
            {visiblePosts.map(post => (
                <SinglePost post={post} />
            ))}
            <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 lg:flex">
                    <Label htmlFor="posts-per-page" className="text-sm font-medium">
                        Posts per page
                    </Label>
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value: string) => {
                            setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger size="sm" className="w-20" id="posts-per-page">
                            <SelectValue
                                placeholder={pageSize}
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-fit items-center justify-center text-sm">
                    Page {pageIndex + 1} of {Math.ceil(filteredPosts.length / pageSize)}
                </div>
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => (setPageIndex(0))}
                        disabled={pageIndex == 0}
                    >
                        <span className="sr-only">Go to first page</span>
                        <IconChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => setPageIndex(pageIndex - 1)}
                        disabled={pageIndex == 0}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <IconChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => setPageIndex(pageIndex + 1)}
                        disabled={pageIndex >= Math.ceil(filteredPosts.length / pageSize) - 1}
                    >
                        <span className="sr-only">Go to next page</span>
                        <IconChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 lg:flex"
                        size="icon"
                        onClick={() => (setPageIndex(Math.ceil(
                            filteredPosts.length / pageSize) - 1))}
                        disabled={pageIndex >= Math.ceil(filteredPosts.length / pageSize) - 1}
                    >
                        <span className="sr-only">Go to last page</span>
                        <IconChevronsRight />
                    </Button>
                </div>
            </div >
        </div>
    )
}