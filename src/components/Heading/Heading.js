import "./Heading.css";

export default function Heading({ title, noOfProducts }) {
  return (
    <div className="page-heading">
      {title} <span style={{ color: "gray" }}>{noOfProducts}</span>
    </div>
  );
}
