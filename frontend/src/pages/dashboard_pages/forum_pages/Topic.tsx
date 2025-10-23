import { useParams } from "react-router-dom";

export default function TopicPage() {
    const { topicName } = useParams<{ topicName: string }>();
    return (
        <div>{topicName}</div>
    )
}