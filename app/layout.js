import Header from "@/components/cutom/Header";
import "./globals.css";
import { PromptContextProvider } from "@/context/PromptContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexClientProvider } from "./ConvexClientProvider";

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
            <AuthContextProvider>
              <PromptContextProvider>
                <Header />
                {children}
              </PromptContextProvider>
            </AuthContextProvider>
          </GoogleOAuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
