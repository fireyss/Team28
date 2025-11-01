import { useAuth } from "@/context/AuthContext";
import forumData from "@/data/forumData.json";
import accountsData from "@/data/Accounts.json";
import type { User } from "@/types/Account";

import {
    parseISO,
    formatRelative,
} from "date-fns"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";

export default function RecentForums() {
    const {user : currentuser} = useAuth();
    const getuserid = (id: number): User | undefined => {
        return accountsData.find(user => user.id === id);
    }
    const dateFormat = (datestring: string) => {
        return formatRelative(parseISO(datestring), new Date());
    }
    const recentposts = [...forumData.posts]
        .sort((a,b) => new Date(b.latest).getTime() - new Date(a.latest).getTime())
        .slice(0, 7); 
            
    return (
        <div className="space-y-6 w-[calc(100%-20px)] ml-[10px]">
            <div className="space-y-4">
                {recentposts.map((post) => {
                    const author = getuserid(post.author);
                    const currentuserpost = currentuser && author?.id == currentuser.id;
                    return (
                        <Link to={`/dashboard/forum/post/${post.id}`} className="block">
                        <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={author?.avatar}/>
                                        <AvatarFallback>
                                            {author?. name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-1">
                                        <p className="font-medium text-sm">{author?.email}</p>
                                        {currentuserpost && (
                                            <Badge variant="default" className="text-xs">(You)</Badge>
                                        )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">{dateFormat(post.posted)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge 
                                        variant={post.type === "Q&A" ? "default" : "secondary"}
                                        className="text-xs">
                                        {post.type}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {post.topic}
                                    </Badge>
                                </div>
                            </div>
                                
                                <h3 className="text-lg font-semibold hover:text-blue-60">
                                    {post.title}
                                </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {post.content}
                            </p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>
                                    Last activity: {dateFormat(post.latest)}
                                </span>
                                <span>
                                    {post.comment_count} {post.comment_count === 1 ? 'comment' : 'comments'}
                                </span>
                            </div>
                        </div>
                    </Link>);
                })}
            </div>
        </div>
    )
}