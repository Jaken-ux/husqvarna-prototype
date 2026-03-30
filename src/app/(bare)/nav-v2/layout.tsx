import { ShowroomProvider } from "./ShowroomContext";
import Footer from "./Footer";

export default function NavV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <ShowroomProvider>
      {children}
      <Footer />
    </ShowroomProvider>
  );
}
