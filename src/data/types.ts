export type StorePlatform = "steam" | "xbox" | "playstation" | "epic" | "gog";

export interface StoreLink {
  platform: StorePlatform;
  label: string;
  url: string;
  /** Required for live Steam Store API fetching & PC requirements */
  steamAppId?: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

export interface ModMedia {
  /** Mandatory Nexus-spec 1300x372 wide header banner */
  header: string;
  /** Mandatory 1920x1080 (16:9) cover art for cards & featured hero */
  cover: string;
  /** 1200x630 OpenGraph social share card */
  ogImage: string;
  /** Expandable gallery screenshots — add more anytime */
  gallery: GalleryImage[];
}

export interface ModSpecs {
  version: string;
  /** Mandatory field: AI model(s) used for translation/polishing */
  aiModel: string;
  /** Mandatory field: Thai font used in game */
  fontUsed: string;
  /** Mandatory field: Total translated lines & coverage */
  translatedLines: string;
  coveragePercent: number;
  engine: string;
  fileSize: string;
  releasedAt: string;
  updatedAt: string;
  supportedGamePlatform: string;
}

export interface ModFileEntry {
  id: string;
  fileName: string;
  label: string;
  version: string;
  size: string;
  uploadedAt: string;
  sha256: string;
  /** Primary fast direct download (GitHub Releases) */
  primaryUrl: string;
  primaryHost: string;
  /** Optional mirror backup (Google Drive) */
  backupUrl?: string;
  backupHost?: string;
  installNote: string;
  knownNotice?: string;
}

export interface PcSpecRow {
  label: string;
  value: string;
}

export interface FallbackSteamInfo {
  name: string;
  releaseDate: string;
  developers: string[];
  publishers: string[];
  genres: string[];
  shortDescription: string;
  minimumSpecs: PcSpecRow[];
  recommendedSpecs: PcSpecRow[];
}

export interface ModEntry {
  slug: string;
  gameTitle: string;
  thaiTitle: string;
  shortDescription: string;
  overview: string;
  features: string[];
  installSteps: string[];
  installPathExample: string;
  uninstallNote: string;
  credits: { role: string; name: string }[];
  tags: string[];
  seoKeywords: string[];
  media: ModMedia;
  specs: ModSpecs;
  stores: StoreLink[];
  files: ModFileEntry[];
  fallbackSteam?: FallbackSteamInfo;
  nexusModUrl?: string;
  featured?: boolean;
  trending?: boolean;
}

export interface BugReportItem {
  id: string;
  slug: string;
  message: string;
  imagePreview?: string;
  hasImage?: boolean;
  version: string;
  status: "รับเรื่องแล้ว" | "กำลังแก้ไข" | "แก้ไขแล้ว";
  createdAt: string;
}
