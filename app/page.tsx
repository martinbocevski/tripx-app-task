import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main>
      <div className="loginBlock">
        <h1 className="H1">TripX Login</h1>

        <LoginForm />
      </div>
    </main>
  );
}
