import { Footer } from "@/components/footer";
import { SearchForm } from "@/components/SearchForm";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col  justify-center px-16 bg-white dark:bg-black">
        
        <h1 className="text-2xl font-bold mb-6">
        GitHub Profile Viewer
      </h1>
        
        <SearchForm />
      </main>
    </div>
  );
}