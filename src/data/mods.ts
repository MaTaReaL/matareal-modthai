import type { ModEntry } from "./types";

/**
 * ศูนย์ข้อมูลม็อดของ MaTaReaL ม็อดไทย
 * วิธีเพิ่มม็อดใหม่ในอนาคต:
 * 1. นำรูป header.webp (1300x372) + cover.webp (1920x1080) + gallery-*.webp ใส่ใน public/mods/<slug>/
 * 2. เพิ่มออบเจกต์ ModEntry ใหม่ในอาเรย์ MODS ด้านล่างนี้ 1 ชุด
 * ระบบหน้าแรก, หน้าม็อด, SEO, Sitemap, Steam API, ยอดโหลดจริง และแจ้งบัคจะทำงานให้อัตโนมัติทันที
 */
export const MODS: ModEntry[] = [
  {
    slug: "venus-vacation-prism-dead-or-alive-xtreme",
    gameTitle: "Venus Vacation PRISM - DEAD OR ALIVE Xtreme",
    thaiTitle: "Venus Vacation PRISM - DEAD OR ALIVE Xtreme ม็อดภาษาไทย",
    shortDescription:
      "ม็อดแปลภาษาไทยสำหรับ Venus Vacation PRISM 100% แปลครบทั้งเนื้อเรื่อง แชท เมนู และชื่อชุด พร้อมโลโก้เกมภาษาไทย ฟอนต์ Mitr | Steam",
    overview:
      "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Venus Vacation PRISM - DEAD OR ALIVE Xtreme เกลาสำนวนลื่นไหลเป็นธรรมชาติตามบุคลิกตัวละครทุกตัว คงคำลงท้ายภาษาญี่ปุ่น (ซัง / จัง / คุง / ท่าน) ตรงตามเสียงพากย์ต้นฉบับ พร้อมโลโก้หน้าหลักภาษาไทยแบบขยับครบ 277 เฟรม และฟอนต์ Mitr SDF ปรับจูนเฉพาะสำหรับ Katana Engine",
    features: [
      "แปลภาษาไทยครบ 13,946 รายการ (จาก 14,475 บรรทัด) ครอบคลุมเนื้อเรื่องหลัก แชทสมาร์ทโฟน เมนู และชื่อชุดทั้งหมด",
      "โลโก้เกมภาษาไทย “วีนัส เวเคชัน - เดด ออร์ อะไลฟ์ เอ็กซ์ตรีม - ปริซึม” แทนที่ครบแอนิเมชัน 277 เฟรม",
      "ฟอนต์ไทย Mitr SDF ปรับพิกัดสระและวรรณยุกต์สำหรับ Katana Engine อ่านสบายตา ไม่มีสระลอย",
      "คงคำเรียกขานภาษาญี่ปุ่น (ซัง / จัง / คุง / ท่าน) และสรรพนามตรงตามเพศและบริบททุกตัวละคร",
      "แพ็กเกจสะอาด ปลอดภัย 100% ไม่มีไฟล์สคริปต์ (.bat / .exe) ลากวางทับใช้งานได้ทันที ไม่กระทบเซฟเกม",
    ],
    installSteps: [
      "ดาวน์โหลดและแตกไฟล์ VenusVacationPRISM_ThaiMod_v1.0.zip",
      "นำโฟลเดอร์ archive และ fdata_package ไปวางทับลงในโฟลเดอร์หลักของเกม",
      "กดยืนยันวางทับทั้ง 4 ไฟล์ แล้วเปิดเกมเล่นเป็นภาษาไทยได้ทันที",
    ],
    installPathExample:
      "Steam\\steamapps\\common\\Venus Vacation PRISM - DEAD OR ALIVE Xtreme -\\",
    uninstallNote:
      "เปิด Steam → คลิกขวาที่ตัวเกม → Properties → Installed Files → กด Verify integrity of game files ระบบจะคืนค่าไฟล์ต้นฉบับทั้ง 4 ไฟล์อัตโนมัติ (ไม่กระทบเซฟเกม)",
    credits: [
      { role: "Thai Localization & Modding", name: "MaTaReaL" },
      { role: "Thai Font", name: "Mitr (SIL Open Font License 1.1)" },
    ],
    tags: ["แปลภาษาไทย 100%", "โลโก้ไทย 277 เฟรม", "Mitr SDF", "Katana Engine", "Steam PC"],
    seoKeywords: [
      "Venus Vacation PRISM - DEAD OR ALIVE Xtreme ม็อดไทย",
      "Venus Vacation PRISM ม็อดไทย",
      "Venus Vacation PRISM ม็อดภาษาไทย",
      "Venus Vacation PRISM แปลไทย",
      "DEAD OR ALIVE Xtreme PRISM ม็อดไทย",
      "ดาวน์โหลดม็อดไทย Venus Vacation PRISM",
      "MaTaReaL ม็อดไทย",
      "MaTaReaL ModThai",
      "ม็อดแปลภาษาไทย Steam",
    ],
    featured: true,
    media: {
      // บังคับมี 2 ภาพหลักมาตรฐานเดียวกับ Nexus Mods (Header 1300x372 & Cover 1920x1080)
      header: "/mods/venus-vacation-prism/header.webp",
      cover: "/mods/venus-vacation-prism/cover.webp",
      ogImage: "/mods/venus-vacation-prism/og-share.jpg",
      // ภาพแกลเลอรีเพิ่มเติม (เพิ่ม/ลบภายหลังได้ตลอด)
      gallery: [
        {
          src: "/mods/venus-vacation-prism/gallery-01.webp",
          alt: "ปกม็อดภาษาไทย Venus Vacation PRISM",
          caption: "ภาพปกม็อดภาษาไทย",
          tag: "Cover",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-02.webp",
          alt: "ตัวอย่างม็อดภาษาไทยฉากคาเฟ่",
          caption: "ตัวอย่างฉากคาเฟ่",
          tag: "Showcase",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-03.webp",
          alt: "หน้าหลักเกมและโลโก้ภาษาไทย",
          caption: "หน้าหลักและโลโก้ภาษาไทย",
          tag: "Title",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-04.webp",
          alt: "เมนูตั้งค่าระบบภาษาไทย",
          caption: "เมนูตั้งค่าระบบ",
          tag: "Settings",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-05.webp",
          alt: "โหมดถ่ายภาพชายหาด",
          caption: "โหมดถ่ายภาพชายหาด",
          tag: "Photo Mode",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-06.webp",
          alt: "เมนูปรับค่ากล้องภาษาไทย",
          caption: "เมนูปรับตั้งค่ากล้อง",
          tag: "Camera",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-07.webp",
          alt: "แชทสมาร์ทโฟนภาษาไทย",
          caption: "แชทสมาร์ทโฟนและตัวเลือกบทสนทนา",
          tag: "Chat",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-08.webp",
          alt: "หน้าจอคัดเลือกภาพถ่าย",
          caption: "หน้าจอคัดเลือกภาพถ่าย",
          tag: "Gallery",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-09.webp",
          alt: "โหมดถ่ายภาพคู่ริมสระ",
          caption: "โหมดถ่ายภาพคู่",
          tag: "Photo Mode",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-10.webp",
          alt: "ตัวอย่างฟอนต์ Mitr SDF",
          caption: "รายละเอียดฟอนต์ไทย Mitr SDF",
          tag: "Font",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-11.webp",
          alt: "ซับไตเติลบทสนทนาภายในห้อง",
          caption: "ซับไตเติลบทสนทนา",
          tag: "Dialogue",
        },
        {
          src: "/mods/venus-vacation-prism/gallery-12.webp",
          alt: "ซับไตเติลบทสนทนาฉากชายหาด",
          caption: "ซับไตเติลฉากชายหาด",
          tag: "Dialogue",
        },
      ],
    },
    specs: {
      version: "v1.0",
      // ระบุชื่อตระกูลครั้งเดียว ไม่ซ้ำ และเรียงโมเดลใหญ่ขึ้นก่อนเสมอ
      aiModel: "Gemini 4 Neon / Hydrogen",
      fontUsed: "Mitr SDF (ปรับพิกัดสระ Katana)",
      translatedLines: "13,946 / 14,475 บรรทัด (100%)",
      coveragePercent: 100,
      engine: "Katana Engine",
      fileSize: "82.0 MB",
      releasedAt: "24 พ.ย. 2026",
      updatedAt: "24 พ.ย. 2026",
      supportedGamePlatform: "Steam (PC)",
    },
    stores: [
      {
        platform: "steam",
        label: "Steam (PC)",
        url: "https://store.steampowered.com/app/3155730/Venus_Vacation_PRISM__DEAD_OR_ALIVE_Xtreme/",
        steamAppId: 3155730,
      },
      {
        platform: "playstation",
        label: "PlayStation Store (PS5 / PS4)",
        url: "https://store.playstation.com/en-th/search/venus%20vacation%20prism",
      },
    ],
    files: [
      {
        id: "vvp-v1-0",
        fileName: "VenusVacationPRISM_ThaiMod_v1.0.zip",
        label: "VenusVacationPRISM ThaiMod v1.0 (Main File)",
        version: "v1.0",
        size: "82.0 MB",
        uploadedAt: "24 พ.ย. 2026",
        sha256: "d5da97bbf964931541b724fbb9505817c3f1ec7adc2503d56ce68228203acccc",
        // แทนที่ URL ด้านล่างด้วยลิงก์ไฟล์จริงจาก GitHub Releases และ Google Drive ของคุณแมทธิว
        primaryUrl:
          process.env.VVP_GITHUB_RELEASE_URL ||
          "https://github.com/MaTaReaL1/matareal-modthai-releases/releases/download/vvp-v1.0/VenusVacationPRISM_ThaiMod_v1.0.zip",
        primaryHost: "GitHub Releases",
        backupUrl:
          process.env.VVP_GDRIVE_MIRROR_URL ||
          "https://drive.google.com/",
        backupHost: "Google Drive",
        installNote:
          "นำโฟลเดอร์ archive และ fdata_package ไปวางทับในโฟลเดอร์หลักของเกมได้เลย กดแทนที่ไฟล์ทั้งหมด",
        knownNotice:
          "ตัวอักษรอาจมีตกบรรทัดหรือเบียดอยู่บ้างในจุดคำอธิบายที่ตัวเล็กมาก ส่วนซับหลักและเมนู UI ทั่วไปอ่านชัดเจนปกติครับ",
      },
    ],
    fallbackSteam: {
      name: "Venus Vacation PRISM - DEAD OR ALIVE Xtreme -",
      releaseDate: "26 มี.ค. 2025",
      developers: ["KOEI TECMO GAMES CO., LTD."],
      publishers: ["KOEI TECMO GAMES CO., LTD."],
      genres: ["ผจญภัย", "แคชชวล"],
      shortDescription:
        "เกมโรแมนติกแอดเวนเจอร์เต็มรูปแบบภาคแรกในซีรีส์ DEAD OR ALIVE Xtreme สัมผัสเรื่องราวความรักและการถ่ายภาพบนเกาะวีนัสกับ 6 สาวสุดน่ารัก",
      minimumSpecs: [
        { label: "ระบบปฏิบัติการ", value: "Windows 10 / 11 64-bit" },
        { label: "โปรเซสเซอร์", value: "Intel Core i5-7400 / AMD Ryzen 3 3200G ขึ้นไป" },
        { label: "หน่วยความจำ", value: "RAM 8 GB" },
        { label: "กราฟิกส์", value: "GTX 1650 (4GB) / Radeon RX 570 (4GB) ขึ้นไป" },
        { label: "DirectX", value: "เวอร์ชัน 12" },
        { label: "พื้นที่เก็บข้อมูล", value: "พื้นที่ว่าง 32 GB (แนะนำ SSD)" },
      ],
      recommendedSpecs: [
        { label: "ระบบปฏิบัติการ", value: "Windows 10 / 11 64-bit" },
        { label: "โปรเซสเซอร์", value: "Intel Core i7-8700 / AMD Ryzen 5 3600 XT ขึ้นไป" },
        { label: "หน่วยความจำ", value: "RAM 16 GB" },
        { label: "กราฟิกส์", value: "RTX 2070 (8GB) / Radeon RX 5700 XT (8GB) ขึ้นไป" },
        { label: "DirectX", value: "เวอร์ชัน 12" },
        { label: "พื้นที่เก็บข้อมูล", value: "พื้นที่ว่าง 32 GB (แนะนำ SSD)" },
      ],
    },
  },
];

export function getModBySlug(slug: string): ModEntry | undefined {
  return MODS.find((m) => m.slug === slug);
}

export function getAllModSlugs(): string[] {
  return MODS.map((m) => m.slug);
}
