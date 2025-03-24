import { useEffect } from "react";
import { useGigsStore } from "../stores/gigsStore";
import Gigs from "../components/Gigs";
import Header from "../components/Header";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading_ani.json";

function GigsPage() {
  const { fetchGigs, gigs, recommendedGigs, loading, pagination } =
    useGigsStore();

  useEffect(() => {
    fetchGigs();
  }, []);

  console.log(gigs);

  return (
    <div className="w-full">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <main className="w-full">
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Lottie
                animationData={loadingAnimation}
                loop
                autoplay
                style={{ height: 200, width: 200 }}
              />
              <p className="text-lg font-semibold">Loading gigs...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mt-8">All Gigs</h2>
              <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {gigs.map((gig, index) => (
                  <Gigs
                    key={gig.gigs.gigId} // ✅ Fallback key
                    {...gig}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default GigsPage;
