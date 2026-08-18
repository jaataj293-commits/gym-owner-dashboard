"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
    const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
        const [loading, setLoading] = useState<boolean>(false);
          const [error, setError] = useState<string>("");

            const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault(); 
                    setLoading(true);
                        setError("");

                            try {
                                  const res = await fetch("/api/login", {
                                          method: "POST",
                                                  headers: { "Content-Type": "application/json" },
                                                          body: JSON.stringify({ email, password }),
                                                                });

                                                                      const data = await res.json();

                                                                            if (!res.ok) {
                                                                                    setError(data.message || "Login failed");
                                                                                            return;
                                                                                                  }

                                                                                                        if (data.verified) router.push("/dashboard");
                                                                                                              else router.push("https://keniyahost.com/register-your-gym/");
                                                                                                                  } catch {
                                                                                                                        setError("Something went wrong");
                                                                                                                            } finally {
                                                                                                                                  setLoading(false);
                                                                                                                                      }
                                                                                                                                        };

                                                                                                                                          return (
                                                                                                                                              <form onSubmit={handleSubmit}>
                                                                                                                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                                                                                                                                          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                                                                                                                                                <button type="submit" disabled={loading}>
                                                                                                                                                                        {loading ? "Logging in..." : "Login"}
                                                                                                                                                                              </button>
                                                                                                                                                                                    {error && <p>{error}</p>}
                                                                                                                                                                                        </form>
                                                                                                                                                                                          );
                                                                                                                                                                                          }