import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="w-[90%] xl:w-[1024] 2xl:w-[1280] h-full m-auto flex items-center justify-center">
      <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] h-fit py-[50] px-7 rounded-2xl shadow-[0px_10px_20px_rgba(0,0,0,0.1)] flex flex-col gap-[50]">
        <h1 className="text-4xl md:text-4xl 2xl:text-4xl text-center">
          TripX Login
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}
