import { Skeleton } from "@/app/_components/ui/skeleton";
import { Input } from "@/app/_components/ui/input";
import { Search } from "lucide-react";

export function HeroDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF6F2] flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-[#0c3383] mb-12">Heróis</h1>
      
      <div className="w-full max-w-5xl flex gap-4 mb-10 items-center justify-between">
        <Skeleton className="h-12 w-28 rounded-full" />
        <div className="flex-1 relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-4" />
          <Input 
            className="w-full h-12 pl-12 rounded-full border-gray-200 bg-white" 
            placeholder="Digite o nome do herói"
            disabled
          />
        </div>
        <Skeleton className="h-12 w-28 rounded-full" />
      </div>

      <div className="flex gap-6 flex-wrap justify-center max-w-6xl w-full opacity-60">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center w-[200px] relative">
            <div className="absolute top-4 right-4">
              <Skeleton className="w-5 h-5 rounded-full" />
            </div>
            <Skeleton className="w-32 h-32 rounded-full mb-6 mt-4" />
            <Skeleton className="h-6 w-3/4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
