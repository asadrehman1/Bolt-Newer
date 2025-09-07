# Bolt.Newer ⚡

**AI-Powered Website Generator SaaS built with Next.js**  
Bolt.Newer is a clone of bolt.new that enables users to generate websites directly from prompts. It features **Google OAuth**, **PayPal subscriptions with token allocation**, **AI-driven site creation**, and a **chat history sidebar**. Includes live code editing and preview using **Sandpack**. Users can export their apps to Sandpack and download the code.

---

## 🚀 Features

- **AI-Powered Website Generation**: Generate full websites from simple prompts using AI.
- **Live Code & Preview**: Edit and preview websites in real-time using **Sandpack**.
- **Export Apps**: Export generated apps to the Sandpack environment and download the code.
- **Chat History Sidebar**: Sidebar shows all previous chats of the user for easy reference.
- **Google OAuth**: Simple and secure login with Google accounts.
- **PayPal Subscriptions**: Manage subscription plans and allocate tokens for site generation.
- **Token Management**: Track usage and limits based on subscription tier.
- **Frontend-First Design**: Current app is focused on UI; backend can use Firebase for data storage.
- **AI Integration**: Google Gemini AI can be used for AI functionalities (future).
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices.
- **Modern UI**: Built with **Radix UI**, **Tailwind CSS**, and **Lucide React** for a sleek interface.

---

## 🛠 Tech Stack

- **Frontend & SSR**: Next.js
- **AI Tools (Future)**: Google Gemini API
- **Authentication**: Google OAuth via `@react-oauth/google`
- **Payments & Subscriptions**: PayPal SDK (`@paypal/react-paypal-js`)
- **State & Backend (Frontend Focus)**: Firebase (for backend functionality)
- **Live Code Editing & Preview**: Sandpack (`@codesandbox/sandpack-react`)
- **UI Library**: Radix UI, Tailwind CSS, Sonner, Lucide React
- **Utilities**: Axios, clsx, dedent, uuid4

---

## 📦 Environment Variables

Create a `.env` file in the root directory and add the following (replace with your own credentials):

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

# Convex deployment (optional for future backend)
CONVEX_DEPLOYMENT=dev:YOUR_CONVEX_DEPLOYMENT
NEXT_PUBLIC_CONVEX_URL=https://YOUR_CONVEX_SUBDOMAIN.convex.cloud

# AI API (Future)
GOOGLE_AI_API_KEY=YOUR_GOOGLE_AI_API_KEY

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
```

## 💻 Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/asadrehman1/Bolt.Newer.git
cd bolt.newer

# Install dependencies
npm install

# Start development server
npx convex dev  # optional backend
npm run dev
```

---

## 📈 How It Works

1. **_Sign In with Google_**: Authenticate securely via Google OAuth.
2. **_Select a Subscription Plan_**: PayPal subscriptions enable token-based website generation.
3. **_Generate Websites_**: Enter a prompt, and the AI generates a website automatically.
4. **_Live Editing_**: Use the Sandpack editor to modify code and preview changes in real-time.
5. **_Export Apps_**: Export your generated app to Sandpack and download the code.
6. **_Chat History Sidebar_**: View all previous prompts and AI-generated sites in a sidebar for reference.
7. **_Token Management_**: Track usage and token allocation based on subscription plan.

---

## 📝 Author

**Asad Rehman** — [GitHub](https://github.com/asadrehman1)

---