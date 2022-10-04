import { useRouter } from "next/router";
import ChatMessages from "../../components/ChatMessages";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../utils/firebase";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdSend } from "react-icons/io";
export default function Channel() {
  const router = useRouter();
  const channel = router.query.channel;
  const [user, loading] = useAuthState(auth);
  const messageRef = useRef();
  const formRef = useRef();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  if (user) {
    const addMessage = async () => {
      if (/\S/.test(messageRef.current.value)) {
        try {
          await addDoc(collection(firestore, "channels", channel, "messages"), {
            text: messageRef.current.value,
            createdAt: new Date(),
            uid: user.uid,
            photoUrl: user.photoURL,
            displayName: user.displayName,
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      addMessage();
      formRef.current.reset();
    };
    return (
      <div className="max-w-2xl m-auto p-5">
        <h1>
          You are speaking in{" "}
          <span className="font-bold font-mono text-white">#{channel}</span>
        </h1>
        <div class="flex-grow border-t border-gray-400 mb-4"></div>
        <ChatMessages channel={channel} />
        <div class="flex-grow border-t border-gray-400 mb-4"></div>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="inline-flex gap-2 "
            ref={formRef}
          >
            <input
              className="w-full  bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-6 leading-8 transition-colors duration-200 ease-in-out"
              type="text"
              name="message"
              ref={messageRef}
              placeholder="Your message"
              required
            />
            <button
              className="text-white inline-flex items-center gap-1 cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
            >
              <IoMdSend /> Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
