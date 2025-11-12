import { Routes, Route } from "react-router-dom";
import ForumHome from "./forum_pages/Home";
import PostPage from "./forum_pages/Post";

export default function Forum() {
    return (
        <Routes>
            <Route path="/" element={<ForumHome />} />
            <Route path="post/:postID/:edit?" element={<PostPage />} />
        </Routes>
    );
}