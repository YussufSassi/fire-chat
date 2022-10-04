import { auth, firestore } from "../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  limit,
  query,
  getDocs,
  limitToLast,
} from "firebase/firestore";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
export default function ChatMessages({ channel }) {
  const [q, setQ] = useState();
  const scrollToRef = useRef();
  useEffect(() => {
    try {
      const messageRef = collection(firestore, "channels", channel, "messages");
      const q = query(messageRef, orderBy("createdAt", "asc"), limitToLast(25));

      setQ(q);
    } catch (error) {
      console.log(error);
    }
  }, [channel]);

  const [messages] = useCollectionData(q, { idField: "id" });
  useEffect(() => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);
  return (
    <div className="flex flex-col justify-center items-center gap-4 ">
      {messages &&
        messages.map((m) => {
          return <Message key={m.id} message={m} />;
        })}
      <div ref={scrollToRef}></div>
    </div>
  );
}
