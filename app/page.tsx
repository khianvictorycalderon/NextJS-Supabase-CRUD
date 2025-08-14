// import CreateSection from "../components/section/create";
// import DeleteSection from "../components/section/delete";
// import ReadSection from "../components/section/read";
// import UpdateSection from "../components/section/update";

export default function Home() {

  return (
    <div className="p-4 md:p-8 w-full mb-80">
      <div className="text-center">
        <h1 className="text-4xl font-mono">Next.js + Supabase CRUD</h1>
        <p className="mt-2 font-mono">by <a className="text-purple-600 underline" href="https://khian.netlify.app/" target="_blank">Khian Victory D. Calderon</a></p>
      </div>
      <hr className="my-6"/>
      <div className="text-center">
        <h1 className="text-4xl font-mono">SORRY FOR THE INCONVENIENCE</h1>
        <p className="mt-2 font-mono">
          This project has been permanently stopped due to the limitations of the Supabase free-tier plan. This allows me to focus on my other projects. You can still access the source code <a className="text-purple-600 underline" href="https://github.com/khianvictorycalderon/NextJS-Supabase-CRUD" target="_blank">here</a>.
        </p>
      </div>
      {/* <CreateSection/>
      <ReadSection/>
      <UpdateSection/>
      <DeleteSection/> */}
    </div>
  )
}