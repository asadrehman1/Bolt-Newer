import Header from "@/components/cutom/Header";
import "./globals.css";
import { PromptContextProvider } from "@/context/PromptContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/cutom/AppSidebar";
import { PayPalScriptProviderWrapper } from "@/components/ClientProviders";
import { Toaster } from "sonner";
import { ActionContextProvider } from "@/context/ActionContext";

export const metadata = {
  title: "Bolt Newer",
  description:
    "A developer tool to generate, customize, and launch apps in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
          >
            <PayPalScriptProviderWrapper>
              <AuthContextProvider>
                <PromptContextProvider>
                  <ActionContextProvider>
                    <Header />
                    <SidebarProvider defaultOpen={false}>
                      <AppSidebar />
                      <main className="flex-1">
                        {" "}
                        {children}
                        <Toaster />
                      </main>
                    </SidebarProvider>
                  </ActionContextProvider>
                </PromptContextProvider>
              </AuthContextProvider>
            </PayPalScriptProviderWrapper>
          </GoogleOAuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
