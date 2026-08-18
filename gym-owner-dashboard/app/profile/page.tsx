"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gym Owner Profile</h1>
      <p>Manage gym owner details here.</p>

      <div style={{ marginTop: "24px" }}>
        <p><strong>Name:</strong> Gym Owner</p>
        <p><strong>Gym:</strong> My Gym</p>
        <p><strong>Phone:</strong> 9876543210</p>
        <p><strong>Address:</strong> Your gym address</p>
      </div>

      <button
        style={{ marginTop: "24px" }}
        onClick={() => router.push("/dashboard")}
      >
        Back to Dashboard
      </button>
    </main>
  );
}
