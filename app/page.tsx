import { HeroDashboard } from "@/app/_components/organisms/HeroDashboard";
import { HeroDashboardSkeleton } from "@/app/_components/organisms/HeroDashboardSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<HeroDashboardSkeleton />}>
      <HeroDashboard />
    </Suspense>
  );
}

