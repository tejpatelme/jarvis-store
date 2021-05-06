import "./MobileSortAndFilter.css";

export default function MobileSortAndFilter({
  setMobileSortMenuOpen,
  setMobileFilterMenuOpen,
}) {
  return (
    <div className="mobile-sort-filter">
      <div onClick={() => setMobileSortMenuOpen(true)}>Sort</div>
      <div onClick={() => setMobileFilterMenuOpen(true)}>Filter</div>
    </div>
  );
}
