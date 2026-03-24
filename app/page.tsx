import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="login-main">
      <div className="login-block">
        <h1 className="h1">TripX Login</h1>

        <LoginForm />
      </div>
    </main>
  );
}
