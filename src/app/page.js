import { redirect } from "next/navigation";
import LoginForm from "./components/auth/LoginForm";

export default function Home() {
  redirect("/login");
}
