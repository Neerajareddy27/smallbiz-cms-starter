// /admin/login: outside the (panel) group, so it isn't protected. Already signed in? Go to the dashboard.
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-stone-500">Manage your website content.</p>
        <LoginForm />
      </div>
    </div>
  );
}
