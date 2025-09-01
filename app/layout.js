import Header from "@/components/cutom/Header";
import "./globals.css";
import { PromptContextProvider } from "@/context/PromptContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/cutom/AppSidebar";

export const metadata = {
  title: "Bolt Newer",
  description:
    "A developer tool to generate, customize, and launch apps in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ConvexClientProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
          >
            <AuthContextProvider>
              <PromptContextProvider>
                <Header />
                <SidebarProvider defaultOpen={false}>
                  <AppSidebar />
                  <main className="flex-1">
                    {" "}
                    <SidebarTrigger className="cursor-pointer ml-10" />
                    {children}
                  </main>
                </SidebarProvider>
              </PromptContextProvider>
            </AuthContextProvider>
          </GoogleOAuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
