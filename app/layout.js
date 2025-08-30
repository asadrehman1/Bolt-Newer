import Header from "@/components/cutom/Header";
import "./globals.css";
import { PromptContextProvider } from "@/context/PromptContext";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Bolt Newer",
  description:
    "A developer tool to generate, customize, and launch apps in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <AuthContextProvider>
          <PromptContextProvider>
            <Header />
            {children}
          </PromptContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
