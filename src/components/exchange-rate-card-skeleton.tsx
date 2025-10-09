import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExchangeRateCardSkeleton() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-semibold gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-12" />
          </div>
          <Skeleton className="h-5 w-5" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-12" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-10 w-40 mx-auto" />
          <div className="flex items-center justify-center gap-4 mt-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-32 mx-auto" />
      </CardFooter>
    </Card>
  );
}
