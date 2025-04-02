import { useEffect, useState } from "react";
import { useGigsStore } from "../stores/gigsStore";
import Gigs from "../components/Gigs";
import Header from "../components/Header";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading_ani.json";
import Chatbot from "../components/Chatbot";

function GigsPage() {
  const { fetchGigs, gigs, loading, pagination } = useGigsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);

  useEffect(() => {
    fetchGigs(currentPage, limit);
  }, [currentPage, limit]); // Add dependencies to prevent infinite loop

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

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
              <h2 className="text-2xl font-bold mb-4">All Gigs</h2>

              <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {gigs.map((gig) => (
                  <Gigs key={gig.gigs.gigId} {...gig} />
                ))}
              </div>
              <div className="flex justify-between items-center mt-10">
                <button
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀️ Previous
                </button>

                <div className="text-lg font-semibold">
                  Page {currentPage} of {pagination.totalPages}
                </div>

                <button
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
                    currentPage === pagination.totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                >
                  Next ▶️
                </button>
              </div>
            </>
          )}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}

export default GigsPage;
