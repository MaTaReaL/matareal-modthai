export type StorePlatform =
  | "steam"
  | "xbox"
  | "epic"
  | "ea"
  | "gog"
  | "playstation"
  | "nintendo";

/** PC platforms that support modding and appear in catalog platform filters */
export type FilterablePlatform = "steam" | "xbox" | "epic";

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

export interface ModSeriesInfo {
  /** Unique series ID, e.g. "fears-to-fathom", "forza-horizon", "doom" */
  id: string;
  /** Series display name */
  name: string;
  /** Optional Thai subtitle for series */
  thaiName?: string;
  /** Sort order within the series (1, 2, 3...) */
  order: number;
  /** Compact episode/part badge, e.g. "EP1", "EP2", "S2 EP1", "ภาค 6" */
  badgeLabel?: string;
  /** Short description for series collection banner */
  description?: string;
}

export interface CriticMetadata {
  /** Metacritic slug for live score refresh, e.g. "forza-horizon-6" */
  metacriticSlug?: string;
  /** Verified fallback Metacritic score (0-100) */
  metacriticScore?: number;
  metacriticUrl?: string;
  /** OpenCritic Top Critic Average (0-100) */
  openCriticScore?: number;
  openCriticTier?: "Mighty" | "Strong" | "Fair" | "Weak";
  openCriticUrl?: string;
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
  /** Primary Thai genres for catalog filtering */
  genres: string[];
  /** Optional series/franchise grouping so players find related games easily */
  series?: ModSeriesInfo;
  /** Critic scores (Metacritic + OpenCritic) with live refresh support */
  critics?: CriticMetadata;
  /** ISO date YYYY-MM-DD for consistent chronological sorting */
  releasedOrder?: string;
  /** Historical Nexus Mods download count used alongside live web downloads for popularity sort */
  nexusDownloads?: number;
  /** Fallback official THB price if Steam API is temporarily unreachable (0 = Free) */
  estimatedPriceThb?: number;
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

export type ModRequestStatus =
  | "รอพิจารณา"
  | "กำลังทำ"
  | "ทำเสร็จแล้ว"
  | "ทำไม่ได้";

export interface ModRequestItem {
  id: string;
  gameName: string;
  steamAppId?: number;
  steamUrl?: string;
  headerImage?: string;
  priceLabel?: string;
  releaseDate?: string;
  note?: string;
  votes: number;
  status: ModRequestStatus;
  adminReason?: string;
  modSlug?: string;
  createdAt: string;
}
