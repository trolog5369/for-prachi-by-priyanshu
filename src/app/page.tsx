"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { LightRays } from "@/components/ui/light-rays";
import { Highlighter } from "@/components/ui/highlighter";
import SplitText from "@/components/SplitText";
import Lenis from 'lenis';
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const lenisRef = useRef<any | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // new: popup visibility
  const [hugHover, setHugHover] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const rafIdRef = useRef<number | null>(null);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };


  useEffect(() => {
  if (progressCount === 4) {
    // show confetti
    setShowConfetti(true);

    // hide confetti after 3s, then show popup shortly after
    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
      // small delay before showing popup so it appears after confetti
      const popupTimer = setTimeout(() => setShowPopup(true), 400);
      // clear popup timer if component unmounts/cleanup
      return () => clearTimeout(popupTimer);
    }, 3000);

    return () => clearTimeout(hideTimer);
  }
}, [progressCount]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      
    });
    lenisRef.current = lenis;

    const loop = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        if (typeof lenisRef.current.destroy === "function") {
          lenisRef.current.destroy();
        }
        lenisRef.current = null;
      }
    };
  }, []);



  return (
    <>
    <ScrollProgress />
    {showConfetti && <ConfettiAnimation />}

    {/* popup: blurred translucent backdrop with centered box and button */}
    {showPopup && (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
          zIndex: 11000,
          pointerEvents: "auto",
        }}
        onClick={() => setShowPopup(false)} /* click backdrop to close */
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            minWidth: 280,
            maxWidth: "90%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 12, color: "#fff", fontFamily: "MomoSignature, sans-serif", fontSize: 18 }}>
            you completed the task! 🤍 now go read the confession
          </div>
          <button
            type="button"
            onClick={() => {
              setShowPopup(false);
              router.push("/confession");
            }}
            style={{
              cursor: "pointer",
              padding: "10px 18px",
              borderRadius: 999,
              color: "#fff",
              
              fontWeight: 700,
              fontSize: 15,
              backgroundImage:
                "linear-gradient(135deg,#ff6ec7 0%,#ff8a65 50%,#ffd166 100%)",
              border: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            view confession
          </button>
        </div>
      </div>
    )}
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <LightRays />
      </div>

      <style jsx global>{`
        @font-face {
          font-family: "MomoSignature";
          src: url("/fonts/MomoSignature-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        .responsive-title {
          /* preserve default (desktop) sizing from Tailwind's text-4xl */
        }
        @media (max-width: 640px) {
          .responsive-title {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
          }
        }

        /* spacing helper for h1 content */
        .h1-content {
          display: inline-flex;
          align-items: center;
          gap: 40px;
        }

        /* small reset for the inline button */
        .play-btn {
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
        }

        /* default position for the split-note container */
        .split-note {
          bottom: 300px;
        }

        /* on mid/tall screens (e.g. ~1290 x 2796) raise the split-note */
        @media (min-width: 1200px) and (min-height: 2500px) {
          .split-note {
            bottom: 360px; /* increase to push the element upward */
          }
        }
      `}</style>

      <h1
        className="text-4xl mt-6 ml-5 responsive-title"
        style={{ fontFamily: "MomoSignature, sans-serif" }}
      >
        <span className="h1-content">
          <span>🧸 Prachi 🤍</span>
        </span>
      </h1>
      {/* Spotify embed player */}
      <div style={{ width: "100%", maxWidth: 400, margin: "12px auto 0", padding: "0 16px" }}>
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/2n6oWESOIupJKbkgW0QCh4?theme=0"
          width="100%"
          height={80}
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist"
        />
      </div>
      {/* Decorative emojis */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 8, marginTop: 4, fontSize: 18, opacity: 0.7 }}>
        <span>🌹</span><span>🤍</span><span>🧸</span><span>🤍</span><span>🌹</span>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Image
          src="/heart.png"
          alt="heart"
          width={90}
          height={90}
          style={{ width: 90, height: 90 }}
          priority
        />
      </div>
       <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 5 }}>
        <div style={{ width: "100%", maxWidth: 2400, display: "block" }}>
          <Image
            src="/her.jpeg"
            alt="her"
            width={2400} 
            height={1350}
            style={{ width: "100%", height: "auto", display: "block", maxHeight: 1350 }}
            priority
          />
        </div>
      </div>
      
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 800,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          }}
        >
          <Image
            src="/bottom.jpeg"
            alt="bottom"
            width={800}
            height={200}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            priority
          />
        </div>
      </div>
      
    </div>
    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 24 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 800,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Image
          src="/card.png"
          alt="card"
          width={800}
          height={400}
          style={{ width: "110%", height: "auto", display: "block" }}
          priority
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            marginTop: "-35px",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            padding: 20,
          }}
        >
          <div
            style={{
              color: "black",
              textAlign: "center",
              fontFamily: "MomoSignature, sans-serif",
              fontSize: "1.2rem",
              textShadow: "0 4px 12px rgba(0,0,0,0.6)",
              pointerEvents: "auto",
              maxWidth: 420,          
              width: "100%",
              margin: "0 auto",       
              padding: "0 12px",    
            }}
          >
            The thing is, I don&apos;t get jealous.{" "}
            I simply have very strong opinions about who deserves your attention.{" "}
            And strangely, my opinion is always:{" "}
            <Highlighter action="highlight" color="#87CEFA">ME</Highlighter> 😌
            <br /><br />
            It&apos;s either ME and NO ONE ELSE{" "}
            or{" "}
            EVERYBODY and NEVER ME
            <br /><br />
            Every single time. ☺️
            <br /><br />
            <Highlighter action="underline" color="#e30202">Happy Bestfriend&apos;s Day</Highlighter> 🤍
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop: 8,
            fontFamily: "MomoSignature, sans-serif",
            pointerEvents: "auto",
          }}
        >
          <h3 style={{ margin: 30 }}>i have something to confess tho😓</h3>
        </div>
      </div>
    </div>
      <div
        className="split-note"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 25,
          width: "100%",
          maxWidth: 800,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "auto",
          padding: "0 16px",
          fontFamily: "MomoSignature, sans-serif",
        }}
      >
         <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
           {/* small kiss image on the left */}
           <div style={{ alignItems: "center", pointerEvents: "auto" }}>
             <Image src="/kiss.png" alt="kiss" width={38} height={38} />
           </div>
 
           <SplitText
             text="You have a note below <3"
             className="text-sm text-center"
             delay={100}
             duration={0.6}
             ease="power3.out"
             splitType="chars"
             from={{ opacity: 0, y: 40 }}
             to={{ opacity: 1, y: 0 }}
             threshold={0.1}
             rootMargin="-80px"
             textAlign="center"
             onLetterAnimationComplete={handleAnimationComplete}
           />
         </div>
       </div>
      
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-end" }}>
          {/* left: cat + bubble + button */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: 220 }}>
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + (-12px))",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              color: "#000",
              padding: "8px 12px",
              borderRadius: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              fontWeight: 700, 
              fontSize: 14,
              fontFamily: "MomoSignature, sans-serif",
              textAlign: "center",
              pointerEvents: "auto",
              zIndex: 5,
            }}
          >
            feed meee dear :3
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "87%", 
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #fff",
              zIndex: 5,
            }}
          />
          <Image
            src="/cat.png"
            alt="cat"
            width={220}
            height={220}
            style={{ width: 220, height: 220, display: "block", borderRadius: 8 }}
            priority
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <button
              type="button"
              onMouseEnter={() => setHugHover(true)}
              onMouseLeave={() => setHugHover(false)}
              onClick={() => setProgressCount((c) => Math.min(4, c + 1))}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: 999,
                color: "#fff",
                fontFamily: "MomoSignature, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                transform: hugHover ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                backgroundImage:
                  "linear-gradient(135deg,#ff6ec7 0%,#ff8a65 50%,#ffd166 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 4px)",
                backgroundBlendMode: "overlay, normal",
                border: "1px solid rgba(255,255,255,0.12)",
                paddingLeft: 22,
                paddingRight: 22,
              }}
              aria-label="Hugs and kisses"
            >
              hugs n kisses
            </button>
            </div>
          </div>
          <div style={{ width: 24, height: 200, background: "rgba(0,0,0,0.06)", borderRadius: 12, overflow: "hidden",
            marginBottom: 10, display: "flex", alignItems: "flex-end" }}>
            <div
              aria-hidden
              style={{
                width: "100%",
                height: `${(progressCount / 4) * 100}%`,
                background: "linear-gradient(180deg,#ffd166,#ff6ec7)",
                transition: "height 240ms ease",
              }}
            />
          </div>
        </div>
      </div>
      {/* Decorative divider */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 8, padding: 12, fontSize: 16, opacity: 0.6 }}>
        <span>🤍</span><span>🌹</span><span>🧸</span><span>🌹</span><span>🤍</span>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", fontFamily: "MomoSignature, sans-serif", color: "#000", opacity: 0.95 }}>
          okayyy soo here we have our own gallery and playlist
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}>
        <button
          type="button"
          onClick={() => window.open("https://open.spotify.com/playlist/2n6oWESOIupJKbkgW0QCh4", "_blank", "noopener,noreferrer")}
          style={{
            cursor: "pointer",
            padding: "10px 18px",
            borderRadius: 999,
            color: "#fff",
            fontFamily: "MomoSignature, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
            backgroundImage: "linear-gradient(135deg,#FF9EC7 0%,#FFB0C7 60%,#FFD1DC 100%)",
            border: "none",
          }}
        >
          Playlist
        </button>
        
        <button
          type="button"
          onClick={() => router.push("/gallery")}
          style={{
            cursor: "pointer",
            padding: "10px 18px",
            borderRadius: 999,
            color: "#fff",
            fontFamily: "MomoSignature, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
            backgroundImage: "linear-gradient(135deg,#FF6EC7 0%,#FF8A65 60%,#FFD166 100%)",
            border: "none",
          }}
        >
          Gallery
        </button>
      </div>
      
    </>
  );
}

