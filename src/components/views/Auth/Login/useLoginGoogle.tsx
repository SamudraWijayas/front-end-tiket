import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const useLoginGoogle = () => {
  const router = useRouter();
  const callbackUrl = (router.query.callbackUrl as string) || "/";

  const loginGoogle = async () => {
    // 1. Login ke Google via NextAuth
    const result = await signIn("google", { redirect: false, callbackUrl });

    if (result?.ok) {
      // 2. Ambil session NextAuth untuk dapat id_token
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      const id_token = (sessionData.user)?.idToken;

      if (id_token) {
        // 3. Kirim ke backend kamu
        const backendRes = await fetch("/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: id_token }),
        });

        const data = await backendRes.json();
        if (data.meta.status === 200) {
          // Simpan JWT backend misal di cookie/localStorage
          router.push(callbackUrl);
        } else {
          console.error("Backend login failed", data);
        }
      }
    }
  };

  return { loginGoogle };
};

export default useLoginGoogle;
