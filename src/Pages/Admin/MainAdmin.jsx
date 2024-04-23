import Sidebar from "../../Components/Dashboard/Sidebar";

export default function MainAdmin(){
  return(
    <main className="flex flex-col md:flex-row">
      <Sidebar/>
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      </section>
    </main>
  );
}