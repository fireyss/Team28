import "@/data/projectData.json"
import { ProjectTable } from "@/components/project-table"

export default function Todo() {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <ProjectTable />
        </div >
    );
}