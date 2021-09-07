import "./Wishlist.css";
import { useUserData } from "../../contexts";
import { WishlistCard } from "../../components";

export default function Wishlist() {
  const {
    state: { wishlist },
  } = useUserData();

  return (
    <div className="wishlist-container">
      {wishlist.map((product) => (
        <WishlistCard product={product} />
      ))}
    </div>
  );
}
