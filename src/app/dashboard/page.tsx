
import { Header } from "@/components/header";
import { TaskDashboard } from "@/components/task-dashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <TaskDashboard />
    </div>
  );
}
