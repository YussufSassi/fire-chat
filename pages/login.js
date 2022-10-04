import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
export default function Login() {
  const [user, loading] = useAuthState(auth);

  const route = useRouter();
  useEffect(() => {
    if (user && !loading) route.push("/dashboard");
  }, [route, user, loading]);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log(e);
    }
  };
  const GitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center flex-col gap-4 w-1/2 m-auto">
      <h1>{user && user.displayName}</h1>
      {loading && <h1>loading...</h1>}
      {!loading && !user ? (
        <>
          <h1 className="font-bold text-2xl">
            Please sign in/up via one of the methods below
          </h1>
          <button
            onClick={GoogleLogin}
            className="p-2 h-10 rounded-md bg-white hover:bg-gray-200 text-black font-bold inline-flex justify-center gap-1 items-center"
          >
            <FcGoogle size={"2rem"} /> Sign in with Google
          </button>
          <button
            onClick={GitHubLogin}
            className="p-2 h-10 rounded-md bg-white hover:bg-gray-200 text-black font-bold inline-flex justify-center gap-1 items-center"
          >
            <FaGithub size={"2rem"} /> Sign in with GitHub
          </button>
        </>
      ) : null}
    </div>
  );
}