function ConfettiAnimation() {
  const EMOJIS = ["🐱", "❤️", "🎉"];
  const pieces = Array.from({ length: 70 });

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100vh",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        {pieces.map((_, i) => {
          // randomize trajectory & timing per piece
          const tx = `${(Math.random() * 200 - 100).toFixed(2)}vw`; // horizontal travel: -100vw -> +100vw
          const ty = `-${(50 + Math.random() * 120).toFixed(2)}vh`; // vertical travel: -50vh -> -170vh (goes up)
          const delay = (Math.random() * 0.6).toFixed(2) + "s";
          const duration = (1.6 + Math.random() * 1.6).toFixed(2) + "s";
          const rotate = (Math.random() * 720).toFixed(2) + "deg";
          const spinDuration = (0.8 + Math.random() * 1.8).toFixed(2) + "s";
          const scale = (0.9 + Math.random() * 0.9).toFixed(2);
          const leftOffset = 50 + (Math.random() * 40 - 20); // start around center ±20vw
          const fontSize = Math.floor(18 + Math.random() * 28);

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                // start slightly above bottom so it looks like it launches from the cat/button area
                bottom: `${8 + Math.random() * 6}vh`,
                left: `${leftOffset}vw`,
                fontSize: `${fontSize}px`,
                lineHeight: 1,
                transform: `translate3d(0,0,0) rotate(${(Math.random() * 180).toFixed(0)}deg)`,
                willChange: "transform, opacity",
                // pass randomized values into CSS via custom properties
                // TSX allows inline custom properties like any other style key
                // @ts-ignore - some projects may complain, but it's fine in runtime
                ["--tx" as any]: tx,
                ["--ty" as any]: ty,
                ["--d" as any]: duration,
                ["--delay" as any]: delay,
                ["--rot" as any]: rotate,
                ["--spin" as any]: spinDuration,
                ["--scale" as any]: scale,
                animation: `emoji-scatter var(--d) cubic-bezier(.1,.8,.2,1) var(--delay) forwards, emoji-spin var(--spin) linear var(--delay) forwards`,
                opacity: 0,
                display: "inline-block",
                pointerEvents: "none",
              }}
            >
              {EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}
            </span>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes emoji-scatter {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale( var(--scale) );
            opacity: 1;
          }
          30% {
            /* quick burst / upward acceleration */
            transform: translate3d(calc(var(--tx) * 0.35), calc(var(--ty) * 0.6), 0) rotate(calc(var(--rot) * 0.35)) scale(calc(var(--scale) * 1.05));
            opacity: 1;
          }
          65% {
            /* slower drift as it reaches peak */
            transform: translate3d(calc(var(--tx) * 0.7), calc(var(--ty) * 0.9), 0) rotate(calc(var(--rot) * 0.7)) scale(calc(var(--scale) * 1.02));
            opacity: 0.95;
          }
          100% {
            transform: translate3d(var(--tx), var(--ty), 0) rotate(var(--rot)) scale(calc(var(--scale) * 0.95));
            opacity: 0;
          }
        }

        @keyframes emoji-spin {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg) scale(1.02);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        /* tiny optimization: make the container ignore pointer events and avoid text selection */
        div[aria-hidden] {
          user-select: none;
        }
      `}</style>
    </>
  );
}

