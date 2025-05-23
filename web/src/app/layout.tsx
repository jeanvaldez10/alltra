import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Nunito } from "next/font/google";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WebSocketProvider } from "../../contexts/WebSocketContext";
import ClientProvider from "@/components/global/ClientProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["200", "300", "400", "700", "900"],
	style: ["normal", "italic"],
	variable: "--font-nunito",
});

export const metadata: Metadata = {
	title: "Alltra finance LLC",
	description: "Alltra finance LLC",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${nunito.variable} bg-background text-foreground`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					<TooltipProvider delayDuration={200}>
						<ClientProvider>{children}</ClientProvider></TooltipProvider>
				</ThemeProvider>
				<WebSocketProvider>{null}</WebSocketProvider>
			</body>
		</html>
	);
}
