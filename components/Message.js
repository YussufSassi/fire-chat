import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { formatRelative } from "date-fns";
export default function Message({ message }) {
  const [user, loading] = useAuthState(auth);
  const { text, uid, photoUrl, displayName, createdAt } = message;

  if (uid === user.uid) {
    return (
      <div class="inline-flex gap-2 self-end">
        <div>
          <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p class="text-sm">{text}</p>
          </div>
          <span class="text-xs text-gray-500 leading-none">
            {formatRelative(new Date(createdAt.seconds * 1000), new Date())} •{" "}
            {displayName}
          </span>
        </div>
        <div>
          <Image
            src={photoUrl}
            alt={"profile"}
            title={displayName}
            className="flex-shrink-0 h-10 w-10 rounded-full"
            width={"35px"}
            height={"35px"}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div class="inline-flex flex-row-reverse gap-2 self-start">
        <div>
          <div class="bg-gray-600 text-white p-3 rounded-r-lg rounded-bl-lg">
            <p class="text-sm">{text}</p>
          </div>
          <span class="text-xs text-gray-500 leading-none">
            {formatRelative(new Date(createdAt.seconds * 1000), new Date())} •{" "}
            {displayName}
          </span>
        </div>
        <div title={displayName}>
          <Image
            src={photoUrl}
            alt={"profile"}
            className="flex-shrink-0 h-10 w-10 rounded-full"
            width={"35px"}
            height={"35px"}
          />
        </div>
      </div>
    );
  }
}
