import "./Home.css";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

export default function Home() {
  return (
    <div>
      <main className="main-container relative">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1506097425191-7ad538b29cef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt="hero"
        />
        <div className="overlay mb-3">
          <h1 className="mb-5">
            Design resources and products to boost your workflow, and energize
            your creativity
          </h1>

          <Link to="/products">
            <button className="btn btn-lg btn-primary">Start Exploring</button>
          </Link>
        </div>
      </main>

      <h2 className="text-semibold p-3">Browse categories</h2>
      <div className="categories-container">
        <CategoryCard
          category={{
            name: "Icons",
            image:
              "https://res.cloudinary.com/tejpatel/image/upload/v1631113595/4080835_ikkqic.png",
          }}
        />
        <CategoryCard
          category={{
            name: "Wireframe",
            image:
              "https://res.cloudinary.com/tejpatel/image/upload/v1631113595/wireframe_qzuvgk.png",
          }}
        />
        <CategoryCard
          category={{
            name: "UI Kits",
            image:
              "https://res.cloudinary.com/tejpatel/image/upload/v1631113595/ui_pu0hvw.png",
          }}
        />
        <CategoryCard
          category={{
            name: "Illustrations",
            image:
              "https://res.cloudinary.com/tejpatel/image/upload/v1631113595/illustration_wavhyb.png",
          }}
        />
      </div>
    </div>
  );
}
