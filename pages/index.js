import Link from "next/link";
import { auth } from "../utils/firebase";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { MdChat } from "react-icons/md";
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const channelRef = useRef();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelRef.current.value) {
      const safeChannelName = encodeURI(channelRef.current.value);
      router.push(`/channel/${safeChannelName}`);
    }
  };

  if (user) {
    return (
      <div className="max-w-xl flex justify-center flex-col items-center gap-4 m-auto ">
        <h2 className="text-2xl font-bold text-center text-white">
          Join or start a channel!
        </h2>
        <p>
          Begin by typing a desired channel name, then hit join and you&apos;re
          done!
        </p>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            name="channel"
            ref={channelRef}
            placeholder="Enter a channel name"
            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            required
          />
          <button
            type="submit"
            className="text-white transition-shadow inline-flex items-center gap-1 cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            <MdChat size={"1rem"} />
            Join
          </button>
        </form>
      </div>
    );
  } else if (!user && !loading) {
    return (
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <p className="text-9xl text-center mb-1">🔥</p>
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Welcome to Fire Chat!
            </h1>
            <p className="leading-relaxed mb-8">
              Please sign in to begin chatting!
            </p>
            <div className="flex justify-center">
              <Link href={"/login"}>
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
