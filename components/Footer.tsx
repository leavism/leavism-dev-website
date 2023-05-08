type FooterProps = {
  children: React.ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="prose-sm mx-auto mt-auto max-w-2xl pt-32">
      {children}
    </footer>
  );
}
