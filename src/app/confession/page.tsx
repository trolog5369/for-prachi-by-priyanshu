"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Highlighter } from "@/components/ui/highlighter";

export default function ConfessionPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [showHearts, setShowHearts] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);
  useEffect(() => {
    // create audio and try to autoplay (may be blocked by browser)
    audioRef.current = new Audio("/confession.mp3");
    audioRef.current.preload = "auto";
    audioRef.current.loop = true;
    audioRef.current.volume = 0.9;
    audioRef.current
      .play()
      .then(() => {
        // autoplay succeeded
        console.log("confession.mp3 playing");
      })
      .catch((e) => {
        // autoplay blocked or failed
        console.warn("confession.mp3 autoplay failed:", e);
      });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const spawnHearts = () => {
    const pieces = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: 40 + Math.random() * 20, // around center ±10vw
      delay: Math.random() * 0.6,
      size: 18 + Math.floor(Math.random() * 28),
    }));
    setHearts(pieces);
    setShowHearts(true);
    const hide = setTimeout(() => setShowHearts(false), 2200);
    const clear = setTimeout(() => setHearts([]), 2600);
    return () => {
      clearTimeout(hide);
      clearTimeout(clear);
    };
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundImage:
          "linear-gradient(rgba(255,228,236,0.75), rgba(255,228,236,0.75)), url('/confession.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <style>{`
          @font-face {
            font-family: "MomoSignature";
            src: url("/fonts/MomoSignature-Regular.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        <p style={{ fontFamily: "MomoSignature, sans-serif", fontSize: 18, color: "#111", lineHeight: 1.4 }}>
          Ms. Mrugda Patil 😉
          <br /><br />
          I don&apos;t know if you&apos;ll ever realize how much you mean to me, or if I&apos;ve ever been able to express it properly, but today I wanted to try.
          <br /><br />
          It&apos;s crazy to think that we met in 9th class and now almost 8-9 years have passed. So much has changed in our lives, yet somehow one thing never did—you.
          <br /><br />
          There was a time when we barely talked. For almost 5-6 years, our conversations were limited to just birthday wishes. Anyone looking from the outside might think we drifted apart, but the truth is, I never really felt that way.
          <br /><br />
          You were always there.
          <br /><br />
          Not in my chats every day, not in my notifications every morning, but somewhere constant in my life. The kind of person who quietly occupies a place in your heart and never leaves, no matter how much time passes.
          <br /><br />
          I don&apos;t think I&apos;ve ever told you this, but I never let anyone take your place as my best friend. Not because I didn&apos;t meet good people, but because nobody ever felt like you.
          <br /><br />
          Maybe that&apos;s why I missed you so much.
          <br /><br />
          I missed telling you about the smallest things. The random moments during the day when something happened and my first thought was, &quot;Prachi would laugh at this.&quot; I missed having someone who understood me without needing a long explanation.
          <br /><br />
          And then somehow, these last three months happened.
          <br /><br />
          Suddenly we&apos;re back to daily conversations, good mornings, good nights, random updates, stupid jokes, and all those little moments that seem insignificant but somehow become the best part of the day.
          <br /><br />
          Honestly? I didn&apos;t realize how much I had missed this until I got it back.
          <br /><br />
          You know what&apos;s funny? Even during those years when we barely talked, you were still my first priority. Which is actually unfair because you weren&apos;t even doing anything. You had absolutely no right to occupy that much space in my mind while being so casually absent.
          <br /><br />
          Yet somehow, you did.
          <br /><br />
          Sometimes I think some people don&apos;t enter our lives to stay for a season. They become part of the story itself. And that&apos;s what you&apos;ve always been to me.
          <br /><br />
          A comfort. A habit. A safe place. A person I can never fully explain.
          <br /><br />
          The truth is, there are people you meet, and then there are people who become a part of you. You&apos;re the second kind.
          <br /><br />
          Thank you for coming back into my daily life. Thank you for every message, every update, every sarcastic comment, every &quot;good morning&quot; and every &quot;good night.&quot; You probably don&apos;t know it, but those little things mean more than they should.
          <br /><br />
          And if there&apos;s one thing I know for sure after all these years, it&apos;s this: No matter how much time passes, no matter how many years come and go, you&apos;ll always be my favorite person to hear from.
          <br /><br />
          Maybe that&apos;s what makes you so special. Not that you&apos;ve been around for almost a decade. But that after all this time, you still feel like my favorite hello and my hardest goodbye.
          <br /><br />
          <Highlighter action="highlight" color="#FFD166">Love you DHORRRRRRRRRRRRRRRRR</Highlighter> 💋
        </p>

        <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}>
        <button
          type="button"
          style={{
            cursor: "pointer",
            padding: "10px 18px",
            borderRadius: 999,
            color: "#fff",
            fontFamily: "MomoSignature, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
            backgroundImage: "linear-gradient(135deg,#9AD6FF 0%,#8EE7A9 60%,#FFD166 100%)",
            border: "none",
          }}
        >
          100%
        </button>
        <button
          type="button"
          onClick={spawnHearts}
          style={{
            cursor: "pointer",
            padding: "10px 18px",
            borderRadius: 999,
            color: "#fff",
            fontFamily: "MomoSignature, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
            backgroundImage: "linear-gradient(135deg,#FF9AD6 0%,#FFB585 60%,#FFD166 100%)",
            border: "none",
          }}
        >
          200%
        </button>
      </div>
      <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.06)",
              cursor: "pointer",
              fontFamily: "MomoSignature, sans-serif",
              fontWeight: 700
            }}
          >
            Back
          </button>
        </div>
      </div>
      {/* hearts confetti overlay */}
      {showHearts && hearts.length > 0 && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 99999,
            overflow: "hidden",
          }}
        >
          {hearts.map((h) => (
            <span
              key={h.id}
              style={{
                position: "absolute",
                left: `${h.left}%`,
                bottom: "20vh",
                fontSize: `${h.size}px`,
                transform: "translateY(0)",
                opacity: 1,
                animation: `heart-rise 2000ms ${h.delay}s cubic-bezier(.2,.7,.3,1) forwards`,
                filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))",
              }}
            >
              🤍
            </span>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes heart-rise {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          60% { transform: translate3d(calc(-20px + (40px * var(--rand, 0.5))), -40vh, 0) scale(1.05); opacity: 1; }
          100% { transform: translate3d(calc(-40px + (80px * var(--rand, 0.5))), -70vh, 0) scale(0.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
