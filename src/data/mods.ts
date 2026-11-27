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
    slug: "farm-and-feast",
    gameTitle: "Farm & Feast",
    thaiTitle: "Farm & Feast ม็อดภาษาไทย (ฟาร์ม & ฟีสต์)",
    shortDescription:
      "ม็อดแปลภาษาไทยสมบูรณ์ 100% (1,833 รายการ) สำหรับเกม Farm & Feast (Patch 0.2.2) สกุลเงินบาท (฿) ฟอนต์ Mitr และโลโก้ภาษาไทย | Steam",
    overview:
      "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Farm & Feast (รองรับ Patch 0.2.2) แปลและเกลาสำนวนภาษาไทยครบ 100% ครอบคลุมวัตถุดิบ เครื่องเทศ เมนูอาหาร เมล็ดพันธุ์ อุปกรณ์ร้าน ภารกิจ และรีวิวลูกค้า พร้อมเปลี่ยนสกุลเงินเป็นบาท (฿) ทั้งเกม โลโก้เกมภาษาไทย “ฟาร์ม & ฟีสต์” รองรับการพิมพ์ตั้งชื่อร้านภาษาไทย ฟอนต์ Mitr อ่านสบายตา และทำงานผ่าน BepInEx 6 แบบไม่ทับไฟล์เดิมของเกมแม้แต่ไฟล์เดียว",
    features: [
      "แปลและเกลาสำนวนภาษาไทยครบ 100% (1,833 รายการ) รองรับตัวเกม Patch 0.2.2 ครบถ้วน",
      "แปลภาพป้าย ปุ่ม วัตถุ 3D ฉลากวัตถุดิบ และซองเมล็ดพันธุ์เป็นภาษาไทยรวม 36 ภาพ",
      "เปลี่ยนสกุลเงินจาก $ เป็นเงินบาท (฿) ทั้งเกม ครอบคลุมราคา ภารกิจ ป้ายจ้างพนักงาน ไอคอน HUD และแอนิเมชันเหรียญ 3 มิติ",
      "โลโก้เกมภาษาไทย “ฟาร์ม & ฟีสต์” พร้อมรองรับการพิมพ์ตั้งชื่อร้านอาหารภาษาไทยทั้งในเมนูและป้ายหน้าร้านจริง",
      "ฟอนต์ไทย Mitr แก้สระและวรรณยุกต์ทับซ้อนสมบูรณ์ พร้อมจัดระเบียบปุ่มจอย (PS / Xbox) ให้อยู่มุมขวาบนไม่บังตัวอักษร",
      "ไม่ทับไฟล์เดิมของเกมแม้แต่ไฟล์เดียว (100% Non-Overwriting) ผ่าน BepInEx 6 IL2CPP ถอนการติดตั้งได้ทันทีไม่กระทบเซฟเกม",
    ],
    installSteps: [
      "เปิดโฟลเดอร์ไฟล์เกม (ใน Steam: คลิกขวาที่เกม Farm & Feast → Manage → Browse local files)",
      "แตกไฟล์ FarmAndFeast_TH_v1.2.zip แล้วเข้าไปในโฟลเดอร์ Mod_Files จากนั้นคัดลอกไฟล์และโฟลเดอร์ทั้งหมดข้างในไปวางในโฟลเดอร์หลักของเกม (ที่มีไฟล์ Farm & Feast.exe)",
      "เข้าเกมและตั้งค่าภาษาในเกมเป็น English (เข้าเกมครั้งแรกอาจรอ ~20–30 วินาทีเพื่อโหลดปลั๊กอิน)",
    ],
    installPathExample: "Steam\\steamapps\\common\\Farm & Feast\\",
    uninstallNote:
      "ลบไฟล์ winhttp.dll, doorstop_config.ini, .doorstop_version และโฟลเดอร์ BepInEx, dotnet ออกจากโฟลเดอร์เกมได้ทันที ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    credits: [
      { role: "Thai Localization & Modding", name: "MaTaReaL" },
      { role: "Mod Loader", name: "BepInEx 6 IL2CPP" },
      { role: "Thai Font", name: "Mitr (SIL Open Font License 1.1)" },
    ],
    tags: ["แปลภาษาไทย 100%", "สกุลเงินบาท ฿", "ป้ายไทย 36 ภาพ", "Unity 6", "Steam PC"],
    seoKeywords: [
      "Farm & Feast ม็อดไทย",
      "Farm & Feast ม็อดภาษาไทย",
      "Farm & Feast แปลไทย",
      "Farm And Feast Thai Mod",
      "ฟาร์ม & ฟีสต์ ม็อดไทย",
      "ดาวน์โหลดม็อดไทย Farm & Feast",
      "MaTaReaL ม็อดไทย",
    ],
    nexusModUrl: "https://www.nexusmods.com/farmandfeast/mods/17",
    featured: true,
    media: {
      header: "/mods/farm-and-feast/header.webp",
      cover: "/mods/farm-and-feast/cover.webp",
      ogImage: "/mods/farm-and-feast/og-share.jpg",
      gallery: [
        {
          src: "/mods/farm-and-feast/gallery-01.webp",
          alt: "ปกม็อดภาษาไทย Farm & Feast",
          caption: "ภาพปกม็อดภาษาไทย Farm & Feast",
          tag: "Cover",
        },
        {
          src: "/mods/farm-and-feast/gallery-02.webp",
          alt: "หน้าหลักเกมและโลโก้ภาษาไทย ฟาร์ม & ฟีสต์",
          caption: "หน้าหลักเกมและโลโก้ภาษาไทย “ฟาร์ม & ฟีสต์”",
          tag: "Title",
        },
        {
          src: "/mods/farm-and-feast/gallery-03.webp",
          alt: "ภาพการเล่นทำฟาร์มและ HUD เงินบาท",
          caption: "หน้าจอทำฟาร์มและสกุลเงินบาท (฿)",
          tag: "Gameplay",
        },
        {
          src: "/mods/farm-and-feast/gallery-04.webp",
          alt: "หน้าต่างพิมพ์ตั้งชื่อร้านอาหารภาษาไทย",
          caption: "รองรับการพิมพ์ตั้งชื่อร้านอาหารภาษาไทย",
          tag: "Restaurant",
        },
        {
          src: "/mods/farm-and-feast/gallery-05.webp",
          alt: "ป้ายชื่อร้านอาหารภาษาไทยหน้าร้านจริง",
          caption: "แสดงชื่อร้านภาษาไทยบนป้ายหน้าร้านจริง",
          tag: "Store Sign",
        },
        {
          src: "/mods/farm-and-feast/gallery-06.webp",
          alt: "หน้าจัดการเมนูอาหารและราคาเงินบาท",
          caption: "เมนูอาหารและราคาสกุลเงินบาท (฿)",
          tag: "Menu",
        },
        {
          src: "/mods/farm-and-feast/gallery-07.webp",
          alt: "หน้าจัดการทีมพนักงานและอัปเกรด",
          caption: "หน้าจัดการทีมพนักงานและอัปเกรดร้าน",
          tag: "Team",
        },
        {
          src: "/mods/farm-and-feast/gallery-08.webp",
          alt: "รายการภารกิจและรางวัลเงินบาท",
          caption: "รายการภารกิจภาษาไทยพร้อมรางวัลเงินบาท (฿)",
          tag: "Quests",
        },
        {
          src: "/mods/farm-and-feast/gallery-09.webp",
          alt: "เมนูตั้งค่าระบบภาษาไทย",
          caption: "เมนูตั้งค่ากราฟิกและระบบภาษาไทย",
          tag: "Settings",
        },
      ],
    },
    specs: {
      version: "v1.2",
      aiModel: "Gemini 4 Hydrogen",
      fontUsed: "Mitr (แก้สระ/วรรณยุกต์ PUA)",
      translatedLines: "1,833 รายการ (100%)",
      coveragePercent: 100,
      engine: "Unity 6 (IL2CPP)",
      fileSize: "35.6 MB",
      releasedAt: "19 พ.ย. 2026",
      updatedAt: "22 พ.ย. 2026",
      supportedGamePlatform: "Steam (PC)",
    },
    stores: [
      {
        platform: "steam",
        label: "Steam (PC)",
        url: "https://store.steampowered.com/app/4521650/Farm__Feast/",
        steamAppId: 4521650,
      },
    ],
    files: [
      {
        id: "farm-and-feast-v1-2",
        fileName: "FarmAndFeast_TH_v1.2.zip",
        label: "Farm & Feast ThaiMod v1.2 (Patch 0.2.2)",
        version: "v1.2",
        size: "35.6 MB",
        uploadedAt: "22 พ.ย. 2026",
        sha256: "6617767003b370c3ac07541067d548190434f3b1393bcc163e69ef97ed2225ea",
        primaryUrl:
          "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/farm-and-feast-v1.2/FarmAndFeast_TH_v1.2.zip",
        primaryHost: "GitHub Releases",
        backupUrl:
          "https://drive.google.com/file/d/1b8AvVHZ3nbTkF__JYVHFo-nqFDMkV0SQ/view?usp=sharing",
        backupHost: "Google Drive",
        installNote:
          "นำไฟล์ทั้งหมดในโฟลเดอร์ Mod_Files ไปวางในโฟลเดอร์หลักของเกมที่มีไฟล์ Farm & Feast.exe (รองรับ Patch 0.2.2)",
      },
    ],
    fallbackSteam: {
      name: "Farm & Feast",
      releaseDate: "11 พ.ย. 2026",
      developers: ["dummy dino"],
      publishers: ["dummy dino", "Gamersky Games"],
      genres: ["แคชชวล", "อินดี้", "จำลองสถานการณ์", "เล่นระหว่างการพัฒนา"],
      shortDescription:
        "ปลูกวัตถุดิบสด ๆ และบริหารร้านอาหารเล็ก ๆ ของคุณเอง ดื่มด่ำกับวันอันสงบสุขที่ทอดยาวจากท้องทุ่งสู่โต๊ะอาหาร วางแผนเมนูสด ๆ และทำให้ลูกค้ามีความสุข",
      minimumSpecs: [
        { label: "ระบบปฏิบัติการ", value: "Windows 10 ขึ้นไป" },
        { label: "โปรเซสเซอร์", value: "Intel Core i5-7360U ขึ้นไป" },
        { label: "หน่วยความจำ", value: "RAM 4 GB" },
        { label: "กราฟิกส์", value: "Intel UHD 630 ขึ้นไป" },
        { label: "DirectX", value: "เวอร์ชัน 11" },
        { label: "พื้นที่เก็บข้อมูล", value: "พื้นที่ว่าง 5 GB" },
      ],
      recommendedSpecs: [
        { label: "ระบบปฏิบัติการ", value: "Windows 10 ขึ้นไป" },
        { label: "โปรเซสเซอร์", value: "AMD Ryzen 5600G" },
        { label: "หน่วยความจำ", value: "RAM 8 GB" },
        { label: "กราฟิกส์", value: "NVIDIA GTX 1060 ขึ้นไป" },
        { label: "DirectX", value: "เวอร์ชัน 11" },
        { label: "พื้นที่เก็บข้อมูล", value: "พื้นที่ว่าง 5 GB" },
      ],
    },
  },
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
          "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/vvp-v1.0/VenusVacationPRISM_ThaiMod_v1.0.zip",
        primaryHost: "GitHub Releases",
        backupUrl:
          process.env.VVP_GDRIVE_MIRROR_URL ||
          "https://drive.google.com/file/d/1cPwqsSi3ZWiqLzAw1sjABQgwx7AoSuxM/view?usp=sharing",
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
  {
    slug: "forza-horizon-6",
    gameTitle: "Forza Horizon 6",
    thaiTitle: "Forza Horizon 6 ม็อดภาษาไทย (ซิ่งทะยาน สุดขอบฟ้า 6)",
    shortDescription:
      "ม็อดแปลภาษาไทย Forza Horizon 6 ครบทั้งเมนู บทพูด ฟอนต์ไทย IBM Plex Sans Thai และโลโก้ภาษาไทยในเกม รองรับทั้ง Steam และ Xbox Game Pass (PC)",
    overview:
      "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Forza Horizon 6 แปลครอบคลุมทั้งหน้าเมนูหลัก การตั้งค่า บทสนทนา ซับไตเติล ภารกิจ และรายละเอียดรถ/การแต่งรถ คงชื่อรุ่นรถและคำศัพท์สากลบางส่วนตามบริบทเพื่อความเข้าใจง่าย พร้อมฟอนต์ Vector Font (IBM Plex Sans Thai) ครบ 4 น้ำหนัก และโลโก้ภาษาไทยในเกม (ซิ่งทะยาน สุดขอบฟ้า 6) รองรับทั้งเวอร์ชันตัวติดตั้งอัตโนมัติและแบบลากวาง",
    features: [
      "แปลข้อความภายในเกม 47,072 รายการ ครบทั้ง 287 ไฟล์ (คงคำศัพท์เฉพาะ/ชื่อรุ่นรถภาษาอังกฤษตามบริบท 13,392 รายการ)",
      "ฟอนต์ไทย IBM Plex Sans Thai โครงสร้าง Vector Font สำหรับ ForzaTech ครบ 4 น้ำหนัก (Horizon_A–D) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "โลโก้ชื่อเกมภาษาไทย “ซิ่งทะยาน สุดขอบฟ้า 6” ครบทั้งความละเอียดปกติและ Hi-Res",
      "เลือกโหลดได้ 2 แบบ: ตัวติดตั้งอัตโนมัติ (สำรองไฟล์และถอนติดตั้งคืนค่าเดิมด้วย SHA-256) หรือไฟล์แบบลากวางด้วยตนเอง",
      "รองรับทั้ง Steam และ Xbox Game Pass / Microsoft Store (PC) ไม่มีผลกระทบต่อเซฟเกม",
    ],
    installSteps: [
      "ปิดเกม Forza Horizon 6 ให้เรียบร้อยก่อนดำเนินการ",
      "แบบตัวติดตั้ง (แนะนำ): แตกไฟล์ FH6_ThaiMod_v1.0_Setup.zip แล้วเปิด FH6_ThaiMod_Setup.exe เลือกโฟลเดอร์เกมและกดติดตั้ง (หรือเลือกโหลดไฟล์ FH6_ThaiMod.zip เพื่อวางทับโฟลเดอร์ media ด้วยตนเอง)",
      "เปิดเกมและตั้งค่าภาษาข้อความในเกมเป็น English เพื่อแสดงผลภาษาไทย",
    ],
    installPathExample:
      "Steam\\steamapps\\common\\Forza Horizon 6\\  หรือ  XboxGames\\Forza Horizon 6\\Content\\",
    uninstallNote:
      "หากใช้ตัวติดตั้งให้เปิด FH6_ThaiMod_Setup.exe แล้วกด “ถอนติดตั้ง” เพื่อคืนไฟล์เดิมครบ 6 ไฟล์ด้วย SHA-256 หรือกด Verify ใน Steam / Xbox App",
    credits: [
      { role: "Thai Localization & Modding", name: "MaTaReaL" },
      { role: "Thai Font", name: "IBM Plex Sans Thai (SIL Open Font License 1.1)" },
    ],
    tags: ["แปลภาษาไทย", "Steam & Xbox", "ตัวติดตั้ง / ลากวาง", "ForzaTech", "IBM Plex Sans Thai"],
    seoKeywords: [
      "Forza Horizon 6 ม็อดไทย",
      "Forza Horizon 6 ม็อดภาษาไทย",
      "Forza Horizon 6 แปลไทย",
      "Forza Horizon 6 Thai Mod",
      "ม็อดไทย Forza Horizon 6 Steam Xbox Game Pass",
      "ซิ่งทะยาน สุดขอบฟ้า 6 ม็อดไทย",
      "MaTaReaL ม็อดไทย",
    ],
    nexusModUrl: "https://www.nexusmods.com/forzahorizon6/mods/2102",
    featured: true,
    trending: true,
    media: {
      header: "/mods/forza-horizon-6/header.webp",
      cover: "/mods/forza-horizon-6/cover.webp",
      ogImage: "/mods/forza-horizon-6/og-share.jpg",
      gallery: [
        {
          src: "/mods/forza-horizon-6/gallery-01.webp",
          alt: "ปกม็อดภาษาไทย Forza Horizon 6 ซากุระ",
          caption: "ภาพปกม็อดภาษาไทย",
          tag: "Cover",
        },
        {
          src: "/mods/forza-horizon-6/gallery-02.webp",
          alt: "ภาพโปรโมตจุดเด่นม็อดภาษาไทย Forza Horizon 6",
          caption: "สรุปจุดเด่นม็อดภาษาไทย",
          tag: "Showcase",
        },
        {
          src: "/mods/forza-horizon-6/gallery-03.webp",
          alt: "หน้าหลักเกม Forza Horizon 6 โลโก้ภาษาไทย",
          caption: "โลโก้ภาษาไทยในเกม (ซิ่งทะยาน สุดขอบฟ้า 6)",
          tag: "Title",
        },
        {
          src: "/mods/forza-horizon-6/gallery-04.webp",
          alt: "เมนูหลักและแผนที่โลกภาษาไทย Forza Horizon 6",
          caption: "เมนูหลักและแผนที่โลกภาษาไทย",
          tag: "Main Menu",
        },
        {
          src: "/mods/forza-horizon-6/gallery-05.webp",
          alt: "หน้าอัปเดตซีรีส์และกิจกรรมภาษาไทย",
          caption: "หน้าอัปเดตซีรีส์และไฮไลต์",
          tag: "Festival",
        },
        {
          src: "/mods/forza-horizon-6/gallery-06.webp",
          alt: "เมนูโหมดการแข่งขันภาษาไทย",
          caption: "โหมดแข่งขัน Street Race / Drift Attack / Drag Meet",
          tag: "Events",
        },
        {
          src: "/mods/forza-horizon-6/gallery-07.webp",
          alt: "เมนูตั้งค่ากราฟิกภาษาไทย Forza Horizon 6",
          caption: "เมนูตั้งค่ากราฟิกและระบบ",
          tag: "Settings",
        },
        {
          src: "/mods/forza-horizon-6/gallery-08.webp",
          alt: "หน้ารายละเอียดรถและค่าสเปกภาษาไทย",
          caption: "ข้อมูลรถและสเปกสมรรถนะภาษาไทย",
          tag: "Garage",
        },
        {
          src: "/mods/forza-horizon-6/gallery-09.webp",
          alt: "หน้าร้านค้าและแพ็กเสริมภาษาไทย",
          caption: "ร้านค้าและรายละเอียดแพ็กเสริม",
          tag: "Store UI",
        },
        {
          src: "/mods/forza-horizon-6/gallery-10.webp",
          alt: "ภาพการขับขี่และชื่อภูมิภาคภาษาไทย",
          caption: "การขับขี่และชื่อภูมิภาคในเกม",
          tag: "Gameplay",
        },
        {
          src: "/mods/forza-horizon-6/gallery-11.webp",
          alt: "ภาพการขับขี่บนถนนภูเขาและป้ายกิจกรรมภาษาไทย",
          caption: "ป้ายกิจกรรมและ HUD ภาษาไทย",
          tag: "HUD",
        },
        {
          src: "/mods/forza-horizon-6/gallery-12.webp",
          alt: "หน้าแต่งตัวละครภาษาไทย",
          caption: "เมนูแต่งตัวละครภาษาไทย",
          tag: "Customize",
        },
      ],
    },
    specs: {
      version: "v1.0",
      aiModel: "Gemini 4 Neon / Hydrogen",
      fontUsed: "IBM Plex Sans Thai (Vector Font 4 น้ำหนัก)",
      translatedLines: "47,072 รายการ (คงคำอังกฤษ 13,392 รายการ)",
      coveragePercent: 100,
      engine: "ForzaTech Engine",
      fileSize: "143.3 MB / 160.8 MB",
      releasedAt: "16 พ.ย. 2026",
      updatedAt: "24 พ.ย. 2026",
      supportedGamePlatform: "Steam / Xbox (PC)",
    },
    stores: [
      {
        platform: "steam",
        label: "Steam (PC)",
        url: "https://store.steampowered.com/app/2483190/Forza_Horizon_6/",
        steamAppId: 2483190,
      },
      {
        platform: "xbox",
        label: "Xbox / Game Pass (PC)",
        url: "https://www.xbox.com/th-th/games/store/forza-horizon-6/9NR1R1XWLCNB",
      },
    ],
    files: [
      {
        id: "fh6-setup-v1-0",
        fileName: "FH6_ThaiMod_v1.0_Setup.zip",
        label: "เวอร์ชันตัวติดตั้งอัตโนมัติ (แนะนำ — Steam & Xbox Game Pass)",
        version: "v1.0",
        size: "143.3 MB",
        uploadedAt: "24 พ.ย. 2026",
        sha256: "c1f992c2e668b0a492ffb748837c8986660ab2a3d6c65123cc85113da02b5127",
        primaryUrl:
          "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/fh6-v1.0/FH6_ThaiMod_v1.0_Setup.zip",
        primaryHost: "GitHub Releases",
        backupUrl:
          "https://drive.google.com/file/d/1Ux3eGjAVnziVOq3vn5yA25-py_6td1OB/view?usp=sharing",
        backupHost: "Google Drive",
        installNote:
          "แตกไฟล์แล้วเปิด FH6_ThaiMod_Setup.exe เลือกโฟลเดอร์เกมแล้วกดติดตั้ง (หรือถอนติดตั้ง) ได้ทันที",
        knownNotice:
          "เวอร์ชันนี้ลง Nexus Mods ไม่ได้เนื่องจากเป็นไฟล์ EXE จึงเปิดให้โหลดโดยตรงผ่านเว็บนี้",
      },
      {
        id: "fh6-manual-v1-0",
        fileName: "FH6_ThaiMod.zip",
        label: "เวอร์ชันลากวางด้วยตนเอง (Manual Drag & Drop)",
        version: "v1.0",
        size: "160.8 MB",
        uploadedAt: "16 พ.ย. 2026",
        sha256: "c227d3d7fa6aa8fa5879692dccfa1c59be8a800902f97cb8a7dd29bc449acabf",
        primaryUrl:
          "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/fh6-v1.0/FH6_ThaiMod.zip",
        primaryHost: "GitHub Releases",
        backupUrl:
          "https://drive.google.com/file/d/1BFpNUIhNQm1GwXhdNVGdynUu6CEr3-JD/view?usp=sharing",
        backupHost: "Google Drive",
        installNote:
          "แตกไฟล์แล้วนำโฟลเดอร์ media ไปวางทับในโฟลเดอร์หลักของเกม (Steam หรือ XboxGames\\Forza Horizon 6\\Content)",
        knownNotice:
          "เวอร์ชันนี้ลง Nexus Mods ไม่ได้เนื่องจากโครงสร้างไฟล์ของเกมเป็น .zip ซ้อน .zip จึงเปิดให้โหลดโดยตรงผ่านเว็บนี้",
      },
    ],
    fallbackSteam: {
      name: "Forza Horizon 6",
      releaseDate: "18 พ.ค. 2026",
      developers: ["Playground Games"],
      publishers: ["Xbox Game Studios"],
      genres: ["แข่งรถ", "จำลองสถานการณ์", "กีฬา"],
      shortDescription:
        "ออกสำรวจภูมิทัศน์อันงดงามของประเทศญี่ปุ่นในเทศกาล Horizon พร้อมรถให้สะสมและปรับแต่งกว่าหลายร้อยคัน",
      minimumSpecs: [
        { label: "ระบบปฏิบัติการ", value: "Windows 10 / 11 64-bit" },
        { label: "โปรเซสเซอร์", value: "Intel i5-8400 / AMD Ryzen 5 1500X ขึ้นไป" },
        { label: "หน่วยความจำ", value: "RAM 16 GB" },
        { label: "กราฟิกส์", value: "NVIDIA GTX 1060 / AMD RX 590 ขึ้นไป" },
        { label: "DirectX", value: "เวอร์ชัน 12" },
      ],
      recommendedSpecs: [
        { label: "ระบบปฏิบัติการ", value: "Windows 10 / 11 64-bit" },
        { label: "โปรเซสเซอร์", value: "Intel i7-10700K / AMD Ryzen 7 3800XT ขึ้นไป" },
        { label: "หน่วยความจำ", value: "RAM 16 GB" },
        { label: "กราฟิกส์", value: "NVIDIA RTX 3070 / AMD RX 6800 XT ขึ้นไป" },
        { label: "DirectX", value: "เวอร์ชัน 12" },
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
