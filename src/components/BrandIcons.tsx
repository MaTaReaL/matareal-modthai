"use client";

import {
  siSteam,
  siPlaystation,
  siEpicgames,
  siGogdotcom,
  siGithub,
  siDiscord,
  siMetacritic,
  siFacebook,
  siGooglegemini,
  siClaude,
  siUnrealengine,
  siUnity,
  siGodotengine,
  siMeta,
  siDeepseek,
} from "simple-icons";
import type { StorePlatform } from "@/data/types";

interface IconProps {
  className?: string;
}

function SimpleIconSvg({
  path,
  color,
  className = "w-4 h-4",
  title,
}: {
  path: string;
  color?: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color || "currentColor"}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={path} />
    </svg>
  );
}

/** Official Steam Brand Mark */
export function SteamLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siSteam.path} color="#66C0F4" className={className} title="Steam" />;
}

/** Official Xbox Sphere-X Mark */
export function XboxLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#107C10" className={className} aria-label="Xbox">
      <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912A11.96 11.96 0 0 0 24 12.004a11.95 11.95 0 0 0-3.57-8.536s-.027-.022-.082-.042a.122.122 0 0 0-.029-.01c-.82-.285-2.701.298-5.057 3.211zM3.654 3.426c-.055.02-.082.042-.082.042A11.95 11.95 0 0 0 0 12.004c0 2.854 1.003 5.474 2.662 7.535-1.408-2.599 3.576-9.951 6.077-12.912C6.382 3.714 4.501 3.131 3.683 3.416a.122.122 0 0 0-.029.01zM12 3.576S9.14 1.747 6.622 2.023c-.562.062-1.112.19-1.635.377A11.92 11.92 0 0 1 12 0c2.608 0 5.02.835 6.986 2.253-.515-.183-1.057-.308-1.608-.369C14.86 1.608 12 3.576 12 3.576z" />
    </svg>
  );
}

/** Official PlayStation Mark */
export function PlayStationLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <SimpleIconSvg path={siPlaystation.path} color="#0070D1" className={className} title="PlayStation" />
  );
}

/** Official Epic Games Shield */
export function EpicLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siEpicgames.path} color="#FFFFFF" className={className} title="Epic Games" />;
}

/** Official GOG Mark */
export function GogLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siGogdotcom.path} color="#B77CEE" className={className} title="GOG" />;
}

