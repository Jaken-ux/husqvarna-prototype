import { ShowroomProvider } from "./ShowroomContext";

export default function NavV2Layout({ children }: { children: React.ReactNode }) {
  return <ShowroomProvider>{children}</ShowroomProvider>;
}
