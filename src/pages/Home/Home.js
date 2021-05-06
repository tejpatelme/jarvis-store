import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="main-container relative">
      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1506097425191-7ad538b29cef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        alt="hero"
      />
      <div className="overlay">
        <h1 className="mb-5">
          Design resources and products to boost your workflow, and energize
          your creativity
        </h1>

        <Link to="/products">
          <button className="btn btn-lg btn-primary">Start Exploring</button>
        </Link>
      </div>
    </main>
  );
}
