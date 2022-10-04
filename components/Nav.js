import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdLogin, MdLogout } from "react-icons/md";
import Image from "next/image";
export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <header className="text-gray-400 bg-gray-800 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <Link href={"/"}>
            <span className="ml-3 text-xl cursor-pointer">🔥 Fire Chat</span>
          </Link>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
        {!user && (
          <Link href={"/login"}>
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              Login
              <MdLogin size={"1rem"} style={{ marginLeft: ".25rem" }} />
            </button>
          </Link>
        )}
        {user && (
          <div className="flex gap-2 max-h-8 ">
            <Link href={"/dashboard"}>
              <Image
                src={user.photoURL}
                alt={user.displayName}
                width={"30px"}
                height={"30px"}
                className="rounded-md cursor-pointer focus:outline outline-gray-200 outline-2"
              ></Image>
            </Link>
            <button
              onClick={() => {
                auth.signOut();
              }}
              className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            >
              Logout
              <MdLogout size={"1rem"} style={{ marginLeft: ".25rem" }} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