/** Official Nexus Mods Orange Sphere with 4 Inward Swirling White Arrows */
export function NexusModsLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Nexus Mods">
      <defs>
        <radialGradient id="nexusSphere" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFB866" />
          <stop offset="55%" stopColor="#F3983E" />
          <stop offset="100%" stopColor="#D67422" />
        </radialGradient>
      </defs>
      {/* Subtle dark outline backing + iconic orange sphere */}
      <circle cx="32" cy="32" r="29" fill="#0B0B0D" />
      <circle cx="32" cy="32" r="24" fill="url(#nexusSphere)" />
      {/* 4 symmetric inward-pointing curved white arrows (90-degree rotation) */}
      {[0, 90, 180, 270].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 32 32)`}>
          <path
            d="M46.5 9.5 C51.5 13.5 52.5 19.5 47.5 23.5 L42.5 27.2 L45.5 30.2 L33.5 30.5 L34.2 18.5 L37.2 21.5 L41.5 17.8 C43.8 15.8 43.2 12.8 40.5 10.6 Z"
            fill="#F4F4F6"
            stroke="#0B0B0D"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

/** Official GitHub Octocat */
export function GitHubLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siGithub.path} color="#FFFFFF" className={className} title="GitHub" />;
}

/** Official Multi-Color Google Drive Triangle */
export function GoogleDriveLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Google Drive">
      <path fill="#0066DA" d="M4.43 20.5 7.82 14.6h13.75l-3.39 5.9H4.43z" />
      <path fill="#00AC47" d="M8.6 3.5 1.82 15.24l3.39 5.26L12 8.76 8.6 3.5z" />
      <path fill="#FFBA00" d="M15.4 3.5H8.6l6.78 11.74h6.8L15.4 3.5z" />
      <path fill="#2684FC" d="M8.6 14.6 5.21 20.5h13.58l-3.39-5.9H8.6z" opacity="0.25" />
    </svg>
  );
}

/** Official Discord Logo */
export function DiscordLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siDiscord.path} color="#5865F2" className={className} title="Discord" />;
}

/** Official Metacritic Badge Mark */
export function MetacriticLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <SimpleIconSvg path={siMetacritic.path} color="#FFCC34" className={className} title="Metacritic" />
  );
}

/** Official Facebook Logo */
export function FacebookLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siFacebook.path} color="#1877F2" className={className} title="Facebook" />;
}

/** Official Google Gemini Star (Gradient) */
export function GeminiLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Google Gemini">
      <defs>
        <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4E8CFF" />
          <stop offset="50%" stopColor="#9B72FF" />
          <stop offset="100%" stopColor="#FF6BA9" />
        </linearGradient>
      </defs>
      <path fill="url(#geminiGrad)" d={siGooglegemini.path} />
    </svg>
  );
}

/** Official OpenAI / GPT Blossom Mark */
export function OpenAiLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#10A37F" className={className} aria-label="OpenAI GPT">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

/** Official Claude Sunburst Mark */
export function ClaudeLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siClaude.path} color="#D97757" className={className} title="Claude" />;
}

/** Official DeepSeek Mark */
export function DeepSeekLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siDeepseek.path} color="#5786FE" className={className} title="DeepSeek" />;
}

/** Official Meta / Llama Mark */
export function MetaLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siMeta.path} color="#0081FB" className={className} title="Meta" />;
}

/** Official Unreal Engine Mark */
export function UnrealLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siUnrealengine.path} color="#FFFFFF" className={className} title="Unreal Engine" />;
}

/** Official Unity Mark */
export function UnityLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siUnity.path} color="#FFFFFF" className={className} title="Unity" />;
}

/** Official Godot Mark */
export function GodotLogo({ className = "w-4 h-4" }: IconProps) {
  return <SimpleIconSvg path={siGodotengine.path} color="#478CBF" className={className} title="Godot" />;
}

/** Koei Tecmo Katana Engine Blade Emblem */
export function KatanaEngineLogo({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Katana Engine">
      <path
        fill="#E11D48"
        d="M21.2 2.8c-1.8.4-5.4 2.2-9.5 6.3L6.2 14.6l-1.4-1.4-1.4 1.4 2.1 2.1-2.9 2.9 1.8 1.8 2.9-2.9 2.1 2.1 1.4-1.4-1.4-1.4 5.5-5.5c4.1-4.1 5.9-7.7 6.3-9.5z"
      />
    </svg>
  );
}

/** Auto-selects real brand logo for a store platform */
export function StoreLogo({
  platform,
  className = "w-4 h-4",
}: {
  platform: StorePlatform;
  className?: string;
}) {
  switch (platform) {
    case "steam":
      return <SteamLogo className={className} />;
    case "xbox":
      return <XboxLogo className={className} />;
    case "playstation":
      return <PlayStationLogo className={className} />;
    case "epic":
      return <EpicLogo className={className} />;
    case "gog":
      return <GogLogo className={className} />;
  }
}

/** Auto-detects all AI brand logos mentioned in an aiModel string */
export function AiModelLogos({
  model,
  className = "w-4 h-4",
}: {
  model: string;
  className?: string;
}) {
  const lower = model.toLowerCase();
  const logos: React.ReactNode[] = [];

  if (lower.includes("gemini") || lower.includes("gemma")) {
    logos.push(<GeminiLogo key="gemini" className={className} />);
  }
  if (lower.includes("gpt") || lower.includes("openai")) {
    logos.push(<OpenAiLogo key="openai" className={className} />);
  }
  if (lower.includes("claude")) {
    logos.push(<ClaudeLogo key="claude" className={className} />);
  }
  if (lower.includes("deepseek")) {
    logos.push(<DeepSeekLogo key="deepseek" className={className} />);
  }
  if (lower.includes("llama") || lower.includes("meta")) {
    logos.push(<MetaLogo key="meta" className={className} />);
  }

  if (!logos.length) return null;
  return <span className="inline-flex items-center gap-1 shrink-0">{logos}</span>;
}

/** Auto-detects official game engine logo */
export function EngineLogo({
  engine,
  className = "w-4 h-4",
}: {
  engine: string;
  className?: string;
}) {
  const lower = engine.toLowerCase();
  if (lower.includes("unreal")) return <UnrealLogo className={className} />;
  if (lower.includes("unity")) return <UnityLogo className={className} />;
  if (lower.includes("godot")) return <GodotLogo className={className} />;
  if (lower.includes("katana")) return <KatanaEngineLogo className={className} />;
  return null;
}

/** Auto-detects host logo (GitHub / Google Drive) */
export function HostLogo({
  host,
  className = "w-4 h-4",
}: {
  host: string;
  className?: string;
}) {
  const lower = host.toLowerCase();
  if (lower.includes("github")) return <GitHubLogo className={className} />;
  if (lower.includes("drive") || lower.includes("google")) return <GoogleDriveLogo className={className} />;
  return null;
}
