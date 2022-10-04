import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { updateProfile } from "firebase/auth";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const nameRef = useRef();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  const deleteAccount = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete your account? This is the last notice, and your account will be permanently deleted upon pressing 'OK'!"
    );
    if (confirmation) {
      try {
        await user.delete();
      } catch (e) {
        console.log(e);
        alert(
          "There was an error deleting your account. Please log out and log back in, then restart this procedure to finish it."
        );
      }
    } else {
      alert(
        "You have cancelled this action. Nothing has been done on your account."
      );
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    const newName = nameRef.current.value;
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (user) {
    return (
      <div className="flex justify-center flex-col  gap-4 max-w-2xl m-auto">
        <h1 className="text-4xl">
          Welcome, <span className="font-bold">{user.displayName}</span>!
        </h1>

        <h2 className="text-2xl text-white font-bold">Update profile info</h2>
        <form
          className="inline-flex gap-4"
          onSubmit={(e) => {
            handleUpdateName(e);
          }}
        >
          <input
            type="text"
            name="name"
            ref={nameRef}
            placeholder="Display Name"
            title="Update your display name"
            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            defaultValue={user.displayName}
          />
          <input
            type="submit"
            value="Update"
            className="text-white cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-md"
          />
        </form>
        <h2 className="text-2xl text-white font-bold mt-16">
          Delete user profile
        </h2>
        <p>
          {" "}
          Click the button below to{" "}
          <span className="font-bold">permanently</span> delete your account
        </p>
        <button
          onClick={deleteAccount}
          className="bg-red-500 p-2 rounded-md text-white w-24"
        >
          Delete
        </button>
      </div>
    );
  }
}
