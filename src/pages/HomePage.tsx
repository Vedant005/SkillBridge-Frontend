import { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("popular");

  const categories = [
    { id: "popular", label: "Popular", icon: "🔥" },
    { id: "graphic-design", label: "Graphic Design", icon: "🎨" },
    { id: "virtual-assistance", label: "Virtual Assistance", icon: "🤖" },
    { id: "video-animation", label: "Video & Animation", icon: "🎥" },
    { id: "web-dev", label: "Web Dev", icon: "💻" },
    { id: "ai-ml", label: "AI & ML", icon: "🧠" },
  ];

  const talents = [
    {
      id: 1,
      name: "Umer A.",
      title:
        "2D Animation, Motion Graphics, App, Screencast, Gif & Web Animator",
      image: "/api/placeholder/80/80",
      hourlyRate: 15,
      jobSuccess: 91,
      isAvailable: true,
      skills: ["2D Animation", "Explainer Video", "Video Production"],
    },
    {
      id: 2,
      name: "Parth L.",
      title:
        "AI/ML Specialist | Full-Stack Development | Generative AI | Python",
      image: "/api/placeholder/80/80",
      hourlyRate: 30,
      jobSuccess: 100,
      skills: ["Python", "Natural Language Processing", "Data Science"],
    },
    {
      id: 3,
      name: "Ved L.",
      title: "Web Specialist | Full-Stack Development | Generative AI | Python",
      image: "/api/placeholder/80/80",
      hourlyRate: 30,
      jobSuccess: 100,
      skills: ["Python", "React", "TypeScript"],
    },
  ];

  const services = [
    {
      title: "Website Development",
      imgSrc: "https://via.placeholder.com/300",
      bgColor: "bg-blue-500",
    },
    {
      title: "App Development",
      imgSrc: "https://via.placeholder.com/300",
      bgColor: "bg-green-500",
    },
    {
      title: "AI & ML",
      imgSrc: "https://via.placeholder.com/300",
      bgColor: "bg-purple-500",
    },
    {
      title: "Game Development",
      imgSrc: "https://via.placeholder.com/300",
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Find the right{" "}
            <span className="italic text-yellow-300">freelance</span> service{" "}
            <br />
            right away 🚀
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Connect with talented freelancers from around the world for any
            project, big or small.
          </p>

          {/* ✅ Search Bar */}
          <div className="flex max-w-lg mx-auto">
            <input
              type="text"
              placeholder="What are you looking for? E.g. Mobile Apps"
              className="flex-1 py-3 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              className="bg-yellow-400 text-black px-6 rounded-r-md hover:bg-yellow-500 transition"
              onClick={() => navigate("/gigs")}
            >
              🔎 Search
            </button>
          </div>

          <div className="mt-10">
            <p className="text-lg">Trusted by:</p>
            <div className="flex justify-center gap-8 mt-4">
              {["Google", "Netflix", "PayPal", "P&G"].map((company, index) => (
                <div key={index} className="text-xl font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            🔥 Popular Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg shadow-lg transition transform hover:scale-105 ${service.bgColor}`}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <img
                  src={service.imgSrc}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            ✨ Top Talents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talents.map((talent) => (
              <div
                key={talent.id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{talent.name}</h3>
                    <p className="text-gray-600">{talent.title}</p>
                    <p className="text-green-500 font-semibold mt-2">
                      ${talent.hourlyRate}/hr
                    </p>
                  </div>

                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  {talent.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-red-600 text-white text-center py-20">
        <h2 className="text-5xl font-extrabold mb-6">
          🔥 Get Started with SKILLBRIDGE
        </h2>
        <button
          className="bg-yellow-400 text-black px-8 py-3 rounded-md hover:bg-yellow-500 transition transform hover:scale-105"
          onClick={() => navigate("/signup")}
        >
          🚀 Join Now
        </button>
      </section>

      <Footer />
    </div>
  );
}
