import { Routes, Route } from "react-router-dom";
import ForumHome from "./forum_pages/Home";
import TopicPage from "./forum_pages/Topic";
import PostPage from "./forum_pages/Post";

export default function Forum() {
    return (
        <Routes>
            <Route path="/" element={<ForumHome />} />
            <Route path="topic/:topicName" element={<TopicPage />} />
            <Route path="post/:postID" element={<PostPage />} />
        </Routes>
    );
}