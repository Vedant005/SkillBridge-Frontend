import { useEffect } from "react";
import { useGigsStore } from "../stores/gigsStore";
import Gigs from "../components/Gigs";
import Header from "../components/Header";
import loadingAnimation from "../animations/loading_ani.json";
import Lottie from "lottie-react";

function GigsPage() {
  const { fetchGigs, gigs, loading } = useGigsStore();

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className=" w-full">
      <Header />
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <main className="w-full">
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <Lottie
                  animationData={loadingAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ height: 200, width: 200 }}
                />
                <p className="text-2xl font-semibold text-gray-700 mt-4">
                  Server will get active soon. Till then grab yourself a coffee!
                  ☕
                </p>
              </div>
            </div>
          ) : gigs?.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {gigs.map((gig) => (
                <Gigs key={gig._id} {...gig} />
              ))}
            </div>
          ) : (
            <h4 className="text-center text-xl font-semibold">
              There are no gigs
            </h4>
          )}
        </main>
      </div>
    </div>
  );
}

export default GigsPage;
