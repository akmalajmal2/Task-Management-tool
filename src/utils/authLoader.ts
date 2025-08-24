import { redirect } from "react-router-dom";
import { auth } from "../firebase";

export default function AuthLoader() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      if (!user) {
        reject(redirect("/login"));
      } else {
        resolve(user);
      }
    });
  });
}
