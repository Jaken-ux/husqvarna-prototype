import PasswordGate from "./PasswordGate";

export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PasswordGate>{children}</PasswordGate>;
}
