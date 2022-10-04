import Nav from "./Nav";
export default function Layout({ children }) {
  return (
    <div className="text-gray-400 bg-gray-900 body-font min-h-screen">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
