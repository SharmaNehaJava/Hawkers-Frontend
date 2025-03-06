import React, { useEffect, useState } from "react";
import axios from '../../api/apiInstances';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response = await axios.get("/api/articles");
        // console.log("Articles:", response.data); // 🔍 Debugging step
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <div className="w-screen h-screen flex flex-col items-center justify-center text-center bg-green-500 text-white">
    <div className="loader mt-4">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
    <style jsx="true">{`
      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .dot {
        width: 12px;
        height: 12px;
        margin: 0 6px;
        background-color: white;
        border-radius: 50%;
        animation: bounce 1.2s infinite ease-in-out;
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-20px);
        }
        60% {
          transform: translateY(-10px);
        }
      }
    `}</style>
  </div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 mt-2">
        <span className="block text-4xl font-extrabold text-green-600 text-center p-2">
            Blogs
          </span>
          <p className="text-green-600">Latest news and updates</p>
        </div>

        <div className="flex flex-wrap -mx-2">
          {articles.map((article) => (
            <BlogCard
              key={article._id}
              date={new Date(article.date).toLocaleDateString()}
              CardTitle={article.title}
              CardDescription={article.summary}
              image={article.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

const BlogCard = ({ image, date, CardTitle, CardDescription }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 h-full flex flex-col">
        <img src={image} alt={CardTitle} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-gray-600 text-sm mb-2">{date}</div>
          <div className="text-gray-800 text-lg font-bold mb-2">{CardTitle}</div>
          <div className="text-gray-600 flex-grow">{CardDescription}</div>
          <div className="mt-4">
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Read More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};