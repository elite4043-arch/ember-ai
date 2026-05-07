"use client";

export default function Keyframes() {
  return (
    <style jsx global>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes cardFanIn0 {
        from { opacity: 0; transform: translateY(28px) rotate(-0.4deg); }
        to   { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes cardFanIn1 {
        from { opacity: 0; transform: translateY(32px) rotate(0.3deg); }
        to   { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes cardFanIn2 {
        from { opacity: 0; transform: translateY(26px) rotate(-0.2deg); }
        to   { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes cardFanIn3 {
        from { opacity: 0; transform: translateY(34px) rotate(0.4deg); }
        to   { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes cardFanIn4 {
        from { opacity: 0; transform: translateY(30px) rotate(-0.3deg); }
        to   { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes cardFanIn5 {
        from { opacity: 0; transform: translateY(36px) rotate(0.2deg); }
        to   { opacity: 1; transform: translateY(0) rotate(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes planCompress {
        from { width: 100%; }
        to   { width: 33.333%; }
      }
      @keyframes storeReveal {
        from { opacity: 0; transform: translateX(28px) scale(0.985); }
        to   { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes ignitionFlash {
        0%   { opacity: 0; transform: scale(0.85); }
        35%  { opacity: 1; transform: scale(1.05); }
        100% { opacity: 0; transform: scale(1.15); }
      }
      @keyframes firePulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%      { transform: scale(1.2); opacity: 0.82; }
      }
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes ripple {
        from { transform: translate(-50%, -50%) scale(0); opacity: 0.45; }
        to   { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
      }
      .ripple-btn {
        position: relative;
        overflow: hidden;
      }
      .ripple-btn::after {
        content: "";
        position: absolute;
        width: 60px; height: 60px;
        border-radius: 50%;
        background: rgba(234,88,12,0.28);
        pointer-events: none;
        opacity: 0;
      }
      .ripple-btn:active::after {
        left: 50%; top: 50%;
        animation: ripple 0.5s ease forwards;
      }
      .idea-card {
        transition: transform 0.22s ease, box-shadow 0.22s ease !important;
      }
      .idea-card:hover {
        transform: translateY(-4px) !important;
      }
      input[type="color"] {
        -webkit-appearance: none;
        appearance: none;
        padding: 0;
      }
      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 2px;
        border-radius: 6px;
      }
      input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: 4px;
      }
    `}</style>
  );
}