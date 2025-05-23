import { Dashboard } from "@/components/dashboard";
import { DashboardProvider } from "@/context/DashboardContext";

export default function Home() {
	return (
		<DashboardProvider>
			<Dashboard />
		</DashboardProvider>
	);
}
