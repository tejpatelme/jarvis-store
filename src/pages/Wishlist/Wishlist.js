import "./Wishlist.css";
import { useUserData } from "../../contexts";
import { EmptyMessage, Heading, WishlistCard } from "../../components";

export default function Wishlist() {
  const {
    state: { wishlist },
  } = useUserData();

  return (
    <div className="wishlist-page">
      {wishlist.length > 0 ? (
        <>
          <Heading title="Wishlist" noOfProducts={wishlist.length} />
          <div className="wishlist-container">
            {wishlist.map((product) => (
              <WishlistCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
