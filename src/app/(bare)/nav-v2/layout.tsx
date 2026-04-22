import { ShowroomProvider } from "./ShowroomContext";
import { CartProvider } from "./CartContext";
import Footer from "./Footer";

export default function NavV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <ShowroomProvider>
      <CartProvider>
        {children}
        <Footer />
      </CartProvider>
    </ShowroomProvider>
  );
}
