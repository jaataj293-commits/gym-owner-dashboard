"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchFromWordPress } from "@/lib/wordpress-api";

interface StoredUserCard {
  id: number;
  name: string;
  email: string;
  lastScanAt: string;
  scanCount: number;
}

interface ScanRecord {
  scan_id: number;
  gym_id: number;
  token: string;
  scanned_at: string;
}

export default function UserCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<StoredUserCard[]>([]);
  const [selectedUser, setSelectedUser] = useState<StoredUserCard | null>(null);
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loadingScans, setLoadingScans] = useState(false);
  const [errorScans, setErrorScans] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("gym_user_cards");
    if (raw) {
      try {
        setCards(JSON.parse(raw));
      } catch {
        setCards([]);
      }
    }
  }, []);

  async function loadUserScans(userId: number) {
    setLoadingScans(true);
    setErrorScans("");
    setScans([]);

    try {
      const res = await fetchFromWordPress<{
        success: boolean;
        user_id: number;
        scans: ScanRecord[];
      }>(`/user/scans?user_id=${userId}`);

      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to load scans");
      }

      setScans(res.data.scans || []);
    } catch (err) {
      setErrorScans(err instanceof Error ? err.message : "Failed to load scans");
    } finally {
      setLoadingScans(false);
    }
  }

  function handleCardClick(user: StoredUserCard) {
    setSelectedUser(user);
    loadUserScans(user.id);
  }

  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          padding: "28px",
        }}
      >
        <h1 style={{ marginTop: 0, fontSize: "28px", color: "#111827" }}>
          User Cards
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Tap a card to see user identity and scan history.
        </p>

        {cards.length === 0 ? (
          <p style={{ color: "#6b7280" }}>
            No user cards yet. Scan a QR code first.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            {cards.map((user) => (
              <div
                key={user.id}
                onClick={() => handleCardClick(user)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px",
                  background: "#f9fafb",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
                  {user.name}
                </h3>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#6b7280" }}>
                  {user.email}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#6b7280" }}>
                  Scans: {user.scanCount}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#6b7280" }}>
                  Last: {formatDate(user.lastScanAt)}
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              background: "#fff",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ margin: "0 0 12px", fontSize: "18px" }}>
              {selectedUser.name} — Identity & Report
            </h2>

            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>Identity</h3>
              <p style={{ margin: "4px 0", color: "#374151" }}>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p style={{ margin: "4px 0", color: "#374151" }}>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p style={{ margin: "4px 0", color: "#374151" }}>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p style={{ margin: "4px 0", color: "#374151" }}>
                <strong>Total Scans:</strong> {selectedUser.scanCount}
              </p>
              <p style={{ margin: "4px 0", color: "#374151" }}>
                <strong>Last Scan:</strong> {formatDate(selectedUser.lastScanAt)}
              </p>
            </div>

            <div>
              <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
                Scan History
              </h3>

              {loadingScans && (
                <p style={{ color: "#6b7280" }}>Loading scans...</p>
              )}

              {errorScans && (
                <p style={{ color: "#991b1b" }}>{errorScans}</p>
              )}

              {!loadingScans && !errorScans && scans.length === 0 && (
                <p style={{ color: "#6b7280" }}>No scan records found.</p>
              )}

              {!loadingScans && scans.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "18px", color: "#374151" }}>
                  {scans.map((s) => (
                    <li key={s.scan_id} style={{ marginBottom: "6px" }}>
                      {formatDate(s.scanned_at)} — Gym ID: {s.gym_id}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            padding: "12px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}
