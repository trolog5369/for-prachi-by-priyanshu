"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const router = useRouter();
  const images = [
    "/image1.jpeg",
    "/image2.jpeg",
    "/image3.jpeg",
    "/image4.jpeg",
    "/image5.jpeg",
    "/image6.jpeg",
    "/image7.jpeg",
    "/image8.jpeg",
    "/image9.jpeg",
    "/image10.jpeg",
    "/image11.jpeg",
    "/image12.jpeg",
    "/image13.jpeg",
    "/image14.jpeg",
    "/image15.jpeg",
    "/image16.jpeg",
    "/image17.jpeg",
    "/image18.jpeg",
    "/image19.jpeg",
    "/image20.jpeg",
  ];

  const [lightbox, setLightbox] = useState<{ src: string | null }>({ src: null });

  return (
    <div style={{ minHeight: "100vh", padding: 24, background: "#FFE4EC" }}>
      <style>{`
        @font-face {
          font-family: "MomoSignature";
          src: url("/fonts/MomoSignature-Regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .gallery-wrap {
          max-width: 1200px;
          margin: 0 auto;
          font-family: "MomoSignature, sans-serif";
        }

        .pinterest-grid {
          column-width: 260px;
          column-gap: 16px;
        }

        .pinterest-item {
          break-inside: avoid;
          display: inline-block;
          width: 100%;
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f5f5;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          transition: transform 180ms ease, box-shadow 180ms ease;
          cursor: pointer;
        }

        .pinterest-item img {
          width: 100%;
          height: auto;
          display: block;
          vertical-align: middle;
        }

        .pinterest-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .caption {
          padding: 10px 12px;
          font-size: 0.95rem;
          color: #222;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.7);
          z-index: 12000;
          padding: 24px;
        }

        .lightbox img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 18px;
        }

        .btn {
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          cursor: pointer;
          font-family: "MomoSignature, sans-serif";
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .pinterest-grid { column-width: 160px; column-gap: 12px; }
        }
      `}</style>

      <div className="gallery-wrap">
        <h1 style={{ fontSize: 28, marginBottom: 8, textAlign: "center" }}>Gallery</h1>
        <p style={{ textAlign: "center", marginBottom: 20 }}>
          iloveyousmmmmmmm

          </p>

        <div className="pinterest-grid" aria-live="polite">
          {images.map((src, idx) => (
            <div
              key={src + idx}
              className="pinterest-item"
              onClick={() => setLightbox({ src })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setLightbox({ src }); }}
            >
              <img src={src} alt={`gallery-${idx}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="controls" style={{ marginTop: 20 }}>
          <button className="btn" onClick={() => router.push("/")}>Back</button>
        </div>
      </div>

      {lightbox.src && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox({ src: null })}>
          <img src={lightbox.src} alt="enlarged" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
