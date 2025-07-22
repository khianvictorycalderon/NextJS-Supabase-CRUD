import Create from "./section/create";

export default function Home() {
  return (
    <div className="p-4 md:p-8 w-full">
      <div className="text-center">
        <h1 className="text-4xl font-mono">Next.js + Supabase CRUD</h1>
        <p className="mt-2 font-mono">by <a className="text-purple-600 underline" href="https://khian.netlify.app/" target="_blank">Khian Victory D. Calderon</a></p>
      </div>
      <hr className="mt-6 mb-4"/>
      <Create/>
    </div>
  )
}