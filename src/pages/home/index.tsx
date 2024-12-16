import CategoryPanel from "@/components/home/CategoryPanel";
import StatusPanel from "@/components/home/StatusPanel";

export default function Home() {
  return (
    <>
      <StatusPanel />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5">
        <CategoryPanel />
        {/* <HomeCalender /> */}
      </div>
    </>
  );
}
