import { useParams } from "react-router-dom";
import type { ForumData } from "@/types/ForumData"
import forumData from "@/data/forumData.json"
import accountsData from "@/data/Accounts.json"
import type { User } from "@/types/Account"

import { Navigate } from "react-router"

import { useAuth } from "@/context/AuthContext"
import SinglePost from "@/components/forum/single-post"

export default function PostPage() {
    const user = useAuth().user!
    const forum = forumData as ForumData
    const { postID } = useParams<{ postID: string }>();

    const post = forum.posts.find(p => p.id === Number(postID))

    if (!post) return (
        <Navigate to=".." />
    )

    const users = accountsData as User[]

    return (
        <SinglePost post={post} users={users} currentUser={user} />
    )
}