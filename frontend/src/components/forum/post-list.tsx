import type { ForumData, Post } from "@/types/ForumData"
import type { User } from "@/types/Account"
import accounts from "@/data/Accounts.json"

import {
    parseISO,
    formatRelative
} from "date-fns"

import React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconMessages, IconPlus, IconSearch, IconUserFilled } from "@tabler/icons-react"
import { Link } from "react-router"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Textarea } from "../ui/textarea"

export function PostCard({ post }: { post: Post }) {
    const users = accounts as User[]
    let author = users.find(user => user.id === post.author)
    if (!author) {
        author = {
            id: -1,
            email: "Deleted user",
            
        }
    }

    return (
        <Link to={"post/" + post.id}>
            <Card className="mx-2 my-5">
                <CardHeader>
                    <div className="flex gap-2">
                        <Badge>{post.topic}</Badge>
                        <Badge>{post.type}</Badge>
                    </div>
                    <CardTitle className="py-1 text-lg font-bold">{post.title}</CardTitle>
                    <div className="flex gap-2 items-center">
                        <Avatar>
                            <AvatarImage src={author.avatarUrl} />
                            <AvatarFallback><IconUserFilled /></AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold">
                                {author.email}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {formatRelative(parseISO(post.posted), new Date())}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="line-clamp-3 whitespace-pre-wrap">
                    {post.content}
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <Link to={"post/" + post.id + "#comments"}>
                        <Badge variant="outline" className="text-md">
                            <IconMessages /> {post.comment_count} Comment(s)
                        </Badge></Link>
                </CardFooter>
            </Card>
        </Link>
    )
}

export function NewPostDialog({ topics }: { topics: string[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus /> New Post
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Post
                    </DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                    <Label htmlFor="topic">Topic:</Label>
                    <Select name="topic">
                        <SelectTrigger>
                            <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Topic</SelectLabel>
                                {topics.map(topic => (
                                    <SelectItem value={topic}>{topic}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <NewTopicDialog />
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="type">Type:</Label>
                    <Select name="type">
                        <SelectTrigger>
                            <SelectValue placeholder="Select post type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Post type</SelectLabel>
                                <SelectItem value="Q&A">Q&A</SelectItem>
                                <SelectItem value="Informational">Informational</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" />
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function PostList({ posts, type, topics, search }: { posts: Post[], type: string, topics: string[], search: string }) {
    let filteredPosts: Post[]

    if (type.length == 0) {
        filteredPosts = posts
    } else {
        filteredPosts = posts.filter(post => (post.type == type))
    }
    if (topics.length != 0) {
        filteredPosts = filteredPosts.filter(post => (topics.includes(post.topic)))
    }
    if (search.length != 0) {
        filteredPosts = filteredPosts.filter(post =>
        (post.title.toLowerCase().includes(search)
            || post.content.toLowerCase().includes(search))
        )
    }

    const [pageIndex, setPageIndex] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)

    const startIndex = pageIndex * pageSize
    let endIndex = startIndex + pageSize
    const visiblePosts = filteredPosts.slice(startIndex, endIndex)

    return (
        <div className="p-3">
            {visiblePosts.map(post => (
                <PostCard post={post} />
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

export function NewTopicDialog() {
    return (
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
    )
}

export default function ForumHome({ forum }: { forum: ForumData }) {
    const [topics, setTopics] = React.useState<string[]>([])
    const [type, setType] = React.useState("")
    const [search, setSearch] = React.useState("")

    return (
        <div>
            <div className="flex flex-row">
                <div className="m-3 mb-0">
                    <ToggleGroup type="single" value={type} onValueChange={setType}
                        className="flex gap-2 m-2">
                        <ToggleGroupItem value="Q&A" variant="outline"
                            className="flex-none rounded-md w-auto">Q&A</ToggleGroupItem>
                        <ToggleGroupItem value="Informational" variant="outline"
                            className="flex-none rounded-md w-auto">Informational</ToggleGroupItem>
                    </ToggleGroup>
                    <div className="flex flex-wrap gap-2 items-center">
                        <ToggleGroup
                            type="multiple"
                            value={topics}
                            onValueChange={setTopics}
                            className="flex flex-wrap gap-2 m-2"
                        >
                            {forum.topics.map(topic => (
                                <ToggleGroupItem
                                    value={topic}
                                    variant="outline"
                                    className="flex-none rounded-md w-auto"
                                >
                                    {topic}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        <NewTopicDialog />
                    </div>
                    <div className="m-2 mb-0">
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Search posts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <InputGroupAddon>
                                <IconSearch />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div className="mt-6 mr-7 ml-auto">
                    <NewPostDialog topics={forum.topics} />
                </div>
            </div>

            <PostList posts={forum.posts} type={type} topics={topics} search={search.toLowerCase()} />
        </div>
    )
}