import type { ModEntry } from "./types";

/**
 * ศูนย์ข้อมูลม็อดของ MaTaReaL ม็อดไทย (ครบทุกโปรเจกต์ม็อดภาษาไทย)
 * วิธีเพิ่มม็อดใหม่ในอนาคต:
 * 1. นำรูป header.webp (1300x372) + cover.webp (1920x1080) + gallery-*.webp ใส่ใน public/mods/<slug>/
 * 2. เพิ่มออบเจกต์ ModEntry ใหม่ในอาเรย์ MODS ด้านล่างนี้ 1 ชุด (ใส่ series ถ้าเป็นเกมซีรีส์เดียวกัน)
 * ระบบหน้าแรก, ฟิลเตอร์, จัดกลุ่มซีรีส์, หน้าม็อด, SEO, Sitemap, Steam API, ยอดโหลดจริง และแจ้งบัคจะทำงานอัตโนมัติ
 */
export const MODS: ModEntry[] = [
  {
    "slug": "sea-of-solitude",
    "gameTitle": "Sea of Solitude",
    "thaiTitle": "Sea of Solitude ม็อดภาษาไทย (ทะเลแห่งความโดดเดี่ยว)",
    "shortDescription": "Sea of Solitude (ทะเลแห่งความโดดเดี่ยว) - ม็อดภาษาไทย 100% แปลครบ 1,434 ข้อความ พร้อมโลโก้เกมภาษาไทยและฟอนต์ Prompt 2048x2048 SDF แก้สระลอยสมบูรณ์ | AI Model : Gemini 4 Neon | รองรับ : Steam / EA App (PC)",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Sea of Solitude (ทะเลแห่งความโดดเดี่ยว) แปลครบ 100% ทั้ง 1,434 ข้อความ ครอบคลุมเมนูหลัก การตั้งค่า ปุ่มควบคุม ชื่อบททั้ง 13 บท ชื่อจุดเช็กพอยต์ จดหมายในขวด และคำบรรยายบทสนทนาทั้งหมด พร้อมโลโก้เกมภาษาไทย “ทะเลแห่งความโดดเดี่ยว” สไตล์คลื่นน้ำในเกม ฟอนต์ Prompt 2 น้ำหนัก (Medium & Bold) ความละเอียดสูง 2048×2048 SDF แก้สระลอยและปรับสมดุลช่องไฟทั้งเมนู ซับไตเติล และชื่อผู้พูดสมบูรณ์ ไม่มีการฉีด DLL ปลอดภัย 100%",
    "features": [
      "แปลข้อความในเกมครบ 100% (1,434 ข้อความ) ครอบคลุมเมนู UI การตั้งค่า ชื่อบท จุดเช็กพอยต์ จดหมายในขวด และซับไตเติลทั้ง 13 บท",
      "โลโก้เกมภาษาไทย “ทะเลแห่งความโดดเดี่ยว” ดีไซน์คลื่นผิวน้ำกลมกลืนต้นฉบับ แสดงผลจริงบนหน้าเมนูหลักในเกม",
      "ฟอนต์ไทย Prompt 2 น้ำหนัก (Medium & Bold) ความละเอียดสูง 2048×2048 SDF อ่านคมชัดสบายตาทุกขนาดจอ",
      "ปรับตำแหน่งสระและวรรณยุกต์ไทยด้วยระบบ PUA ครบชุด พร้อมปรับสมดุลระยะห่างตัวอักษรทั้งเมนู ซับไตเติล และชื่อตัวละครผู้พูด",
      "ม็อดแก้ไฟล์ Asset โดยตรง ไม่มีการฉีด DLL ใดๆ ปลอดภัย เสถียร และรองรับทั้ง Steam และ EA App (PC)"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ SOS_ThaiMod_v1.0.zip จะพบโฟลเดอร์ชื่อ SOS_ThaiMod",
      "เปิดเข้าไปในโฟลเดอร์ SOS_ThaiMod แล้วคัดลอกโฟลเดอร์ SeaOfSolitude_Data ไปวางทับในโฟลเดอร์หลักของตัวเกม",
      "กดยืนยันการวางทับไฟล์ทั้งหมด จากนั้นเข้าเกมได้เลย (ใช้สล็อตภาษาอังกฤษเดิมซึ่งจะแสดงเป็น ภาษาไทย ในเมนูการตั้งค่า)"
    ],
    "installPathExample": "EA Games\\SeaOfSolitude\\ หรือ Steam\\steamapps\\common\\Sea of Solitude\\",
    "uninstallNote": "ใช้คำสั่งตรวจสอบความสมบูรณ์ของไฟล์เกมบน Steam หรือ ซ่อมแซม (Repair) บน EA App เพื่อคืนค่าต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Font",
        "name": "Prompt โดย Cadson Demak (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "critics": {
      "metacriticSlug": "sea-of-solitude",
      "metacriticScore": 69,
      "metacriticUrl": "https://www.metacritic.com/game/sea-of-solitude/",
      "openCriticScore": 62,
      "openCriticTier": "Weak",
      "openCriticUrl": "https://opencritic.com/game/11087/sea-of-solitude-directors-cut"
    },
    "releasedOrder": "2026-11-27",
    "nexusDownloads": 10,
    "estimatedPriceThb": 109.8,
    "tags": [
      "แปลภาษาไทย 100%",
      "โลโก้ไทยในเกม",
      "ฟอนต์ Prompt HD",
      "แก้สระลอย PUA",
      "Steam / EA App"
    ],
    "seoKeywords": [
      "Sea of Solitude ม็อดไทย",
      "Sea of Solitude ม็อดภาษาไทย",
      "ทะเลแห่งความโดดเดี่ยว ม็อดไทย",
      "Sea of Solitude แปลไทย",
      "Sea of Solitude Thai Mod",
      "ดาวน์โหลดม็อดไทย Sea of Solitude",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/mods/3?game_id=11258&tab=description",
    "featured": true,
    "media": {
      "header": "/mods/sea-of-solitude/header.webp",
      "cover": "/mods/sea-of-solitude/cover.webp",
      "ogImage": "/mods/sea-of-solitude/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/sea-of-solitude/cover.webp",
          "alt": "ปกม็อดภาษาไทย Sea of Solitude (ทะเลแห่งความโดดเดี่ยว)",
          "caption": "ภาพปกม็อดภาษาไทย Sea of Solitude (ทะเลแห่งความโดดเดี่ยว)",
          "tag": "Cover"
        },
        {
          "src": "/mods/sea-of-solitude/gallery-01.webp",
          "alt": "หน้าจอไตเติลและโลโก้ภาษาไทย ทะเลแห่งความโดดเดี่ยว",
          "caption": "หน้าจอไตเติลพร้อมโลโก้ภาษาไทย “ทะเลแห่งความโดดเดี่ยว” และเครดิต MaTaReaL",
          "tag": "Title"
        },
        {
          "src": "/mods/sea-of-solitude/gallery-02.webp",
          "alt": "หน้าเมนูหลักภาษาไทยพร้อมโลโก้ ทะเลแห่งความโดดเดี่ยว",
          "caption": "หน้าเมนูหลักภาษาไทยและโลโก้ “ทะเลแห่งความโดดเดี่ยว”",
          "tag": "Main Menu"
        },
        {
          "src": "/mods/sea-of-solitude/gallery-03.webp",
          "alt": "ตัวอย่างซับไตเติลภาษาไทยช่วงเปิดเกมของเคย์",
          "caption": "คำบรรยายภาษาไทยและชื่อผู้พูด “เคย์” คมชัดจัดช่องไฟสมดุล",
          "tag": "Subtitles"
        },
        {
          "src": "/mods/sea-of-solitude/gallery-04.webp",
          "alt": "ตัวอย่างบทสนทนาภาษาไทยกับเด็กหญิงในฉากเปิดเรื่อง",
          "caption": "บทสนทนาภาษาไทยสำนวนธรรมชาติในฉากคัทซีน",
          "tag": "Cutscene"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "Prompt (Medium & Bold — SDF 2048×2048 + PUA)",
      "translatedLines": "1,434 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unity 2018.4 (IL2CPP)",
      "fileSize": "6.65 MB",
      "releasedAt": "27 พ.ย. 2026",
      "updatedAt": "27 พ.ย. 2026",
      "supportedGamePlatform": "Steam / EA App (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/1225590/Sea_of_Solitude/",
        "steamAppId": 1225590
      },
      {
        "platform": "ea",
        "label": "EA App (PC)",
        "url": "https://www.ea.com/games/sea-of-solitude"
      },
      {
        "platform": "xbox",
        "label": "Xbox Store",
        "url": "https://www.xbox.com/th-th/games/store/sea-of-solitude/c4043400338g"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store",
        "url": "https://store.playstation.com/th-th/product/EP0006-CUSA14122_00-SEAOFSLTD0000000"
      },
      {
        "platform": "nintendo",
        "label": "Nintendo Switch (Director's Cut)",
        "url": "https://www.nintendo.com/us/store/products/sea-of-solitude-the-directors-cut-switch/"
      }
    ],
    "files": [
      {
        "id": "sos-thaimod-v1-0",
        "fileName": "SOS_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / EA App)",
        "version": "v1.0",
        "size": "6.65 MB",
        "uploadedAt": "27 พ.ย. 2026",
        "sha256": "eb441f7ef0124a8d36e3a05b79ec1b59949f56f152fed61c9589eb5b7a9e9409",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/sos-v1.0/SOS_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ SOS_ThaiMod นำโฟลเดอร์ SeaOfSolitude_Data ไปวางทับในโฟลเดอร์หลักของตัวเกม",
        "backupUrl": "https://drive.google.com/file/d/11O73m6tttetD9TV9s6nl_-paOPQDVTlU/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Sea of Solitude",
      "releaseDate": "4 มิ.ย. 2020",
      "developers": [
        "Jo-Mei Games"
      ],
      "publishers": [
        "Electronic Arts"
      ],
      "genres": [
        "ผจญภัย",
        "อินดี้",
        "เนื้อเรื่อง"
      ],
      "shortDescription": "เมื่อมนุษย์อ้างว้างจนเกินจะรับไหว พวกเขาจะแปรเปลี่ยนเป็นอสุรกาย ออกล่องเรือฝ่ามหานครจมน้ำไปพร้อมกับเคย์เพื่อค้นหาความหมายของความเป็นมนุษย์",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Phenom II X4 965 or Equivalent/ i3 2120 or Equivalent"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Radeon HD 7850 or Equivalent/ GeForce GTX 660 or Equivalent"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 2 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Ryzen 3 1300X or Equivalent/ Intel i5 4690K or Equivalent"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Radeon R9 290 or Equivalent/ GeForce GTX 960 or Equivalent"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 2 GB"
        }
      ]
    }
  },
  {
    "slug": "fears-to-fathom-scratch-creek",
    "gameTitle": "Fears to Fathom - Scratch Creek",
    "thaiTitle": "Fears to Fathom - Scratch Creek ม็อดภาษาไทย (กลัวที่จะหยั่งรู้)",
    "shortDescription": "Fears to Fathom - Scratch Creek (กลัวที่จะหยั่งรู้) - ม็อดภาษาไทย 100% แปลครบ 1,608 ข้อความ + ซับเสียง/ทีวี 210 บรรทัด พร้อมระบบซับไตเติลพิเศษสำหรับคลิปเสียง วิทยุ และทีวีอีก 210 บรรทัด พร้อมโลโก้ไทยและฟอนต์มีหัว 3 ชุด | AI Model : Gemini 4 Neon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Fears to Fathom - Scratch Creek แปลครบ 1,608 ข้อความ + ซับเสียง/ทีวี 210 บรรทัด (100%) พร้อมระบบซับไตเติลพิเศษสำหรับคลิปเสียง วิทยุ และทีวีอีก 210 บรรทัด ด้วยสำนวนภาษาไทยที่ลื่นไหลสมจริงในโทนภาพยนตร์สยองขวัญ พร้อมโลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” ในเกม แยกฟอนต์ไทยมีหัว 3 บทบาท (เมนู/ซับ, เอกสาร, แชทมือถือ) แก้สระลอย 100% และติดตั้งแบบไม่ทับไฟล์เกม",
    "features": [
      "แปลข้อความครบ 100% (1,608 ข้อความ + ซับเสียง/ทีวี 210 บรรทัด) ครอบคลุมบทสนทนา แชทมือถือ เอกสาร อินโทร/บทส่งท้าย เมนู และปุ่มควบคุม",
      "ระบบซับไตเติลพิเศษแบบ Real-Time สำหรับคลิปเสียง วิทยุ และรายการทีวีในเกมครบ 210 บรรทัด",
      "โลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” สไตล์ VHS ตรงตามต้นฉบับ พร้อมคงชื่อตอนภาษาอังกฤษ",
      "แยกฟอนต์ภาษาไทยแบบมีหัว 3 บทบาทชัดเจน (IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "ทำงานแบบ Non-Overwriting ไม่แก้ไฟล์ต้นฉบับเกม ลากวางใช้งานได้ทันทีและถอนการติดตั้งได้สะอาด 100%",
      "มีไฟล์เสริม Display & True 21:9 Ultrawide QoL Fix (กด F10 ตั้งค่าจอ/FOV) ให้ดาวน์โหลดใช้งานร่วมกันได้ในแท็บไฟล์"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ FTF_ScratchCreek_ThaiMod_v1.0.zip จะพบโฟลเดอร์ ThaiMod_ScratchCreek",
      "เปิดเข้าไปในโฟลเดอร์ ThaiMod_ScratchCreek แล้วนำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกม",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (หากต้องการโหมดจอ Ultrawide 21:9 / ปรับ FOV ให้โหลดไฟล์ Display QoL ในแท็บไฟล์มาใช้ร่วมกันได้)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Fears to Fathom - Scratch Creek\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกม ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped, Sarabun, Noto Sans Thai Looped (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "series": {
      "id": "fears-to-fathom",
      "name": "Fears to Fathom",
      "thaiName": "กลัวที่จะหยั่งรู้ (ซีรีส์สยองขวัญครบทุกตอน)",
      "description": "ซีรีส์สยองขวัญจิตวิทยาแบบตอนสั้นอิงจากเรื่องเล่าจริงของ Rayll ครบทั้ง 5 ตอนและ Season 2",
      "order": 6,
      "badgeLabel": "S2 EP1"
    },
    "releasedOrder": "2026-11-26",
    "nexusDownloads": 3,
    "estimatedPriceThb": 165,
    "tags": [
      "แปลภาษาไทย 100%",
      "Fears to Fathom",
      "โลโก้ไทยในเกม",
      "ฟอนต์มีหัว 3 ชุด",
      "Steam PC"
    ],
    "seoKeywords": [
      "Fears to Fathom - Scratch Creek ม็อดไทย",
      "Fears to Fathom - Scratch Creek ม็อดภาษาไทย",
      "Fears to Fathom Scratch Creek แปลไทย",
      "Fears to Fathom ม็อดไทย",
      "กลัวที่จะหยั่งรู้ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/fearstofathomscratchcreek/mods/16",
    "media": {
      "header": "/mods/fears-to-fathom-scratch-creek/header.webp",
      "cover": "/mods/fears-to-fathom-scratch-creek/cover.webp",
      "ogImage": "/mods/fears-to-fathom-scratch-creek/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/fears-to-fathom-scratch-creek/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Fears to Fathom - Scratch Creek (กลัวที่จะหยั่งรู้ S2 EP1)",
          "caption": "ภาพปกม็อดภาษาไทย Fears to Fathom - Scratch Creek (กลัวที่จะหยั่งรู้ S2 EP1)",
          "tag": "Cover"
        },
        {
          "src": "/mods/fears-to-fathom-scratch-creek/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทยสไตล์ VHS — Fears to Fathom - Scratch Creek",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทยสไตล์ VHS",
          "tag": "Title"
        },
        {
          "src": "/mods/fears-to-fathom-scratch-creek/gallery-02.webp",
          "alt": "ตัวอย่างเมนูและการตั้งค่าภาษาไทย — Fears to Fathom - Scratch Creek",
          "caption": "ตัวอย่างเมนูและการตั้งค่าภาษาไทย",
          "tag": "Settings"
        },
        {
          "src": "/mods/fears-to-fathom-scratch-creek/gallery-03.webp",
          "alt": "ตัวอย่างซับไตเติลภาษาไทยในเกม — Fears to Fathom - Scratch Creek",
          "caption": "ตัวอย่างซับไตเติลภาษาไทยในเกม",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped",
      "translatedLines": "1,608 ข้อความ + ซับเสียง/ทีวี 210 บรรทัด (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "1.37 MB",
      "releasedAt": "26 พ.ย. 2026",
      "updatedAt": "26 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/4121170/",
        "steamAppId": 4121170
      }
    ],
    "files": [
      {
        "id": "ftf-sc-thai-v1-0",
        "fileName": "FTF_ScratchCreek_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (S2 EP1)",
        "version": "v1.0",
        "size": "1.37 MB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "4dea90ffa87747818c5aa19779e836e90cee99b213686d429a180e562dae619a",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-sc-v1.0/FTF_ScratchCreek_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ ThaiMod_ScratchCreek นำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของเกม",
        "backupUrl": "https://drive.google.com/file/d/1tbWCIm_tvosOikiWz1KUe3EK-jN277o4/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "ftf-sc-qol-v1-0",
        "fileName": "FTF_ScratchCreek_DisplayQoL_v1.0.zip",
        "label": "ม็อดเสริม (ไม่บังคับ) — Display & Ultrawide 21:9 QoL (F10)",
        "optional": true,
        "version": "v1.0",
        "size": "859.7 KB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "88f207384c41f3f68ffd97ce34bbc3985937f4bec78f4172e0ad0b96a99933fc",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-sc-v1.0/FTF_ScratchCreek_DisplayQoL_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "ม็อดเสริมปรับความละเอียด โหมดไร้ขอบ (Borderless), True 21:9 Ultrawide UI และ FOV (กด F10 ในเกม) ใช้เดี่ยวหรือใช้ร่วมกับม็อดไทยได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1-00ZHMJCiWcpRWq7iSoy-x6TSmltltFT/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Fears to Fathom® - Scratch Creek",
      "releaseDate": "10 มิ.ย. 2026",
      "developers": [
        "Rayll"
      ],
      "publishers": [
        "Rayll Studios"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ตอน S2 EP1 ในซีรีส์สยองขวัญจิตวิทยา Fears to Fathom สัมผัสเรื่องราวชวนขนลุกมุมมองบุคคลที่หนึ่งสไตล์เทป VHS",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 or later 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-6600K or AMD Ryzen R5 1600 processor"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 12 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 1050 Ti or AMD Radeon RX 580 or Intel Arc A380"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "เครือข่าย",
          "value": "การเชื่อมต่ออินเทอร์เน็ตแบบบรอดแบนด์"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 14 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 or later 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-9600K or AMD Ryzen 5"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce RTX 2070 or AMD Radeon RX 5700 XT or Intel Arc B570"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "เครือข่าย",
          "value": "การเชื่อมต่ออินเทอร์เน็ตแบบบรอดแบนด์"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 14 GB"
        }
      ]
    }
  },
  {
    "slug": "fears-to-fathom-woodbury-getaway",
    "gameTitle": "Fears to Fathom - Woodbury Getaway",
    "thaiTitle": "Fears to Fathom - Woodbury Getaway ม็อดภาษาไทย (กลัวที่จะหยั่งรู้)",
    "shortDescription": "Fears to Fathom - Woodbury Getaway (กลัวที่จะหยั่งรู้) - ม็อดภาษาไทย 100% แปลครบ 4,165 ข้อความ พร้อมโลโก้ไทยและฟอนต์มีหัว 3 ชุด | AI Model : Gemini 4 Neon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Fears to Fathom - Woodbury Getaway แปลครบ 4,165 ข้อความ (100%) ด้วยสำนวนภาษาไทยที่ลื่นไหลสมจริงในโทนภาพยนตร์สยองขวัญ พร้อมโลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” ในเกม แยกฟอนต์ไทยมีหัว 3 บทบาท (เมนู/ซับ, เอกสาร, แชทมือถือ) แก้สระลอย 100% และติดตั้งแบบไม่ทับไฟล์เกม",
    "features": [
      "แปลข้อความครบ 100% (4,165 ข้อความ) ครอบคลุมบทสนทนา แชทมือถือ เอกสาร อินโทร/บทส่งท้าย เมนู และปุ่มควบคุม",
      "โลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” สไตล์ VHS ตรงตามต้นฉบับ พร้อมคงชื่อตอนภาษาอังกฤษ",
      "แยกฟอนต์ภาษาไทยแบบมีหัว 3 บทบาทชัดเจน (IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "ทำงานแบบ Non-Overwriting ไม่แก้ไฟล์ต้นฉบับเกม ลากวางใช้งานได้ทันทีและถอนการติดตั้งได้สะอาด 100%",
      "มีไฟล์เสริม Display & True 21:9 Ultrawide QoL Fix (กด F10 ตั้งค่าจอ/FOV) ให้ดาวน์โหลดใช้งานร่วมกันได้ในแท็บไฟล์"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ FTF_WoodburyGetaway_ThaiMod_v1.0.zip จะพบโฟลเดอร์ ThaiMod_EP5",
      "เปิดเข้าไปในโฟลเดอร์ ThaiMod_EP5 แล้วนำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกม",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (หากต้องการโหมดจอ Ultrawide 21:9 / ปรับ FOV ให้โหลดไฟล์ Display QoL ในแท็บไฟล์มาใช้ร่วมกันได้)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Fears to Fathom - Woodbury Getaway\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกม ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped, Sarabun, Noto Sans Thai Looped (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "series": {
      "id": "fears-to-fathom",
      "name": "Fears to Fathom",
      "thaiName": "กลัวที่จะหยั่งรู้ (ซีรีส์สยองขวัญครบทุกตอน)",
      "description": "ซีรีส์สยองขวัญจิตวิทยาแบบตอนสั้นอิงจากเรื่องเล่าจริงของ Rayll ครบทั้ง 5 ตอนและ Season 2",
      "order": 5,
      "badgeLabel": "EP5"
    },
    "releasedOrder": "2026-11-26",
    "nexusDownloads": 3,
    "estimatedPriceThb": 220,
    "tags": [
      "แปลภาษาไทย 100%",
      "Fears to Fathom",
      "โลโก้ไทยในเกม",
      "ฟอนต์มีหัว 3 ชุด",
      "Steam PC"
    ],
    "seoKeywords": [
      "Fears to Fathom - Woodbury Getaway ม็อดไทย",
      "Fears to Fathom - Woodbury Getaway ม็อดภาษาไทย",
      "Fears to Fathom Woodbury Getaway แปลไทย",
      "Fears to Fathom ม็อดไทย",
      "กลัวที่จะหยั่งรู้ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/fearstofathomwoodburygetaway/mods/2",
    "media": {
      "header": "/mods/fears-to-fathom-woodbury-getaway/header.webp",
      "cover": "/mods/fears-to-fathom-woodbury-getaway/cover.webp",
      "ogImage": "/mods/fears-to-fathom-woodbury-getaway/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/fears-to-fathom-woodbury-getaway/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Fears to Fathom - Woodbury Getaway (กลัวที่จะหยั่งรู้ EP5)",
          "caption": "ภาพปกม็อดภาษาไทย Fears to Fathom - Woodbury Getaway (กลัวที่จะหยั่งรู้ EP5)",
          "tag": "Cover"
        },
        {
          "src": "/mods/fears-to-fathom-woodbury-getaway/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้ — Fears to Fathom - Woodbury Getaway",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้",
          "tag": "Title"
        },
        {
          "src": "/mods/fears-to-fathom-woodbury-getaway/gallery-02.webp",
          "alt": "ตัวอย่างเมนูและการตั้งค่าภาษาไทย — Fears to Fathom - Woodbury Getaway",
          "caption": "ตัวอย่างเมนูและการตั้งค่าภาษาไทย",
          "tag": "Settings"
        },
        {
          "src": "/mods/fears-to-fathom-woodbury-getaway/gallery-03.webp",
          "alt": "ตัวอย่างคำบรรยายและบทสนทนาในเกม — Fears to Fathom - Woodbury Getaway",
          "caption": "ตัวอย่างคำบรรยายและบทสนทนาในเกม",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped",
      "translatedLines": "4,165 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "1.34 MB",
      "releasedAt": "26 พ.ย. 2026",
      "updatedAt": "26 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2961530/",
        "steamAppId": 2961530
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store",
        "url": "https://store.playstation.com/th-th/search/fears%20to%20fathom"
      }
    ],
    "files": [
      {
        "id": "ftf-ep5-thai-v1-0",
        "fileName": "FTF_WoodburyGetaway_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (EP5)",
        "version": "v1.0",
        "size": "1.34 MB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "f93ba8ab7a91ef72a202708e6a100e31cddeb6893ef9026be4389034cc823133",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep5-v1.0/FTF_WoodburyGetaway_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ ThaiMod_EP5 นำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของเกม",
        "backupUrl": "https://drive.google.com/file/d/1cAMKW3LHTobsHkS8XDFnfpHkm1mDGFFH/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "ftf-ep5-qol-v1-0",
        "fileName": "FTF_WoodburyGetaway_DisplayQoL_v1.0.zip",
        "label": "ม็อดเสริม (ไม่บังคับ) — Display & Ultrawide 21:9 QoL (F10)",
        "optional": true,
        "version": "v1.0",
        "size": "859.6 KB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "a82d4723fca28146135e325e8eb6172bb3293a3930dae03d9aac6ba369a21b3d",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep5-v1.0/FTF_WoodburyGetaway_DisplayQoL_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "ม็อดเสริมปรับความละเอียด โหมดไร้ขอบ (Borderless), True 21:9 Ultrawide UI และ FOV (กด F10 ในเกม) ใช้เดี่ยวหรือใช้ร่วมกับม็อดไทยได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1GsOvV2gWtEuzZjjyhLyTZPCyZr7YvHb5/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Fears to Fathom - Woodbury Getaway",
      "releaseDate": "12 ก.ย. 2024",
      "developers": [
        "Rayll Studios"
      ],
      "publishers": [
        "Rayll Studios"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ตอน EP5 ในซีรีส์สยองขวัญจิตวิทยา Fears to Fathom สัมผัสเรื่องราวชวนขนลุกมุมมองบุคคลที่หนึ่งสไตล์เทป VHS",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-2300 | AMD FX-6350"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 650 Ti, 2 GB | AMD Radeon R7 360, 2 GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 6 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-4670 | AMD Ryzen5 1600"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GTX 1660Ti 6GB or AMD Radeon RX 580 8GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 6 GB"
        }
      ]
    }
  },
  {
    "slug": "fears-to-fathom-ironbark-lookout",
    "gameTitle": "Fears to Fathom - Ironbark Lookout",
    "thaiTitle": "Fears to Fathom - Ironbark Lookout ม็อดภาษาไทย (กลัวที่จะหยั่งรู้)",
    "shortDescription": "Fears to Fathom - Ironbark Lookout (กลัวที่จะหยั่งรู้) - ม็อดภาษาไทย 100% แปลครบ 1,553 ข้อความ พร้อมโลโก้ไทยและฟอนต์มีหัว 3 ชุด | AI Model : Gemini 4 Neon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Fears to Fathom - Ironbark Lookout แปลครบ 1,553 ข้อความ (100%) ด้วยสำนวนภาษาไทยที่ลื่นไหลสมจริงในโทนภาพยนตร์สยองขวัญ พร้อมโลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” ในเกม แยกฟอนต์ไทยมีหัว 3 บทบาท (เมนู/ซับ, เอกสาร, แชทมือถือ) แก้สระลอย 100% และติดตั้งแบบไม่ทับไฟล์เกม",
    "features": [
      "แปลข้อความครบ 100% (1,553 ข้อความ) ครอบคลุมบทสนทนา แชทมือถือ เอกสาร อินโทร/บทส่งท้าย เมนู และปุ่มควบคุม",
      "โลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” สไตล์ VHS ตรงตามต้นฉบับ พร้อมคงชื่อตอนภาษาอังกฤษ",
      "แยกฟอนต์ภาษาไทยแบบมีหัว 3 บทบาทชัดเจน (IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "ทำงานแบบ Non-Overwriting ไม่แก้ไฟล์ต้นฉบับเกม ลากวางใช้งานได้ทันทีและถอนการติดตั้งได้สะอาด 100%",
      "มีไฟล์เสริม Display & True 21:9 Ultrawide QoL Fix (กด F10 ตั้งค่าจอ/FOV) ให้ดาวน์โหลดใช้งานร่วมกันได้ในแท็บไฟล์"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ FTF_IronbarkLookout_ThaiMod_v1.0.zip จะพบโฟลเดอร์ ThaiMod_EP4",
      "เปิดเข้าไปในโฟลเดอร์ ThaiMod_EP4 แล้วนำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกม",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (หากต้องการโหมดจอ Ultrawide 21:9 / ปรับ FOV ให้โหลดไฟล์ Display QoL ในแท็บไฟล์มาใช้ร่วมกันได้)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Fears to Fathom - Ironbark Lookout\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกม ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped, Sarabun, Noto Sans Thai Looped (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "series": {
      "id": "fears-to-fathom",
      "name": "Fears to Fathom",
      "thaiName": "กลัวที่จะหยั่งรู้ (ซีรีส์สยองขวัญครบทุกตอน)",
      "description": "ซีรีส์สยองขวัญจิตวิทยาแบบตอนสั้นอิงจากเรื่องเล่าจริงของ Rayll ครบทั้ง 5 ตอนและ Season 2",
      "order": 4,
      "badgeLabel": "EP4"
    },
    "releasedOrder": "2026-11-26",
    "nexusDownloads": 2,
    "estimatedPriceThb": 220,
    "tags": [
      "แปลภาษาไทย 100%",
      "Fears to Fathom",
      "โลโก้ไทยในเกม",
      "ฟอนต์มีหัว 3 ชุด",
      "Steam PC"
    ],
    "seoKeywords": [
      "Fears to Fathom - Ironbark Lookout ม็อดไทย",
      "Fears to Fathom - Ironbark Lookout ม็อดภาษาไทย",
      "Fears to Fathom Ironbark Lookout แปลไทย",
      "Fears to Fathom ม็อดไทย",
      "กลัวที่จะหยั่งรู้ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/fearstofathomironbarklookout/mods/3",
    "media": {
      "header": "/mods/fears-to-fathom-ironbark-lookout/header.webp",
      "cover": "/mods/fears-to-fathom-ironbark-lookout/cover.webp",
      "ogImage": "/mods/fears-to-fathom-ironbark-lookout/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/fears-to-fathom-ironbark-lookout/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Fears to Fathom - Ironbark Lookout (กลัวที่จะหยั่งรู้ EP4)",
          "caption": "ภาพปกม็อดภาษาไทย Fears to Fathom - Ironbark Lookout (กลัวที่จะหยั่งรู้ EP4)",
          "tag": "Cover"
        },
        {
          "src": "/mods/fears-to-fathom-ironbark-lookout/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้ — Fears to Fathom - Ironbark Lookout",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้",
          "tag": "Title"
        },
        {
          "src": "/mods/fears-to-fathom-ironbark-lookout/gallery-02.webp",
          "alt": "ตัวอย่างซับไตเติลและบทสนทนาในเกม — Fears to Fathom - Ironbark Lookout",
          "caption": "ตัวอย่างซับไตเติลและบทสนทนาในเกม",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/fears-to-fathom-ironbark-lookout/gallery-03.webp",
          "alt": "ตัวอย่างข้อความและการแสดงผลฟอนต์ไทย — Fears to Fathom - Ironbark Lookout",
          "caption": "ตัวอย่างข้อความและการแสดงผลฟอนต์ไทย",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/fears-to-fathom-ironbark-lookout/gallery-04.webp",
          "alt": "ตัวอย่างฉากในเกมภาษาไทย — Fears to Fathom - Ironbark Lookout",
          "caption": "ตัวอย่างฉากในเกมภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped",
      "translatedLines": "1,553 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "1.18 MB",
      "releasedAt": "26 พ.ย. 2026",
      "updatedAt": "26 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2506160/",
        "steamAppId": 2506160
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store",
        "url": "https://store.playstation.com/th-th/search/fears%20to%20fathom"
      }
    ],
    "files": [
      {
        "id": "ftf-ep4-thai-v1-0",
        "fileName": "FTF_IronbarkLookout_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (EP4)",
        "version": "v1.0",
        "size": "1.18 MB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "e0a65eff6cbde8675bd5fc525c5cce2d317417903ae1546ddd35a31ec69c1b06",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep4-v1.0/FTF_IronbarkLookout_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ ThaiMod_EP4 นำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของเกม",
        "backupUrl": "https://drive.google.com/file/d/1XE92KYYCmLtOMjG9unti0nIXqU2FU9n0/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "ftf-ep4-qol-v1-0",
        "fileName": "FTF_IronbarkLookout_DisplayQoL_v1.0.zip",
        "label": "ม็อดเสริม (ไม่บังคับ) — Display & Ultrawide 21:9 QoL (F10)",
        "optional": true,
        "version": "v1.0",
        "size": "859.6 KB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "03c9aab59f66683f370fe0ec4ad7b4b3f9efb60142dbc2b70b55d62017d2b1e9",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep4-v1.0/FTF_IronbarkLookout_DisplayQoL_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "ม็อดเสริมปรับความละเอียด โหมดไร้ขอบ (Borderless), True 21:9 Ultrawide UI และ FOV (กด F10 ในเกม) ใช้เดี่ยวหรือใช้ร่วมกับม็อดไทยได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1DMgLzY9ljMTcth3OpHeRvHl8sVz78NGm/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Fears to Fathom - Ironbark Lookout",
      "releaseDate": "20 ต.ค. 2023",
      "developers": [
        "Rayll Studios"
      ],
      "publishers": [
        "Rayll Studios"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ตอน EP4 ในซีรีส์สยองขวัญจิตวิทยา Fears to Fathom สัมผัสเรื่องราวชวนขนลุกมุมมองบุคคลที่หนึ่งสไตล์เทป VHS",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-2300 | AMD FX-6350"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 650 Ti, 2 GB | AMD Radeon R7 360, 2 GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 5 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-4670 | AMD Ryzen5 1600"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GTX 1060 6GB or AMD Radeon RX 580 8GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 5 GB"
        }
      ]
    }
  },
  {
    "slug": "fears-to-fathom-carson-house",
    "gameTitle": "Fears to Fathom - Carson House",
    "thaiTitle": "Fears to Fathom - Carson House ม็อดภาษาไทย (กลัวที่จะหยั่งรู้)",
    "shortDescription": "Fears to Fathom - Carson House (กลัวที่จะหยั่งรู้) - ม็อดภาษาไทย 100% แปลครบ 708 ข้อความ พร้อมโลโก้ไทยและฟอนต์มีหัว 3 ชุด | AI Model : Gemini 4 Neon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Fears to Fathom - Carson House แปลครบ 708 ข้อความ (100%) ด้วยสำนวนภาษาไทยที่ลื่นไหลสมจริงในโทนภาพยนตร์สยองขวัญ พร้อมโลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” ในเกม แยกฟอนต์ไทยมีหัว 3 บทบาท (เมนู/ซับ, เอกสาร, แชทมือถือ) แก้สระลอย 100% และติดตั้งแบบไม่ทับไฟล์เกม",
    "features": [
      "แปลข้อความครบ 100% (708 ข้อความ) ครอบคลุมบทสนทนา แชทมือถือ เอกสาร อินโทร/บทส่งท้าย เมนู และปุ่มควบคุม",
      "โลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” สไตล์ VHS ตรงตามต้นฉบับ พร้อมคงชื่อตอนภาษาอังกฤษ",
      "แยกฟอนต์ภาษาไทยแบบมีหัว 3 บทบาทชัดเจน (IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "ทำงานแบบ Non-Overwriting ไม่แก้ไฟล์ต้นฉบับเกม ลากวางใช้งานได้ทันทีและถอนการติดตั้งได้สะอาด 100%",
      "มีไฟล์เสริม Display & True 21:9 Ultrawide QoL Fix (กด F10 ตั้งค่าจอ/FOV) ให้ดาวน์โหลดใช้งานร่วมกันได้ในแท็บไฟล์"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ FTF_CarsonHouse_ThaiMod_v1.0.zip จะพบโฟลเดอร์ ThaiMod_EP3",
      "เปิดเข้าไปในโฟลเดอร์ ThaiMod_EP3 แล้วนำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกม",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (หากต้องการโหมดจอ Ultrawide 21:9 / ปรับ FOV ให้โหลดไฟล์ Display QoL ในแท็บไฟล์มาใช้ร่วมกันได้)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Fears to Fathom - Carson House\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกม ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped, Sarabun, Noto Sans Thai Looped (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "series": {
      "id": "fears-to-fathom",
      "name": "Fears to Fathom",
      "thaiName": "กลัวที่จะหยั่งรู้ (ซีรีส์สยองขวัญครบทุกตอน)",
      "description": "ซีรีส์สยองขวัญจิตวิทยาแบบตอนสั้นอิงจากเรื่องเล่าจริงของ Rayll ครบทั้ง 5 ตอนและ Season 2",
      "order": 3,
      "badgeLabel": "EP3"
    },
    "releasedOrder": "2026-11-26",
    "nexusDownloads": 3,
    "estimatedPriceThb": 115,
    "tags": [
      "แปลภาษาไทย 100%",
      "Fears to Fathom",
      "โลโก้ไทยในเกม",
      "ฟอนต์มีหัว 3 ชุด",
      "Steam PC"
    ],
    "seoKeywords": [
      "Fears to Fathom - Carson House ม็อดไทย",
      "Fears to Fathom - Carson House ม็อดภาษาไทย",
      "Fears to Fathom Carson House แปลไทย",
      "Fears to Fathom ม็อดไทย",
      "กลัวที่จะหยั่งรู้ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/fearstofathomcarsonhouse/mods/2",
    "media": {
      "header": "/mods/fears-to-fathom-carson-house/header.webp",
      "cover": "/mods/fears-to-fathom-carson-house/cover.webp",
      "ogImage": "/mods/fears-to-fathom-carson-house/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/fears-to-fathom-carson-house/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Fears to Fathom - Carson House (กลัวที่จะหยั่งรู้ EP3)",
          "caption": "ภาพปกม็อดภาษาไทย Fears to Fathom - Carson House (กลัวที่จะหยั่งรู้ EP3)",
          "tag": "Cover"
        },
        {
          "src": "/mods/fears-to-fathom-carson-house/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้ — Fears to Fathom - Carson House",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้",
          "tag": "Title"
        },
        {
          "src": "/mods/fears-to-fathom-carson-house/gallery-02.webp",
          "alt": "ตัวอย่างหน้าเมนูและฟอนต์ไทยมีหัว — Fears to Fathom - Carson House",
          "caption": "ตัวอย่างหน้าเมนูและฟอนต์ไทยมีหัว",
          "tag": "In-Game"
        },
        {
          "src": "/mods/fears-to-fathom-carson-house/gallery-03.webp",
          "alt": "ตัวอย่างบทสนทนาและแชทมือถือภาษาไทย — Fears to Fathom - Carson House",
          "caption": "ตัวอย่างบทสนทนาและแชทมือถือภาษาไทย",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/fears-to-fathom-carson-house/gallery-04.webp",
          "alt": "ตัวอย่างคำบรรยายในเกมภาษาไทย — Fears to Fathom - Carson House",
          "caption": "ตัวอย่างคำบรรยายในเกมภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped",
      "translatedLines": "708 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "1.13 MB",
      "releasedAt": "26 พ.ย. 2026",
      "updatedAt": "26 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2120900/",
        "steamAppId": 2120900
      }
    ],
    "files": [
      {
        "id": "ftf-ep3-thai-v1-0",
        "fileName": "FTF_CarsonHouse_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (EP3)",
        "version": "v1.0",
        "size": "1.13 MB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "728432f92870e7a9ba9b580a5d428408483f981efcca9ed970821d10cac7e227",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep3-v1.0/FTF_CarsonHouse_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ ThaiMod_EP3 นำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของเกม",
        "backupUrl": "https://drive.google.com/file/d/1Rr71ELC7oVJxo9Xs2BQoY-maa_QP2cr0/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "ftf-ep3-qol-v1-0",
        "fileName": "FTF_CarsonHouse_DisplayQoL_v1.0.zip",
        "label": "ม็อดเสริม (ไม่บังคับ) — Display & Ultrawide 21:9 QoL (F10)",
        "optional": true,
        "version": "v1.0",
        "size": "859.6 KB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "122487a82ce65af1c875dddcf872e69549ce3e3ab86a1afc613e455d0c40202c",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep3-v1.0/FTF_CarsonHouse_DisplayQoL_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "ม็อดเสริมปรับความละเอียด โหมดไร้ขอบ (Borderless), True 21:9 Ultrawide UI และ FOV (กด F10 ในเกม) ใช้เดี่ยวหรือใช้ร่วมกับม็อดไทยได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1n7t6fqtLfYK2d9-1667B4-xUQViFYYYt/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Fears to Fathom - Carson House",
      "releaseDate": "9 ม.ค. 2023",
      "developers": [
        "Rayll"
      ],
      "publishers": [
        "Rayll"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ตอน EP3 ในซีรีส์สยองขวัญจิตวิทยา Fears to Fathom สัมผัสเรื่องราวชวนขนลุกมุมมองบุคคลที่หนึ่งสไตล์เทป VHS",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-2300 | AMD FX-6350"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 650 Ti, 2 GB | AMD Radeon R7 360, 2 GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 6 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-4670 | AMD Ryzen5 1600"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GTX 1060 6GB or AMD Radeon RX 580 8GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 6 GB"
        }
      ]
    }
  },
  {
    "slug": "fears-to-fathom-norwood-hitchhike",
    "gameTitle": "Fears to Fathom - Norwood Hitchhike",
    "thaiTitle": "Fears to Fathom - Norwood Hitchhike ม็อดภาษาไทย (กลัวที่จะหยั่งรู้)",
    "shortDescription": "Fears to Fathom - Norwood Hitchhike (กลัวที่จะหยั่งรู้) - ม็อดภาษาไทย 100% แปลครบ 581 ข้อความ พร้อมโลโก้ไทยและฟอนต์มีหัว 3 ชุด | AI Model : Gemini 4 Neon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Fears to Fathom - Norwood Hitchhike แปลครบ 581 ข้อความ (100%) ด้วยสำนวนภาษาไทยที่ลื่นไหลสมจริงในโทนภาพยนตร์สยองขวัญ พร้อมโลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” ในเกม แยกฟอนต์ไทยมีหัว 3 บทบาท (เมนู/ซับ, เอกสาร, แชทมือถือ) แก้สระลอย 100% และติดตั้งแบบไม่ทับไฟล์เกม",
    "features": [
      "แปลข้อความครบ 100% (581 ข้อความ) ครอบคลุมบทสนทนา แชทมือถือ เอกสาร อินโทร/บทส่งท้าย เมนู และปุ่มควบคุม",
      "โลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” สไตล์ VHS ตรงตามต้นฉบับ พร้อมคงชื่อตอนภาษาอังกฤษ",
      "แยกฟอนต์ภาษาไทยแบบมีหัว 3 บทบาทชัดเจน (IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "ทำงานแบบ Non-Overwriting ไม่แก้ไฟล์ต้นฉบับเกม ลากวางใช้งานได้ทันทีและถอนการติดตั้งได้สะอาด 100%",
      "มีไฟล์เสริม Display & True 21:9 Ultrawide QoL Fix (กด F10 ตั้งค่าจอ/FOV) ให้ดาวน์โหลดใช้งานร่วมกันได้ในแท็บไฟล์"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ FTF_NorwoodHitchhike_ThaiMod_v1.0.zip จะพบโฟลเดอร์ ThaiMod_EP2",
      "เปิดเข้าไปในโฟลเดอร์ ThaiMod_EP2 แล้วนำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกม",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (หากต้องการโหมดจอ Ultrawide 21:9 / ปรับ FOV ให้โหลดไฟล์ Display QoL ในแท็บไฟล์มาใช้ร่วมกันได้)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Fears to Fathom - Norwood Hitchhike\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกม ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped, Sarabun, Noto Sans Thai Looped (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "series": {
      "id": "fears-to-fathom",
      "name": "Fears to Fathom",
      "thaiName": "กลัวที่จะหยั่งรู้ (ซีรีส์สยองขวัญครบทุกตอน)",
      "description": "ซีรีส์สยองขวัญจิตวิทยาแบบตอนสั้นอิงจากเรื่องเล่าจริงของ Rayll ครบทั้ง 5 ตอนและ Season 2",
      "order": 2,
      "badgeLabel": "EP2"
    },
    "releasedOrder": "2026-11-26",
    "nexusDownloads": 3,
    "estimatedPriceThb": 115,
    "tags": [
      "แปลภาษาไทย 100%",
      "Fears to Fathom",
      "โลโก้ไทยในเกม",
      "ฟอนต์มีหัว 3 ชุด",
      "Steam PC"
    ],
    "seoKeywords": [
      "Fears to Fathom - Norwood Hitchhike ม็อดไทย",
      "Fears to Fathom - Norwood Hitchhike ม็อดภาษาไทย",
      "Fears to Fathom Norwood Hitchhike แปลไทย",
      "Fears to Fathom ม็อดไทย",
      "กลัวที่จะหยั่งรู้ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/fearstofathomnorwoodhitchhike/mods/2",
    "media": {
      "header": "/mods/fears-to-fathom-norwood-hitchhike/header.webp",
      "cover": "/mods/fears-to-fathom-norwood-hitchhike/cover.webp",
      "ogImage": "/mods/fears-to-fathom-norwood-hitchhike/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/fears-to-fathom-norwood-hitchhike/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Fears to Fathom - Norwood Hitchhike (กลัวที่จะหยั่งรู้ EP2)",
          "caption": "ภาพปกม็อดภาษาไทย Fears to Fathom - Norwood Hitchhike (กลัวที่จะหยั่งรู้ EP2)",
          "tag": "Cover"
        },
        {
          "src": "/mods/fears-to-fathom-norwood-hitchhike/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้ — Fears to Fathom - Norwood Hitchhike",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย กลัวที่จะหยั่งรู้",
          "tag": "Title"
        },
        {
          "src": "/mods/fears-to-fathom-norwood-hitchhike/gallery-02.webp",
          "alt": "หน้าตั้งค่าภาษาไทย — Fears to Fathom - Norwood Hitchhike",
          "caption": "หน้าตั้งค่าภาษาไทย",
          "tag": "Settings"
        },
        {
          "src": "/mods/fears-to-fathom-norwood-hitchhike/gallery-03.webp",
          "alt": "ตัวอย่างซับไตเติลและบทสนทนาในเกม — Fears to Fathom - Norwood Hitchhike",
          "caption": "ตัวอย่างซับไตเติลและบทสนทนาในเกม",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped",
      "translatedLines": "581 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "1.07 MB",
      "releasedAt": "26 พ.ย. 2026",
      "updatedAt": "26 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/1763050/",
        "steamAppId": 1763050
      }
    ],
    "files": [
      {
        "id": "ftf-ep2-thai-v1-0",
        "fileName": "FTF_NorwoodHitchhike_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (EP2)",
        "version": "v1.0",
        "size": "1.07 MB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "ab3af078df38212bb7123049d9e87ca81df94023cabadad78aa74e647b2ddf04",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep2-v1.0/FTF_NorwoodHitchhike_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ ThaiMod_EP2 นำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของเกม",
        "backupUrl": "https://drive.google.com/file/d/1uiGFBMaLd5NgJAzYPRYga8i7CKauthqU/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "ftf-ep2-qol-v1-0",
        "fileName": "FTF_NorwoodHitchhike_DisplayQoL_v1.0.zip",
        "label": "ม็อดเสริม (ไม่บังคับ) — Display & Ultrawide 21:9 QoL (F10)",
        "optional": true,
        "version": "v1.0",
        "size": "859.6 KB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "ee7a0a210270f59608686def42f5990ada5eb924cbc1a3944c8df76cd8b6a1d9",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep2-v1.0/FTF_NorwoodHitchhike_DisplayQoL_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "ม็อดเสริมปรับความละเอียด โหมดไร้ขอบ (Borderless), True 21:9 Ultrawide UI และ FOV (กด F10 ในเกม) ใช้เดี่ยวหรือใช้ร่วมกับม็อดไทยได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1nv6SODck4plYHtTmcfH36OleDJKY6kHf/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Fears to Fathom - Norwood Hitchhike",
      "releaseDate": "6 ม.ค. 2022",
      "developers": [
        "Rayll"
      ],
      "publishers": [
        "Rayll"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ตอน EP2 ในซีรีส์สยองขวัญจิตวิทยา Fears to Fathom สัมผัสเรื่องราวชวนขนลุกมุมมองบุคคลที่หนึ่งสไตล์เทป VHS",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "AMD Phenom II X4 965, 3.40 GHz / Intel Core i5-2300, 2.80 GHz"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 6 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "AMD Radeon™ HD 7730, NVIDIA GeForce® GT 640"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 7 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "AMD FX-8350, 4.00 GHz / Intel Core i5-3470, 3.20 GHz"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Radeon RX 590, 8 GB / GeForce GTX 1060, 6 GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 7 GB"
        }
      ]
    }
  },
  {
    "slug": "fears-to-fathom-home-alone",
    "gameTitle": "Fears to Fathom - Home Alone",
    "thaiTitle": "Fears to Fathom - Home Alone ม็อดภาษาไทย (กลัวที่จะหยั่งรู้)",
    "shortDescription": "Fears to Fathom - Home Alone (กลัวที่จะหยั่งรู้) - ม็อดภาษาไทย 100% แปลครบ 203 ข้อความ พร้อมโลโก้ไทยและฟอนต์มีหัว 3 ชุด | AI Model : Gemini 4 Neon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Fears to Fathom - Home Alone แปลครบ 203 ข้อความ (100%) ด้วยสำนวนภาษาไทยที่ลื่นไหลสมจริงในโทนภาพยนตร์สยองขวัญ พร้อมโลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” ในเกม แยกฟอนต์ไทยมีหัว 3 บทบาท (เมนู/ซับ, เอกสาร, แชทมือถือ) แก้สระลอย 100% และติดตั้งแบบไม่ทับไฟล์เกม",
    "features": [
      "แปลข้อความครบ 100% (203 ข้อความ) ครอบคลุมบทสนทนา แชทมือถือ เอกสาร อินโทร/บทส่งท้าย เมนู และปุ่มควบคุม",
      "โลโก้ภาษาไทย “กลัวที่จะหยั่งรู้” สไตล์ VHS ตรงตามต้นฉบับ พร้อมคงชื่อตอนภาษาอังกฤษ",
      "แยกฟอนต์ภาษาไทยแบบมีหัว 3 บทบาทชัดเจน (IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "ทำงานแบบ Non-Overwriting ไม่แก้ไฟล์ต้นฉบับเกม ลากวางใช้งานได้ทันทีและถอนการติดตั้งได้สะอาด 100%",
      "มีไฟล์เสริม Display & True 21:9 Ultrawide QoL Fix (กด F10 ตั้งค่าจอ/FOV) ให้ดาวน์โหลดใช้งานร่วมกันได้ในแท็บไฟล์"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ FTF_HomeAlone_ThaiMod_v1.0.zip จะพบโฟลเดอร์ ThaiMod_EP1",
      "เปิดเข้าไปในโฟลเดอร์ ThaiMod_EP1 แล้วนำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกม",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (หากต้องการโหมดจอ Ultrawide 21:9 / ปรับ FOV ให้โหลดไฟล์ Display QoL ในแท็บไฟล์มาใช้ร่วมกันได้)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Fears to Fathom - Episode 1\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกม ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped, Sarabun, Noto Sans Thai Looped (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "series": {
      "id": "fears-to-fathom",
      "name": "Fears to Fathom",
      "thaiName": "กลัวที่จะหยั่งรู้ (ซีรีส์สยองขวัญครบทุกตอน)",
      "description": "ซีรีส์สยองขวัญจิตวิทยาแบบตอนสั้นอิงจากเรื่องเล่าจริงของ Rayll ครบทั้ง 5 ตอนและ Season 2",
      "order": 1,
      "badgeLabel": "EP1"
    },
    "releasedOrder": "2026-11-26",
    "nexusDownloads": 5,
    "estimatedPriceThb": 0,
    "tags": [
      "แปลภาษาไทย 100%",
      "Fears to Fathom",
      "โลโก้ไทยในเกม",
      "ฟอนต์มีหัว 3 ชุด",
      "Steam PC"
    ],
    "seoKeywords": [
      "Fears to Fathom - Home Alone ม็อดไทย",
      "Fears to Fathom - Home Alone ม็อดภาษาไทย",
      "Fears to Fathom Home Alone แปลไทย",
      "Fears to Fathom ม็อดไทย",
      "กลัวที่จะหยั่งรู้ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/fearstofathomhomealone/mods/2",
    "media": {
      "header": "/mods/fears-to-fathom-home-alone/header.webp",
      "cover": "/mods/fears-to-fathom-home-alone/cover.webp",
      "ogImage": "/mods/fears-to-fathom-home-alone/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/fears-to-fathom-home-alone/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Fears to Fathom - Home Alone (กลัวที่จะหยั่งรู้ EP1)",
          "caption": "ภาพปกม็อดภาษาไทย Fears to Fathom - Home Alone (กลัวที่จะหยั่งรู้ EP1)",
          "tag": "Cover"
        },
        {
          "src": "/mods/fears-to-fathom-home-alone/gallery-01.webp",
          "alt": "ตัวอย่างหน้าจอเมนูและโลโก้ภาษาไทยในเกม — Fears to Fathom - Home Alone",
          "caption": "ตัวอย่างหน้าจอเมนูและโลโก้ภาษาไทยในเกม",
          "tag": "In-Game"
        },
        {
          "src": "/mods/fears-to-fathom-home-alone/gallery-02.webp",
          "alt": "ตัวอย่างข้อความและการตั้งค่าภาษาไทย — Fears to Fathom - Home Alone",
          "caption": "ตัวอย่างข้อความและการตั้งค่าภาษาไทย",
          "tag": "In-Game"
        },
        {
          "src": "/mods/fears-to-fathom-home-alone/gallery-03.webp",
          "alt": "ตัวอย่างซับไตเติลและบทสนทนาภาษาไทย — Fears to Fathom - Home Alone",
          "caption": "ตัวอย่างซับไตเติลและบทสนทนาภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped / Sarabun / Noto Sans Thai Looped",
      "translatedLines": "203 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "1.34 MB",
      "releasedAt": "26 พ.ย. 2026",
      "updatedAt": "26 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/1671340/",
        "steamAppId": 1671340
      }
    ],
    "files": [
      {
        "id": "ftf-ep1-thai-v1-0",
        "fileName": "FTF_HomeAlone_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (EP1)",
        "version": "v1.0",
        "size": "1.34 MB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "e6ef04316a71e4e60fdfa061833bf2a84f163e6c7b94cdb741a5a30e0ae49a5e",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep1-v1.0/FTF_HomeAlone_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิดเข้าโฟลเดอร์ ThaiMod_EP1 นำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของเกม",
        "backupUrl": "https://drive.google.com/file/d/1HMeRJ2iFkWnv5QVQlbiWCP7eFrn1cjT3/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "ftf-ep1-qol-v1-0",
        "fileName": "FTF_HomeAlone_DisplayQoL_v1.0.zip",
        "label": "ม็อดเสริม (ไม่บังคับ) — Display & Ultrawide 21:9 QoL (F10)",
        "optional": true,
        "version": "v1.0",
        "size": "859.6 KB",
        "uploadedAt": "26 พ.ย. 2026",
        "sha256": "d0024089a978f191b6312ef2965b830e195f228bce8fb80df9517ed0d5332532",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/ftf-ep1-v1.0/FTF_HomeAlone_DisplayQoL_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "ม็อดเสริมปรับความละเอียด โหมดไร้ขอบ (Borderless), True 21:9 Ultrawide UI และ FOV (กด F10 ในเกม) ใช้เดี่ยวหรือใช้ร่วมกับม็อดไทยได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1BvuA46tohuYOID29ED07LZn5eomTEl5p/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Fears to Fathom - Home Alone",
      "releaseDate": "2 ก.ค. 2021",
      "developers": [
        "Rayll"
      ],
      "publishers": [
        "Rayll"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ตอน EP1 ในซีรีส์สยองขวัญจิตวิทยา Fears to Fathom สัมผัสเรื่องราวชวนขนลุกมุมมองบุคคลที่หนึ่งสไตล์เทป VHS",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ *",
          "value": "Windows 7 or later"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "2.6 GHz Quad Core or similar"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "GeForce GTX 950 or Radeon HD 7970"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 4 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "Yes"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "Use microphone for enhanced experience"
        }
      ],
      "recommendedSpecs": []
    }
  },
  {
    "slug": "venus-vacation-prism-dead-or-alive-xtreme",
    "gameTitle": "Venus Vacation PRISM - DEAD OR ALIVE Xtreme",
    "thaiTitle": "Venus Vacation PRISM - DEAD OR ALIVE Xtreme ม็อดภาษาไทย",
    "shortDescription": "ม็อดแปลภาษาไทยสำหรับ Venus Vacation PRISM 100% แปลครบทั้งเนื้อเรื่อง แชท เมนู และชื่อชุด พร้อมโลโก้เกมภาษาไทย ฟอนต์ Mitr | Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Venus Vacation PRISM - DEAD OR ALIVE Xtreme เกลาสำนวนลื่นไหลเป็นธรรมชาติตามบุคลิกตัวละครทุกตัว คงคำลงท้ายภาษาญี่ปุ่น (ซัง / จัง / คุง / ท่าน) ตรงตามเสียงพากย์ต้นฉบับ พร้อมโลโก้หน้าหลักภาษาไทยแบบขยับครบ 277 เฟรม และฟอนต์ Mitr SDF ปรับจูนเฉพาะสำหรับ Katana Engine",
    "features": [
      "แปลภาษาไทยครบ 13,946 รายการ (จาก 14,475 บรรทัด) ครอบคลุมเนื้อเรื่องหลัก แชทสมาร์ทโฟน เมนู และชื่อชุดทั้งหมด",
      "โลโก้เกมภาษาไทย “วีนัส เวเคชัน - เดด ออร์ อะไลฟ์ เอ็กซ์ตรีม - ปริซึม” แทนที่ครบแอนิเมชัน 277 เฟรม",
      "ฟอนต์ไทย Mitr SDF ปรับพิกัดสระและวรรณยุกต์สำหรับ Katana Engine อ่านสบายตา ไม่มีสระลอย",
      "คงคำเรียกขานภาษาญี่ปุ่น (ซัง / จัง / คุง / ท่าน) และสรรพนามตรงตามเพศและบริบททุกตัวละคร",
      "แพ็กเกจสะอาด ปลอดภัย 100% ไม่มีไฟล์สคริปต์ (.bat / .exe) ลากวางทับใช้งานได้ทันที ไม่กระทบเซฟเกม"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ VenusVacationPRISM_ThaiMod_v1.0.zip",
      "นำโฟลเดอร์ archive และ fdata_package ไปวางทับลงในโฟลเดอร์หลักของเกม",
      "กดยืนยันวางทับทั้ง 4 ไฟล์ แล้วเปิดเกมเล่นเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Venus Vacation PRISM - DEAD OR ALIVE Xtreme -\\",
    "uninstallNote": "เปิด Steam → คลิกขวาที่ตัวเกม → Properties → Installed Files → กด Verify integrity of game files ระบบจะคืนค่าไฟล์ต้นฉบับทั้ง 4 ไฟล์อัตโนมัติ",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon / Hydrogen"
      },
      {
        "role": "Thai Font",
        "name": "Mitr (SIL Open Font License 1.1)"
      }
    ],
    "genres": [
      "จำลองสถานการณ์",
      "ผจญภัย",
      "เนื้อเรื่อง"
    ],
    "releasedOrder": "2026-11-24",
    "nexusDownloads": 80,
    "estimatedPriceThb": 660,
    "tags": [
      "แปลภาษาไทย 100%",
      "โลโก้ไทย 277 เฟรม",
      "Mitr SDF",
      "Katana Engine",
      "Steam PC"
    ],
    "seoKeywords": [
      "Venus Vacation PRISM - DEAD OR ALIVE Xtreme ม็อดไทย",
      "Venus Vacation PRISM ม็อดไทย",
      "Venus Vacation PRISM แปลไทย",
      "DEAD OR ALIVE Xtreme PRISM ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "featured": true,
    "media": {
      "header": "/mods/venus-vacation-prism/header.webp",
      "cover": "/mods/venus-vacation-prism/cover.webp",
      "ogImage": "/mods/venus-vacation-prism/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/venus-vacation-prism/gallery-01.webp",
          "alt": "ปกม็อดภาษาไทย Venus Vacation PRISM",
          "caption": "ภาพปกม็อดภาษาไทย",
          "tag": "Cover"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-02.webp",
          "alt": "ตัวอย่างม็อดภาษาไทยฉากคาเฟ่",
          "caption": "ตัวอย่างฉากคาเฟ่",
          "tag": "Showcase"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-03.webp",
          "alt": "หน้าหลักเกมและโลโก้ภาษาไทย",
          "caption": "หน้าหลักและโลโก้ภาษาไทย",
          "tag": "Title"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-04.webp",
          "alt": "เมนูตั้งค่าระบบภาษาไทย",
          "caption": "เมนูตั้งค่าระบบ",
          "tag": "Settings"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-05.webp",
          "alt": "โหมดถ่ายภาพชายหาด",
          "caption": "โหมดถ่ายภาพชายหาด",
          "tag": "Photo Mode"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-06.webp",
          "alt": "เมนูปรับค่ากล้องภาษาไทย",
          "caption": "เมนูปรับตั้งค่ากล้อง",
          "tag": "Camera"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-07.webp",
          "alt": "แชทสมาร์ทโฟนภาษาไทย",
          "caption": "แชทสมาร์ทโฟนและตัวเลือกบทสนทนา",
          "tag": "Chat"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-08.webp",
          "alt": "หน้าจอคัดเลือกภาพถ่าย",
          "caption": "หน้าจอคัดเลือกภาพถ่าย",
          "tag": "Gallery"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-09.webp",
          "alt": "โหมดถ่ายภาพคู่ริมสระ",
          "caption": "โหมดถ่ายภาพคู่",
          "tag": "Photo Mode"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-10.webp",
          "alt": "ตัวอย่างฟอนต์ Mitr SDF",
          "caption": "รายละเอียดฟอนต์ไทย Mitr SDF",
          "tag": "Font"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-11.webp",
          "alt": "ซับไตเติลบทสนทนาภายในห้อง",
          "caption": "ซับไตเติลบทสนทนา",
          "tag": "Dialogue"
        },
        {
          "src": "/mods/venus-vacation-prism/gallery-12.webp",
          "alt": "ซับไตเติลบทสนทนาฉากชายหาด",
          "caption": "ซับไตเติลฉากชายหาด",
          "tag": "Dialogue"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon / Hydrogen",
      "fontUsed": "Mitr SDF (ปรับพิกัดสระ Katana)",
      "translatedLines": "13,946 / 14,475 บรรทัด (100%)",
      "coveragePercent": 100,
      "engine": "Katana Engine",
      "fileSize": "82.0 MB",
      "releasedAt": "24 พ.ย. 2026",
      "updatedAt": "24 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/3155730/Venus_Vacation_PRISM__DEAD_OR_ALIVE_Xtreme/",
        "steamAppId": 3155730
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5 / PS4)",
        "url": "https://store.playstation.com/en-th/search/venus%20vacation%20prism"
      }
    ],
    "files": [
      {
        "id": "vvp-v1-0",
        "fileName": "VenusVacationPRISM_ThaiMod_v1.0.zip",
        "label": "VenusVacationPRISM ThaiMod v1.0 (Main File)",
        "version": "v1.0",
        "size": "81.95 MB",
        "uploadedAt": "24 พ.ย. 2026",
        "sha256": "b35e7e7aa94baaabd9ce112200c44bc6084b840e619af78c69aadb76ed5076d0",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/vvp-v1.0/VenusVacationPRISM_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "นำโฟลเดอร์ archive และ fdata_package ไปวางทับในโฟลเดอร์หลักของเกมได้เลย กดแทนที่ไฟล์ทั้งหมด",
        "backupUrl": "https://drive.google.com/file/d/1cPwqsSi3ZWiqLzAw1sjABQgwx7AoSuxM/view?usp=sharing",
        "backupHost": "Google Drive",
        "knownNotice": "ไม่สามารถลง Nexus Mods ได้เนื่องจากไฟล์เอนจิน Katana (.lnk) ถูกระบบอัตโนมัติกักกัน จึงเปิดให้โหลดโดยตรงผ่านเว็บนี้ (ตัวอักษรขนาดเล็กมากบางจุดอาจมีตกบรรทัดบ้างเล็กน้อย)"
      }
    ],
    "fallbackSteam": {
      "name": "Venus Vacation PRISM - DEAD OR ALIVE Xtreme -",
      "releaseDate": "26 มี.ค. 2025",
      "developers": [
        "KOEI TECMO GAMES CO., LTD."
      ],
      "publishers": [
        "KOEI TECMO GAMES CO., LTD."
      ],
      "genres": [
        "ผจญภัย",
        "จำลองสถานการณ์"
      ],
      "shortDescription": "เกมโรแมนติกแอดเวนเจอร์เต็มรูปแบบภาคแรกในซีรีส์ DEAD OR ALIVE Xtreme สัมผัสเรื่องราวความรักและการถ่ายภาพบนเกาะวีนัสกับ 6 สาวสุดน่ารัก",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows® 10, Windows® 11 64bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-7400 or better, Ryzen 3 3200G or better"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "GeForce GTX 1650（VRAM 4GB） or better, AMD Radeon RX 570（VRAM 4GB） or better"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "เครือข่าย",
          "value": "การเชื่อมต่ออินเทอร์เน็ตแบบบรอดแบนด์"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 32 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "16-bit stereo with 48KHz playback"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "SSD Recommended Based on &quot;Best Performance&quot; settings/type &quot;Bilinear&quot;/1280x720/30FPS *Frame rate may drop in certain situations"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows® 10, Windows® 11 64bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i7-8700 or better, AMD Ryzen 5 3600 XT or better"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce RTX2070（VRAM 8GB） or better, Radeon RX 5700 XT（VRAM 8GB） or better"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "เครือข่าย",
          "value": "การเชื่อมต่ออินเทอร์เน็ตแบบบรอดแบนด์"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 32 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "16-bit stereo with 48KHz playback"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "SSD Recommended Based on &quot;Standard&quot; settings/type &quot;AMD FSR 2&quot;/1920x1080/60FPS *Frame rate may drop in certain situations"
        }
      ]
    }
  },
  {
    "slug": "outbound",
    "gameTitle": "Outbound",
    "thaiTitle": "Outbound ม็อดภาษาไทย (เอาต์บาวด์)",
    "shortDescription": "ม็อดแปลภาษาไทย 100% สำหรับเกม Outbound (เอาต์บาวด์) แปลครบ 3,067 รายการ ทุกเมนู ภารกิจ บทสนทนา จดหมาย และไอเทม พร้อมโลโก้ภาษาไทยในเกม | Steam / Xbox Game Pass",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Outbound (เอาต์บาวด์) ครอบคลุมข้อความในเกมครบ 100% (3,067 รายการ) ทั้งเมนูหลัก การตั้งค่า ภารกิจ บทสนทนา จดหมาย ไอเทม ระบบคราฟต์ และพลังงานแสงอาทิตย์ พร้อมฟอนต์ “นิรมิต (Niramit)” ปรับจูน PUA เฉพาะสำหรับ Unity 6 และโลโก้ภาษาไทย “เอาต์บาวด์” ในกรอบหกเหลี่ยมลายพู่กันต้นฉบับ ทำงานผ่าน BepInEx 6 IL2CPP ไม่แตะไฟล์เดิมของเกมแม้แต่ไฟล์เดียว",
    "features": [
      "แปลครบ 100% (3,067 รายการ): เมนูหลัก, การตั้งค่า, ภารกิจหลัก/เสริม, บทสนทนา, จดหมาย, ชื่อไอเทม และระบบคราฟต์ทั้งหมด",
      "ฟอนต์ภาษาไทย “นิรมิต (Niramit)” พร้อมระบบจัดตำแหน่งสระ-วรรณยุกต์ (PUA) เฉพาะ Unity 6 ไม่มีสระลอยหรือซ้อนทับ",
      "โลโก้ภาษาไทยในเกม “เอาต์บาวด์” กรอบหกเหลี่ยมลายพู่กันตรงต้นฉบับ แทนที่ครบทุกหน้าจอ",
      "ปลอดภัย 100% ไม่ทับไฟล์ต้นฉบับของเกม (BepInEx 6 IL2CPP) ถอนการติดตั้งได้ทันที",
      "รองรับทั้ง Steam และ Xbox Game Pass (PC / WinGDK)"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ Outbound_Thai_Mod_v1.0.zip",
      "นำไฟล์และโฟลเดอร์ทั้งหมดข้างในไปวางไว้ในโฟลเดอร์หลักของตัวเกม (โฟลเดอร์ที่มี Outbound.exe หรือ gamelaunchhelper.exe)",
      "เปิดเข้าเกมตามปกติ (ครั้งแรกจะใช้เวลาเตรียมปลั๊กอิน ~10–20 วินาที ครั้งถัดไปเข้าได้เร็วปกติ)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Outbound\\ หรือ C:\\XboxGames\\Outbound\\Content\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, .doorstop_version, doorstop_config.ini รวมถึงโฟลเดอร์ BepInEx และ dotnet ออกจากโฟลเดอร์เกม ตัวเกมจะกลับเป็นต้นฉบับทันที",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon / Pro / Flash"
      },
      {
        "role": "Thai Font",
        "name": "Niramit & Mitr (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "จำลองสถานการณ์",
      "ผจญภัย",
      "อินดี้"
    ],
    "critics": {
      "metacriticSlug": "outbound",
      "metacriticScore": 64,
      "metacriticUrl": "https://www.metacritic.com/game/outbound/",
      "openCriticScore": 63,
      "openCriticTier": "Weak",
      "openCriticUrl": "https://opencritic.com/game/20234/outbound"
    },
    "releasedOrder": "2026-11-24",
    "nexusDownloads": 9,
    "estimatedPriceThb": 495,
    "tags": [
      "แปลภาษาไทย 100%",
      "โลโก้ไทยในเกม",
      "ฟอนต์ Niramit",
      "Unity 6",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "Outbound ม็อดไทย",
      "Outbound ม็อดภาษาไทย",
      "เอาต์บาวด์ ม็อดไทย",
      "Outbound แปลไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/outbound/mods/30",
    "media": {
      "header": "/mods/outbound/header.webp",
      "cover": "/mods/outbound/cover.webp",
      "ogImage": "/mods/outbound/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/outbound/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Outbound (เอาต์บาวด์)",
          "caption": "ภาพปกม็อดภาษาไทย Outbound (เอาต์บาวด์)",
          "tag": "Cover"
        },
        {
          "src": "/mods/outbound/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย เอาต์บาวด์ — Outbound",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย เอาต์บาวด์",
          "tag": "Title"
        },
        {
          "src": "/mods/outbound/gallery-02.webp",
          "alt": "ตัวอย่างเมนูภาษาไทยฟอนต์นิรมิต — Outbound",
          "caption": "ตัวอย่างเมนูภาษาไทยฟอนต์นิรมิต",
          "tag": "Menu"
        },
        {
          "src": "/mods/outbound/gallery-03.webp",
          "alt": "ตัวอย่างภารกิจและบทสนทนาภาษาไทย — Outbound",
          "caption": "ตัวอย่างภารกิจและบทสนทนาภาษาไทย",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/outbound/gallery-04.webp",
          "alt": "ตัวอย่างการคราฟต์และไอเทมภาษาไทย — Outbound",
          "caption": "ตัวอย่างการคราฟต์และไอเทมภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon / Pro / Flash",
      "fontUsed": "Niramit (PUA) / Mitr (โลโก้)",
      "translatedLines": "3,067 รายการ (100%)",
      "coveragePercent": 100,
      "engine": "Unity 6 (IL2CPP + BepInEx 6)",
      "fileSize": "33.94 MB",
      "releasedAt": "24 พ.ย. 2026",
      "updatedAt": "24 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2681030/Outbound/",
        "steamAppId": 2681030
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/games/store/outbound/9p1v8t3d6j7r"
      },
      {
        "platform": "epic",
        "label": "Epic Games Store",
        "url": "https://store.epicgames.com/th/p/outbound"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5)",
        "url": "https://store.playstation.com/th-th/search/outbound"
      },
      {
        "platform": "nintendo",
        "label": "Nintendo Switch / Switch 2",
        "url": "https://www.nintendo.com/us/search/#q=Outbound"
      }
    ],
    "files": [
      {
        "id": "outbound-v1-0",
        "fileName": "Outbound_Thai_Mod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / Xbox Game Pass)",
        "version": "v1.0",
        "size": "33.94 MB",
        "uploadedAt": "24 พ.ย. 2026",
        "sha256": "441c255a83dcf8e8e0515e1736e0cc2b7da4ea5584da9bd0de974b6ef744b30c",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/outbound-v1.0/Outbound_Thai_Mod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำไฟล์และโฟลเดอร์ทั้งหมดไปวางในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\Outbound\\Content)",
        "backupUrl": "https://drive.google.com/file/d/1riyuveF3UisxHdV7YDm2xRBXss6OJWMm/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Outbound",
      "releaseDate": "11 พ.ค. 2026",
      "developers": [
        "Square Glade Games"
      ],
      "publishers": [
        "Square Glade Games"
      ],
      "genres": [
        "จำลองสถานการณ์",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "ออกเดินทางใช้ชีวิตรถบ้านแคมป์เปอร์สุดอบอุ่น สร้างฐานเคลื่อนที่ ผลิตพลังงานสะอาด คราฟต์ของ และสำรวจธรรมชาติ",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10-64 bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i3 10100F | Ryzen 3 3100 or equivalent"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GTX 1050 | AMD RX 570 or equivalent"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 16 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "DirectX Compatible Sound Card"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 11 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel i3-12100F | Ryzen 7 1700 or better"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA RTX 3060 | AMD RX 7600XT or better"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 16 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "DirectX Compatible Sound Card"
        }
      ]
    }
  },
  {
    "slug": "farm-and-feast",
    "gameTitle": "Farm & Feast",
    "thaiTitle": "Farm & Feast ม็อดภาษาไทย (ฟาร์ม & ฟีสต์)",
    "shortDescription": "ม็อดแปลภาษาไทยสมบูรณ์ 100% (1,833 รายการ) สำหรับเกม Farm & Feast (Patch 0.2.2) สกุลเงินบาท (฿) ฟอนต์ Mitr และโลโก้ภาษาไทย | Steam",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Farm & Feast (รองรับ Patch 0.2.2) แปลและเกลาสำนวนภาษาไทยครบ 100% ครอบคลุมวัตถุดิบ เครื่องเทศ เมนูอาหาร เมล็ดพันธุ์ อุปกรณ์ร้าน ภารกิจ และรีวิวลูกค้า พร้อมเปลี่ยนสกุลเงินเป็นบาท (฿) ทั้งเกม โลโก้เกมภาษาไทย “ฟาร์ม & ฟีสต์” รองรับการพิมพ์ตั้งชื่อร้านภาษาไทย ฟอนต์ Mitr อ่านสบายตา และทำงานผ่าน BepInEx 6 แบบไม่ทับไฟล์เดิมของเกมแม้แต่ไฟล์เดียว",
    "features": [
      "แปลและเกลาสำนวนภาษาไทยครบ 100% (1,833 รายการ) รองรับตัวเกม Patch 0.2.2 ครบถ้วน",
      "แปลภาพป้าย ปุ่ม วัตถุ 3D ฉลากวัตถุดิบ และซองเมล็ดพันธุ์เป็นภาษาไทยรวม 36 ภาพ",
      "เปลี่ยนสกุลเงินจาก $ เป็นเงินบาท (฿) ทั้งเกม ครอบคลุมราคา ภารกิจ ป้ายจ้างพนักงาน ไอคอน HUD และแอนิเมชันเหรียญ 3 มิติ",
      "โลโก้เกมภาษาไทย “ฟาร์ม & ฟีสต์” พร้อมรองรับการพิมพ์ตั้งชื่อร้านอาหารภาษาไทยทั้งในเมนูและป้ายหน้าร้านจริง",
      "ฟอนต์ไทย Mitr แก้สระและวรรณยุกต์ทับซ้อนสมบูรณ์ พร้อมจัดระเบียบปุ่มจอย (PS / Xbox) ให้อยู่มุมขวาบนไม่บังตัวอักษร",
      "ไม่ทับไฟล์เดิมของเกมแม้แต่ไฟล์เดียว (100% Non-Overwriting) ผ่าน BepInEx 6 IL2CPP ถอนการติดตั้งได้ทันทีไม่กระทบเซฟเกม"
    ],
    "installSteps": [
      "เปิดโฟลเดอร์ไฟล์เกม (ใน Steam: คลิกขวาที่เกม Farm & Feast → Manage → Browse local files)",
      "แตกไฟล์ FarmAndFeast_TH_v1.2.zip แล้วเข้าไปในโฟลเดอร์ Mod_Files จากนั้นคัดลอกไฟล์และโฟลเดอร์ทั้งหมดข้างในไปวางในโฟลเดอร์หลักของเกม (ที่มีไฟล์ Farm & Feast.exe)",
      "เข้าเกมและตั้งค่าภาษาในเกมเป็น English (เข้าเกมครั้งแรกอาจรอ ~20–30 วินาทีเพื่อโหลดปลั๊กอิน)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Farm & Feast\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini, .doorstop_version และโฟลเดอร์ BepInEx, dotnet ออกจากโฟลเดอร์เกมได้ทันที ตัวเกมจะกลับเป็นต้นฉบับ 100%",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Hydrogen"
      },
      {
        "role": "Thai Font",
        "name": "Mitr (SIL Open Font License 1.1)"
      }
    ],
    "genres": [
      "จำลองสถานการณ์",
      "อินดี้",
      "แคชชวล"
    ],
    "releasedOrder": "2026-11-22",
    "nexusDownloads": 538,
    "estimatedPriceThb": 279,
    "tags": [
      "แปลภาษาไทย 100%",
      "สกุลเงินบาท ฿",
      "ป้ายไทย 36 ภาพ",
      "Unity 6",
      "Steam PC"
    ],
    "seoKeywords": [
      "Farm & Feast ม็อดไทย",
      "Farm & Feast ม็อดภาษาไทย",
      "Farm & Feast แปลไทย",
      "ฟาร์ม & ฟีสต์ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/farmandfeast/mods/17",
    "featured": true,
    "media": {
      "header": "/mods/farm-and-feast/header.webp",
      "cover": "/mods/farm-and-feast/cover.webp",
      "ogImage": "/mods/farm-and-feast/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/farm-and-feast/gallery-01.webp",
          "alt": "ปกม็อดภาษาไทย Farm & Feast",
          "caption": "ภาพปกม็อดภาษาไทย Farm & Feast",
          "tag": "Cover"
        },
        {
          "src": "/mods/farm-and-feast/gallery-02.webp",
          "alt": "หน้าหลักเกมและโลโก้ภาษาไทย ฟาร์ม & ฟีสต์",
          "caption": "หน้าหลักเกมและโลโก้ภาษาไทย “ฟาร์ม & ฟีสต์”",
          "tag": "Title"
        },
        {
          "src": "/mods/farm-and-feast/gallery-03.webp",
          "alt": "ภาพการเล่นทำฟาร์มและ HUD เงินบาท",
          "caption": "หน้าจอทำฟาร์มและสกุลเงินบาท (฿)",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/farm-and-feast/gallery-04.webp",
          "alt": "หน้าต่างพิมพ์ตั้งชื่อร้านอาหารภาษาไทย",
          "caption": "รองรับการพิมพ์ตั้งชื่อร้านอาหารภาษาไทย",
          "tag": "Restaurant"
        },
        {
          "src": "/mods/farm-and-feast/gallery-05.webp",
          "alt": "ป้ายชื่อร้านอาหารภาษาไทยหน้าร้านจริง",
          "caption": "แสดงชื่อร้านภาษาไทยบนป้ายหน้าร้านจริง",
          "tag": "Store Sign"
        },
        {
          "src": "/mods/farm-and-feast/gallery-06.webp",
          "alt": "หน้าจัดการเมนูอาหารและราคาเงินบาท",
          "caption": "เมนูอาหารและราคาสกุลเงินบาท (฿)",
          "tag": "Menu"
        },
        {
          "src": "/mods/farm-and-feast/gallery-07.webp",
          "alt": "หน้าจัดการทีมพนักงานและอัปเกรด",
          "caption": "หน้าจัดการทีมพนักงานและอัปเกรดร้าน",
          "tag": "Team"
        },
        {
          "src": "/mods/farm-and-feast/gallery-08.webp",
          "alt": "รายการภารกิจและรางวัลเงินบาท",
          "caption": "รายการภารกิจภาษาไทยพร้อมรางวัลเงินบาท (฿)",
          "tag": "Quests"
        },
        {
          "src": "/mods/farm-and-feast/gallery-09.webp",
          "alt": "เมนูตั้งค่าระบบภาษาไทย",
          "caption": "เมนูตั้งค่ากราฟิกและระบบภาษาไทย",
          "tag": "Settings"
        }
      ]
    },
    "specs": {
      "version": "v1.2",
      "aiModel": "Gemini 4 Hydrogen",
      "fontUsed": "Mitr (แก้สระ/วรรณยุกต์ PUA)",
      "translatedLines": "1,833 รายการ (100%)",
      "coveragePercent": 100,
      "engine": "Unity 6 (IL2CPP)",
      "fileSize": "35.6 MB",
      "releasedAt": "19 พ.ย. 2026",
      "updatedAt": "22 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/4521650/Farm__Feast/",
        "steamAppId": 4521650
      }
    ],
    "files": [
      {
        "id": "farm-and-feast-v1-2",
        "fileName": "FarmAndFeast_TH_v1.2.zip",
        "label": "Farm & Feast ThaiMod v1.2 (Patch 0.2.2)",
        "version": "v1.2",
        "size": "35.62 MB",
        "uploadedAt": "22 พ.ย. 2026",
        "sha256": "6617767003b370c3ac07541067d548190434f3b1393bcc163e69ef97ed2225ea",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/farm-and-feast-v1.2/FarmAndFeast_TH_v1.2.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "นำไฟล์ทั้งหมดในโฟลเดอร์ Mod_Files ไปวางในโฟลเดอร์หลักของเกมที่มีไฟล์ Farm & Feast.exe (รองรับ Patch 0.2.2)",
        "backupUrl": "https://drive.google.com/file/d/1b8AvVHZ3nbTkF__JYVHFo-nqFDMkV0SQ/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Farm & Feast",
      "releaseDate": "11 พ.ย. 2026",
      "developers": [
        "dummy dino"
      ],
      "publishers": [
        "dummy dino",
        "Gamersky Games"
      ],
      "genres": [
        "จำลองสถานการณ์",
        "อินดี้",
        "แคชชวล"
      ],
      "shortDescription": "ปลูกวัตถุดิบสด ๆ และบริหารร้านอาหารเล็ก ๆ ของคุณเอง วางแผนเมนูสด ๆ และทำให้ลูกค้ามีความสุข",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 or newer"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-7360U or better"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Intel UHD 630 or Better"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 5 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "AMD Ryzen 5600G"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "GTX 1060 or better"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 5 GB"
        }
      ]
    }
  },
  {
    "slug": "control-im-not-coming-back",
    "gameTitle": "Control, I'm Not Coming Back",
    "thaiTitle": "Control, I'm Not Coming Back ม็อดภาษาไทย (ศูนย์ควบคุม... ผมจะไม่กลับไปแล้ว)",
    "shortDescription": "Control, I'm Not Coming Back - ม็อดภาษาไทย 100% แปลครบทุกบทสนทนา เมนู เครดิต และโลโก้เกมไทย (611 ข้อความ + 13 ชื่อตัวละคร) | AI Model : Gemini 4 Neon / Argon | รองรับ : Steam",
    "overview": "ม็อดแปลภาษาไทยสำหรับเกมอินดี้แนวไซไฟ-เนื้อเรื่อง Control, I'm Not Coming Back (“ศูนย์ควบคุม... ผมจะไม่กลับไปแล้ว”) แปลครบ 100% ทั้ง 611 ข้อความ + 13 ชื่อตัวละครและยานสำรวจ พร้อมโลโก้หน้าเมนูหลักภาษาไทยและฟอนต์ Chakra Petch ที่เข้ากับธีมหน้าจอสื่อสารอวกาศ แก้สระลอย 4 ระดับสมบูรณ์ เลือกภาษาไทยอัตโนมัติและทำงานแบบไม่ทับไฟล์เดิมของเกม",
    "features": [
      "แปลครบ 100% ทั้งเกม (611 ข้อความ + 13 ชื่อตัวละครและยานสำรวจ) ครอบคลุมเมนู การตั้งค่า เครดิต และบทสนทนาทั้งหมด",
      "โลโก้เกมภาษาไทย “ศูนย์ควบคุม — ผมจะไม่กลับไปแล้ว” แทนที่โลโก้หน้าเมนูหลักอย่างกลมกลืน",
      "ฟอนต์ Chakra Petch เข้าธีมจอสื่อสารอวกาศ ปรับแก้สระและวรรณยุกต์ไทย 4 ระดับ การตัดคำ และช่องไฟเรียบร้อย",
      "สลับเป็นภาษาไทยให้อัตโนมัติเมื่อเปิดเกมครั้งแรก และสลับกลับไปเล่นภาษาอื่นได้จากเมนูตั้งค่าตามปกติ",
      "ทำงานแบบ Non-Destructive ผ่าน Doorstop ไม่แก้ไขหรือทับไฟล์หลักของเกม"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ Control_ImNotComingBack_ThaiMod_v1.0.zip",
      "นำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางลงในโฟลเดอร์หลักของเกม (Steam)",
      "เปิดเกมเล่นเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Control, I'm Not Coming Back\\",
    "uninstallNote": "ลบไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ออกจากโฟลเดอร์หลักของเกมได้ทันที",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon / Argon"
      },
      {
        "role": "Thai Font",
        "name": "Chakra Petch (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "releasedOrder": "2026-11-22",
    "nexusDownloads": 2,
    "estimatedPriceThb": 0,
    "tags": [
      "แปลภาษาไทย 100%",
      "เกมเล่นฟรี",
      "โลโก้ไทยในเกม",
      "ฟอนต์ Chakra Petch",
      "Steam PC"
    ],
    "seoKeywords": [
      "Control Im Not Coming Back ม็อดไทย",
      "Control, I'm Not Coming Back แปลไทย",
      "ศูนย์ควบคุม ผมจะไม่กลับไปแล้ว ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/controlimnotcomingback/mods/2",
    "media": {
      "header": "/mods/control-im-not-coming-back/header.webp",
      "cover": "/mods/control-im-not-coming-back/cover.webp",
      "ogImage": "/mods/control-im-not-coming-back/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/control-im-not-coming-back/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Control, I'm Not Coming Back (ศูนย์ควบคุม... ผมจะไม่กลับไปแล้ว)",
          "caption": "ภาพปกม็อดภาษาไทย Control, I'm Not Coming Back (ศูนย์ควบคุม... ผมจะไม่กลับไปแล้ว)",
          "tag": "Cover"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon / Argon",
      "fontUsed": "Chakra Petch (แก้สระลอย 4 ระดับ)",
      "translatedLines": "611 ข้อความ + 13 ชื่อตัวละคร (100%)",
      "coveragePercent": 100,
      "engine": "Unity 6 (Mono + Doorstop)",
      "fileSize": "859.1 KB",
      "releasedAt": "22 พ.ย. 2026",
      "updatedAt": "22 พ.ย. 2026",
      "supportedGamePlatform": "Steam (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/4515660/Control_Im_Not_Coming_Back/",
        "steamAppId": 4515660
      }
    ],
    "files": [
      {
        "id": "control-v1-0",
        "fileName": "Control_ImNotComingBack_ThaiMod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam)",
        "version": "v1.0",
        "size": "859.1 KB",
        "uploadedAt": "22 พ.ย. 2026",
        "sha256": "57bc76786b65e2ae43836f87a3558147d96762ad1fe7d62ab18d60fb3da8c841",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/control-v1.0/Control_ImNotComingBack_ThaiMod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางในโฟลเดอร์หลักของตัวเกมบน Steam",
        "backupUrl": "https://drive.google.com/file/d/1mC-yHBt7tYyYVLIO16cfanUy_Dc-kT5A/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Control, I'm Not Coming Back",
      "releaseDate": "29 พ.ค. 2026",
      "developers": [
        "Desborde Games"
      ],
      "publishers": [
        "Desborde Games"
      ],
      "genres": [
        "ผจญภัย",
        "อินดี้",
        "เนื้อเรื่อง"
      ],
      "shortDescription": "เกมอินดี้แนวเล่าเรื่องไซไฟผ่านการสื่อสารวิทยุในห้วงอวกาศ (เปิดให้เล่นฟรีบน Steam)",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "i5-6300HQ"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "GTX 560"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 500 MB"
        }
      ],
      "recommendedSpecs": []
    }
  },
  {
    "slug": "routine",
    "gameTitle": "ROUTINE",
    "thaiTitle": "ROUTINE ม็อดภาษาไทย (รูทีน)",
    "shortDescription": "ROUTINE - ม็อดภาษาไทย 100% แปลครบทุกเนื้อเรื่อง เมนู เทอร์มินัล CRT และซับไตเติล (1,543 ข้อความ) พร้อมลด Noise จอ CRT และโลโก้ไทยในเกม | AI Model : Gemini 4 Neon | Steam & Xbox",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับเกมสยองขวัญไซไฟ ROUTINE (รูทีน) แปลครบ 100% ทั้ง 1,543 ข้อความ ครอบคลุมเมนู การตั้งค่า ซับไตเติล บทพูด AI บันทึกเสียง อีเมล และเทอร์มินัล CRT พร้อมปรับจูนฟอนต์แยกหน้าจอ (IBM Plex Sans Thai Looped + Chakra Petch) และลด Noise/Scanline บนจอ CRT เพื่อให้อ่านภาษาไทยสบายตาขึ้นโดยยังคงบรรยากาศเรโทรไซไฟ พร้อมโลโก้ภาษาไทยในเกม",
    "features": [
      "แปลภาษาไทยครบ 100% ทั้งเกม (1,543 ข้อความ): เมนูหลัก, ซับไตเติล, บทพูด AI, บันทึกเสียง, อีเมล, ไดอารี่ และเทอร์มินัล CRT",
      "ฟอนต์ไทยคู่ปรับจูนแยกตามหน้าจอ: IBM Plex Sans Thai Looped (เอกสาร/ซับ/อีเมล) + Chakra Petch (เมนู/หัวข้อ)",
      "ปรับปรุงความคมชัดจอ CRT: ลด Noise, ขอบเบลอสี RGB และ Scanline ให้อ่านข้อความภาษาไทยได้ชัดสบายตา",
      "โลโก้เกมภาษาไทย “รูทีน (ROUTINE)” แสดงผลจริงภายในเกม",
      "ทำงานแบบแพตช์เสริมใน ~mods ไม่ทับไฟล์ต้นฉบับเกม รองรับทั้ง Steam และ Xbox Game Pass (PC)"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ ROUTINE_Thai_Mod_v1.0.zip จะได้โฟลเดอร์ Routine",
      "ลากโฟลเดอร์ Routine ไปวางทับในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\Routine\\Content)",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\ROUTINE\\ หรือ C:\\XboxGames\\Routine\\Content\\",
    "uninstallNote": "ลบไฟล์ Routine_TH_FontSplit_P.* (ทั้ง 3 ไฟล์) ออกจากโฟลเดอร์ Routine\\Content\\Paks\\~mods",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon"
      },
      {
        "role": "Thai Fonts",
        "name": "IBM Plex Sans Thai Looped & Chakra Petch (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "ผจญภัย",
      "ไซไฟ",
      "อินดี้"
    ],
    "critics": {
      "metacriticSlug": "routine",
      "metacriticScore": 79,
      "metacriticUrl": "https://www.metacritic.com/game/routine/",
      "openCriticScore": 79,
      "openCriticTier": "Strong",
      "openCriticUrl": "https://opencritic.com/game/19658/routine"
    },
    "releasedOrder": "2026-11-19",
    "nexusDownloads": 3,
    "estimatedPriceThb": 495,
    "tags": [
      "แปลภาษาไทย 100%",
      "โลโก้ไทยในเกม",
      "ปรับคมชัดจอ CRT",
      "Unreal Engine 5",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "ROUTINE ม็อดไทย",
      "ROUTINE ม็อดภาษาไทย",
      "ROUTINE แปลไทย",
      "รูทีน ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/routine/mods/21",
    "media": {
      "header": "/mods/routine/header.webp",
      "cover": "/mods/routine/cover.webp",
      "ogImage": "/mods/routine/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/routine/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย ROUTINE (รูทีน)",
          "caption": "ภาพปกม็อดภาษาไทย ROUTINE (รูทีน)",
          "tag": "Cover"
        },
        {
          "src": "/mods/routine/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย รูทีน — ROUTINE",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย รูทีน",
          "tag": "Title"
        },
        {
          "src": "/mods/routine/gallery-02.webp",
          "alt": "ตัวอย่างหน้าจอเทอร์มินัล CRT ภาษาไทย — ROUTINE",
          "caption": "ตัวอย่างหน้าจอเทอร์มินัล CRT ภาษาไทย",
          "tag": "Terminal"
        },
        {
          "src": "/mods/routine/gallery-03.webp",
          "alt": "ตัวอย่างเมนูและการตั้งค่าภาษาไทย — ROUTINE",
          "caption": "ตัวอย่างเมนูและการตั้งค่าภาษาไทย",
          "tag": "Menu"
        },
        {
          "src": "/mods/routine/gallery-04.webp",
          "alt": "ตัวอย่างซับไตเติลและเอกสารในเกม — ROUTINE",
          "caption": "ตัวอย่างซับไตเติลและเอกสารในเกม",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/routine/gallery-05.webp",
          "alt": "ตัวอย่างบรรยากาศและข้อความภาษาไทย — ROUTINE",
          "caption": "ตัวอย่างบรรยากาศและข้อความภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon",
      "fontUsed": "IBM Plex Sans Thai Looped & Chakra Petch",
      "translatedLines": "1,543 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unreal Engine 5.5 (IoStore)",
      "fileSize": "602.1 KB",
      "releasedAt": "19 พ.ย. 2026",
      "updatedAt": "19 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/606160/ROUTINE/",
        "steamAppId": 606160
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/games/store/routine/9nq7k3x5r5x2"
      }
    ],
    "files": [
      {
        "id": "routine-v1-0",
        "fileName": "ROUTINE_Thai_Mod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% + ลด Noise CRT (Steam / Xbox)",
        "version": "v1.0",
        "size": "602.1 KB",
        "uploadedAt": "19 พ.ย. 2026",
        "sha256": "f8a44f7756bd9b9ba58b28bfcee6970e79e6dfb5a9efffd517a44bbdb8fdfa3d",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/routine-v1.0/ROUTINE_Thai_Mod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วลากโฟลเดอร์ Routine ไปวางทับในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\Routine\\Content)",
        "backupUrl": "https://drive.google.com/file/d/1Kk2Eu0ujN51R3l-yQMJLNghDCYUxgZW9/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "ROUTINE",
      "releaseDate": "4 ธ.ค. 2025",
      "developers": [
        "Lunar Software"
      ],
      "publishers": [
        "Raw Fury"
      ],
      "genres": [
        "สยองขวัญ",
        "ผจญภัย",
        "ไซไฟ"
      ],
      "shortDescription": "เกมสยองขวัญไซไฟมุมมองบุคคลที่หนึ่งบนฐานทัพดวงจันทร์สไตล์ยุค 80 ที่ถูกทิ้งร้าง เต็มไปด้วยบรรยากาศกดดันและจอ CRT",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-8600 / Ryzen 5 3600"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Nvidia GeForce GTX 1060 / AMD Radeon RX 570"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 10 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-13600K / AMD Ryzen 5 7600X"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Nvidia GeForce RTX 2060 / Radeon RX 5700"
        }
      ]
    }
  },
  {
    "slug": "denshattack",
    "gameTitle": "Denshattack!",
    "thaiTitle": "Denshattack! ม็อดภาษาไทย (เดนชาแท็ก)",
    "shortDescription": "Denshattack! - ม็อดภาษาไทย 100% แปลครบทั้งบทสนทนา เมนู UI แฟนซีน และชื่อท่า (4,662 ข้อความ จากต้นฉบับญี่ปุ่น) | AI Model : Gemini 4 Hydrogen | Steam & Xbox Game Pass",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับเกมแอ็กชัน-ผาดโผนรถไฟสไตล์ญี่ปุ่น Denshattack! แปลครบทั้ง 4,662 ข้อความ (รวมบทสนทนา 2,349 บรรทัดแปลเทียบจากต้นฉบับญี่ปุ่น คุมสรรพนามและคำลงท้ายตามบุคลิกทุกตัวละคร) คงชื่อเฉพาะและชื่อแก๊งเท่ๆ ไว้ตามบริบท พร้อมฟอนต์ Chakra Petch ปรับ Vertical Metrics + ตัดคำภาษาไทยไม่ตกขอบ ทำงานแบบแพตช์เสริมใน ~mods รองรับทั้ง Steam และ Xbox Game Pass",
    "features": [
      "แปลครบ 100% (4,662 ข้อความ) รวมบทสนทนา 2,349 บรรทัดแปลอิงต้นฉบับภาษาญี่ปุ่น คุมบุคลิกและสรรพนามตัวละครครบถ้วน",
      "แปลครบทุกเมนู UI ร้านสติกเกอร์ แฟนซีน และชื่อท่าผาดโผน โดยคงชื่อแก๊ง/ชื่อเฉพาะสำคัญให้อ่านง่ายและเท่ตรงต้นฉบับ",
      "ฟอนต์ Chakra Petch ปรับแต่ง Vertical Metrics + Zero-Width Space (ZWSP) ตัดคำอัตโนมัติ ไม่มีสระลอยหรือโดนตัดขอบ",
      "ทำงานแบบ Patch Container (_P) ในโฟลเดอร์ ~mods ไม่ทับไฟล์หลักของเกม",
      "รองรับทั้ง Steam และ Xbox Game Pass (WinGDK)"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ Denshattack_Thai_Mod_v1.0.zip จะได้โฟลเดอร์ Denshattack_Proto",
      "นำโฟลเดอร์ Denshattack_Proto ไปวางทับลงในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\Denshattack!\\Content)",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Denshattack!\\ หรือ C:\\XboxGames\\Denshattack!\\Content\\",
    "uninstallNote": "ลบไฟล์ pakchunk99-DenshattackThai_P.* (ทั้ง 3 ไฟล์) ออกจากโฟลเดอร์ Denshattack_Proto\\Content\\Paks\\~mods",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Hydrogen"
      },
      {
        "role": "Thai Font",
        "name": "Chakra Petch (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "แอ็กชัน",
      "ผจญภัย",
      "อาร์เคด"
    ],
    "critics": {
      "metacriticSlug": "denshattack",
      "metacriticScore": 88,
      "metacriticUrl": "https://www.metacritic.com/game/denshattack/",
      "openCriticScore": 87,
      "openCriticTier": "Mighty",
      "openCriticUrl": "https://opencritic.com/game/20193/denshattack"
    },
    "releasedOrder": "2026-11-18",
    "nexusDownloads": 6,
    "estimatedPriceThb": 359,
    "tags": [
      "แปลภาษาไทย 100%",
      "แปลจากญี่ปุ่น",
      "ฟอนต์ Chakra Petch",
      "Unreal Engine 5",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "Denshattack ม็อดไทย",
      "Denshattack ม็อดภาษาไทย",
      "Denshattack แปลไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/denshattack/mods/5",
    "media": {
      "header": "/mods/denshattack/header.webp",
      "cover": "/mods/denshattack/cover.webp",
      "ogImage": "/mods/denshattack/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/denshattack/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Denshattack!",
          "caption": "ภาพปกม็อดภาษาไทย Denshattack!",
          "tag": "Cover"
        },
        {
          "src": "/mods/denshattack/gallery-01.webp",
          "alt": "หน้าเมนูหลักภาษาไทยฟอนต์ Chakra Petch — Denshattack!",
          "caption": "หน้าเมนูหลักภาษาไทยฟอนต์ Chakra Petch",
          "tag": "Main Menu"
        },
        {
          "src": "/mods/denshattack/gallery-02.webp",
          "alt": "ตัวอย่างบทสนทนาภาษาไทยแปลจากต้นฉบับญี่ปุ่น — Denshattack!",
          "caption": "ตัวอย่างบทสนทนาภาษาไทยแปลจากต้นฉบับญี่ปุ่น",
          "tag": "Dialogue"
        },
        {
          "src": "/mods/denshattack/gallery-03.webp",
          "alt": "ตัวอย่างร้านค้าสติกเกอร์และเมนูภาษาไทย — Denshattack!",
          "caption": "ตัวอย่างร้านค้าสติกเกอร์และเมนูภาษาไทย",
          "tag": "Shop"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Hydrogen",
      "fontUsed": "Chakra Petch (Vertical Metrics + ZWSP)",
      "translatedLines": "4,662 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unreal Engine 5.6 (IoStore)",
      "fileSize": "2.38 MB",
      "releasedAt": "18 พ.ย. 2026",
      "updatedAt": "18 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2524850/Denshattack/",
        "steamAppId": 2524850
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/search/games?q=Denshattack"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5)",
        "url": "https://store.playstation.com/th-th/search/denshattack"
      },
      {
        "platform": "nintendo",
        "label": "Nintendo Switch / Switch 2",
        "url": "https://www.nintendo.com/us/search/#q=Denshattack"
      }
    ],
    "files": [
      {
        "id": "denshattack-v1-0",
        "fileName": "Denshattack_Thai_Mod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / Xbox Game Pass)",
        "version": "v1.0",
        "size": "2.38 MB",
        "uploadedAt": "18 พ.ย. 2026",
        "sha256": "7674942b117d90cd2cb94cc537019e289135e6ba6be2c2f341cfa5e504a029ae",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/denshattack-v1.0/Denshattack_Thai_Mod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำโฟลเดอร์ Denshattack_Proto ไปวางทับในโฟลเดอร์หลักของเกม (Steam หรือ XboxGames\\Denshattack!\\Content)",
        "backupUrl": "https://drive.google.com/file/d/1MERfAU274LwSS9_vs_qB7CSE8FZajrx1/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Denshattack!",
      "releaseDate": "15 ก.ค. 2026",
      "developers": [
        "Undercoders"
      ],
      "publishers": [
        "Fireshine Games",
        "Boltray Games"
      ],
      "genres": [
        "แอ็กชัน",
        "ผจญภัย"
      ],
      "shortDescription": "ซิ่งรถไฟผาดโผนดริฟต์ตีลังกาข้ามญี่ปุ่นดิสโทเปียสไตล์อาร์เคดสุดมันส์",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-6600K (4 * 3500) or AMD Ryzen 3 2200G (4 * 3500)"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 12 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 1050 Ti (4096 MB) or AMD Radeon RX 570 (4096 MB)"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 8 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 11"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5-9600K (6 * 3700) or AMD Ryzen 5 1600 (6 * 3200)"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 1060 (6144 MB) or AMD Radeon RX 580 (8192 MB)"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 8 GB"
        }
      ]
    }
  },
  {
    "slug": "paw-patrol-dino-world",
    "gameTitle": "PAW Patrol™: Dino World",
    "thaiTitle": "PAW Patrol: Dino World ม็อดภาษาไทย",
    "shortDescription": "ม็อดแปลภาษาไทย 100% ครบทุกข้อความในเกม (1,506 รายการ) สำหรับเกม PAW Patrol™: Dino World ฟอนต์ Mitr อ่านง่ายสำหรับเด็กและครอบครัว | Steam & Xbox Game Pass",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์ 100% (1,506 รายการ ครบทั้ง 10 หมวด) สำหรับเกมผจญภัยครอบครัว PAW Patrol™: Dino World ใช้ภาษาไทยที่เป็นกันเอง อ่านสนุกเหมาะสำหรับเด็กและครอบครัว พร้อมฟอนต์ Mitr (Regular & Bold) ที่รองรับการเรนเดอร์สระและวรรณยุกต์ของ Unreal Engine 5 สมบูรณ์ แยกแพ็กเกจชัดเจนทั้งเวอร์ชัน Steam และ Xbox / PC Game Pass (WinGDK)",
    "features": [
      "แปลครบ 100% (1,506 รายการ / 10 หมวด): เมนูหลัก, การตั้งค่า, บทสนทนา, ภารกิจ, ระบบสอนเล่น, ความสำเร็จ และชื่อตัวละคร/สถานที่",
      "ฟอนต์ไทย Mitr (Regular & Bold) คมชัด อ่านง่าย สบายตา ไม่มีปัญหาสระลอยหรือกล่องสี่เหลี่ยม",
      "แยกไฟล์ให้เลือกโหลดตรงแพลตฟอร์มครบทั้ง Steam (388 KB) และ Xbox / PC Game Pass WinGDK (87.6 MB)"
    ],
    "installSteps": [
      "เลือกดาวน์โหลดไฟล์ให้ตรงแพลตฟอร์ม (Steam หรือ Xbox Game Pass) แล้วแตกไฟล์ ZIP จะได้โฟลเดอร์ PDW",
      "ลากโฟลเดอร์ PDW ไปวางรวม/ทับในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\PAW Patrol- Dino World\\Content) ได้ทันทีโดยไม่ต้องสร้างโฟลเดอร์เอง",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (เวอร์ชัน Xbox แนะนำสำรองไฟล์ PDW-WinGDK.pak เดิมไว้ก่อน)"
    ],
    "installPathExample": "Steam: ...\\PAW Patrol Dino World\\PDW\\Content\\Paks\\~mods\\  |  Xbox: C:\\XboxGames\\PAW Patrol- Dino World\\Content\\PDW\\Content\\Paks\\",
    "uninstallNote": "Steam: ลบไฟล์ PDW_Thai_P.pak ออก | Xbox: นำไฟล์ PDW-WinGDK.pak ต้นฉบับที่สำรองไว้กลับมาวางทับ หรือกด Repair ในแอป Xbox",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Hydrogen"
      },
      {
        "role": "Thai Font",
        "name": "Mitr (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "ครอบครัว",
      "ผจญภัย",
      "แอ็กชัน"
    ],
    "critics": {
      "metacriticSlug": "paw-patrol-dino-world",
      "metacriticScore": 76,
      "metacriticUrl": "https://www.metacritic.com/game/paw-patrol-dino-world/"
    },
    "releasedOrder": "2026-11-18",
    "nexusDownloads": 3,
    "estimatedPriceThb": 575.2,
    "tags": [
      "แปลภาษาไทย 100%",
      "เกมครอบครัว",
      "ฟอนต์ Mitr",
      "Unreal Engine 5",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "PAW Patrol Dino World ม็อดไทย",
      "PAW Patrol Dino World แปลไทย",
      "ขบวนการเจ้าตูบ ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/pawpatroldinoworld/mods/1",
    "media": {
      "header": "/mods/paw-patrol-dino-world/header.webp",
      "cover": "/mods/paw-patrol-dino-world/cover.webp",
      "ogImage": "/mods/paw-patrol-dino-world/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/paw-patrol-dino-world/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย PAW Patrol: Dino World",
          "caption": "ภาพปกม็อดภาษาไทย PAW Patrol: Dino World",
          "tag": "Cover"
        },
        {
          "src": "/mods/paw-patrol-dino-world/gallery-01.webp",
          "alt": "หน้าจอหลักเกม PAW Patrol: Dino World ภาษาไทย — PAW Patrol: Dino World",
          "caption": "หน้าจอหลักเกม PAW Patrol: Dino World ภาษาไทย",
          "tag": "Title"
        },
        {
          "src": "/mods/paw-patrol-dino-world/gallery-02.webp",
          "alt": "ตัวอย่างเมนูและฟอนต์ไทย Mitr — PAW Patrol: Dino World",
          "caption": "ตัวอย่างเมนูและฟอนต์ไทย Mitr",
          "tag": "Menu"
        },
        {
          "src": "/mods/paw-patrol-dino-world/gallery-03.webp",
          "alt": "ตัวอย่างบทสนทนาและภารกิจภาษาไทย — PAW Patrol: Dino World",
          "caption": "ตัวอย่างบทสนทนาและภารกิจภาษาไทย",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/paw-patrol-dino-world/gallery-04.webp",
          "alt": "ตัวอย่างคำแนะนำและระบบสอนเล่นภาษาไทย — PAW Patrol: Dino World",
          "caption": "ตัวอย่างคำแนะนำและระบบสอนเล่นภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Hydrogen",
      "fontUsed": "Mitr (Regular & Bold)",
      "translatedLines": "1,506 รายการ (100%)",
      "coveragePercent": 100,
      "engine": "Unreal Engine 5",
      "fileSize": "388 KB (Steam) / 87.6 MB (Xbox)",
      "releasedAt": "18 พ.ย. 2026",
      "updatedAt": "18 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/3525790/PAW_Patrol_Dino_World/",
        "steamAppId": 3525790
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/search/games?q=PAW+Patrol+Dino+World"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5 / PS4)",
        "url": "https://store.playstation.com/th-th/search/paw%20patrol%20dino%20world"
      },
      {
        "platform": "nintendo",
        "label": "Nintendo Switch / Switch 2",
        "url": "https://www.nintendo.com/us/search/#q=PAW+Patrol+Dino+World"
      }
    ],
    "files": [
      {
        "id": "paw-steam-v1-0",
        "fileName": "PAW_Patrol_Dino_World_Thai_Steam_v1.0.zip",
        "label": "เวอร์ชัน Steam (PC Windows — ไฟล์เล็ก)",
        "version": "v1.0",
        "size": "387.9 KB",
        "uploadedAt": "18 พ.ย. 2026",
        "sha256": "f56612ceef57d7f75d70dece94acbb8b5eae4f5a54124122c9c439a0af36f064",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/paw-dino-v1.0/PAW_Patrol_Dino_World_Thai_Steam_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วลากโฟลเดอร์ PDW ไปวางรวมในโฟลเดอร์หลักของเกมบน Steam (จัดโครงสร้าง ~mods ไว้ครบแล้ว ไม่ต้องสร้างเอง)",
        "backupUrl": "https://drive.google.com/file/d/1P-zpIbXr6fZ_Rx8DYv8UhQ04xsnPpTdx/view?usp=sharing",
        "backupHost": "Google Drive"
      },
      {
        "id": "paw-xbox-v1-0",
        "fileName": "PAW_Patrol_Dino_World_Thai_Xbox_v1.0.zip",
        "label": "เวอร์ชัน Xbox / PC Game Pass (WinGDK)",
        "version": "v1.0",
        "size": "87.61 MB",
        "uploadedAt": "18 พ.ย. 2026",
        "sha256": "39f6a60f8aeb670cd2fcf4f92d41d70d38aba1b6f44a679f20323076ac8aafde",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/paw-dino-v1.0/PAW_Patrol_Dino_World_Thai_Xbox_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วลากโฟลเดอร์ PDW ไปวางทับในโฟลเดอร์ Content ของเกมบน Xbox (แนะนำสำรอง PDW-WinGDK.pak เดิมไว้ก่อน)",
        "backupUrl": "https://drive.google.com/file/d/13bmBeintVLg6X0p-1ni7Z6NcMh9cYn15/view?usp=sharing",
        "backupHost": "Google Drive",
        "knownNotice": "ตัวเกมเวอร์ชัน Xbox (WinGDK) ไม่อ่านไฟล์ _P.pak แยก จึงต้องแพ็กเป็นไฟล์ PDW-WinGDK.pak เต็ม"
      }
    ],
    "fallbackSteam": {
      "name": "PAW Patrol™: Dino World",
      "releaseDate": "31 ก.ค. 2026",
      "developers": [
        "3DClouds"
      ],
      "publishers": [
        "Outright Games Ltd."
      ],
      "genres": [
        "ครอบครัว",
        "ผจญภัย"
      ],
      "shortDescription": "ร่วมผจญภัยช่วยเหล่าไดโนเสาร์บนเกาะไดโนเวิลด์ไปกับขบวนการเจ้าตูบ PAW Patrol",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-Bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "AMD Ryzen 3 3200G / Intel Core i3-10100"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "AMD Radeon R9 270 / Nvidia GTX 760"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 5 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "DirectX Compatible Sound Card"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 11 64-Bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "AMD Ryzen 5 3600 / Intel Core i5-9600K"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "AMD Radeon RX 5700 XT / NVIDIA RTX 2070"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 10 GB"
        },
        {
          "label": "การ์ดเสียง",
          "value": "DirectX Compatible Sound Card"
        }
      ]
    }
  },
  {
    "slug": "forza-horizon-6",
    "gameTitle": "Forza Horizon 6",
    "thaiTitle": "Forza Horizon 6 ม็อดภาษาไทย (ซิ่งทะยาน สุดขอบฟ้า 6)",
    "shortDescription": "ม็อดแปลภาษาไทย Forza Horizon 6 ครบทั้งเมนู บทพูด ฟอนต์ไทย IBM Plex Sans Thai และโลโก้ภาษาไทยในเกม รองรับทั้ง Steam และ Xbox Game Pass (PC)",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Forza Horizon 6 แปลครอบคลุมทั้งหน้าเมนูหลัก การตั้งค่า บทสนทนา ซับไตเติล ภารกิจ และรายละเอียดรถ/การแต่งรถ คงชื่อรุ่นรถและคำศัพท์สากลบางส่วนตามบริบทเพื่อความเข้าใจง่าย พร้อมฟอนต์ Vector Font (IBM Plex Sans Thai) ครบ 4 น้ำหนัก และโลโก้ภาษาไทยในเกม (ซิ่งทะยาน สุดขอบฟ้า 6) รองรับทั้งเวอร์ชันตัวติดตั้งอัตโนมัติและแบบลากวาง",
    "features": [
      "แปลข้อความภายในเกม 47,072 รายการ ครบทั้ง 287 ไฟล์ (คงคำศัพท์เฉพาะ/ชื่อรุ่นรถภาษาอังกฤษตามบริบท 13,392 รายการ)",
      "ฟอนต์ไทย IBM Plex Sans Thai โครงสร้าง Vector Font สำหรับ ForzaTech ครบ 4 น้ำหนัก (Horizon_A–D) แก้สระลอยและวรรณยุกต์ซ้อน 100%",
      "โลโก้ชื่อเกมภาษาไทย “ซิ่งทะยาน สุดขอบฟ้า 6” ครบทั้งความละเอียดปกติและ Hi-Res",
      "เลือกโหลดได้ 2 แบบ: ตัวติดตั้งอัตโนมัติ (สำรองไฟล์และถอนติดตั้งคืนค่าเดิมด้วย SHA-256) หรือไฟล์แบบลากวางด้วยตนเอง",
      "รองรับทั้ง Steam และ Xbox Game Pass / Microsoft Store (PC) ไม่มีผลกระทบต่อเซฟเกม"
    ],
    "installSteps": [
      "ปิดเกม Forza Horizon 6 ให้เรียบร้อยก่อนดำเนินการ",
      "แบบตัวติดตั้ง (แนะนำ): แตกไฟล์ FH6_ThaiMod_v1.0_Setup.zip แล้วเปิด FH6_ThaiMod_Setup.exe เลือกโฟลเดอร์เกมและกดติดตั้ง (หรือเลือกโหลดไฟล์ FH6_ThaiMod.zip เพื่อวางทับโฟลเดอร์ media ด้วยตนเอง)",
      "เปิดเกมและตั้งค่าภาษาข้อความในเกมเป็น English เพื่อแสดงผลภาษาไทย"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Forza Horizon 6\\  หรือ  XboxGames\\Forza Horizon 6\\Content\\",
    "uninstallNote": "หากใช้ตัวติดตั้งให้เปิด FH6_ThaiMod_Setup.exe แล้วกด “ถอนติดตั้ง” เพื่อคืนไฟล์เดิมครบ 6 ไฟล์ด้วย SHA-256 หรือกด Verify ใน Steam / Xbox App",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Neon / Hydrogen"
      },
      {
        "role": "Thai Font",
        "name": "IBM Plex Sans Thai (SIL Open Font License 1.1)"
      }
    ],
    "genres": [
      "แข่งรถ",
      "จำลองสถานการณ์",
      "โอเพนเวิลด์"
    ],
    "series": {
      "id": "forza-horizon",
      "name": "Forza Horizon",
      "thaiName": "ซิ่งทะยาน สุดขอบฟ้า (ซีรีส์ Forza Horizon)",
      "order": 6,
      "badgeLabel": "ภาค 6",
      "description": "ซีรีส์เกมแข่งรถโอเพนเวิลด์ระดับตำนานจาก Playground Games"
    },
    "critics": {
      "metacriticSlug": "forza-horizon-6",
      "metacriticScore": 90,
      "metacriticUrl": "https://www.metacritic.com/game/forza-horizon-6/",
      "openCriticScore": 91,
      "openCriticTier": "Mighty",
      "openCriticUrl": "https://opencritic.com/game/19996/forza-horizon-6"
    },
    "releasedOrder": "2026-11-16",
    "nexusDownloads": 20,
    "estimatedPriceThb": 1499.25,
    "tags": [
      "แปลภาษาไทย",
      "Steam & Xbox",
      "ตัวติดตั้ง / ลากวาง",
      "ForzaTech",
      "IBM Plex Sans Thai"
    ],
    "seoKeywords": [
      "Forza Horizon 6 ม็อดไทย",
      "Forza Horizon 6 ม็อดภาษาไทย",
      "Forza Horizon 6 แปลไทย",
      "ซิ่งทะยาน สุดขอบฟ้า 6 ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/forzahorizon6/mods/2102",
    "featured": true,
    "trending": true,
    "media": {
      "header": "/mods/forza-horizon-6/header.webp",
      "cover": "/mods/forza-horizon-6/cover.webp",
      "ogImage": "/mods/forza-horizon-6/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/forza-horizon-6/gallery-01.webp",
          "alt": "ปกม็อดภาษาไทย Forza Horizon 6 ซากุระ",
          "caption": "ภาพปกม็อดภาษาไทย",
          "tag": "Cover"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-02.webp",
          "alt": "ภาพโปรโมตจุดเด่นม็อดภาษาไทย Forza Horizon 6",
          "caption": "สรุปจุดเด่นม็อดภาษาไทย",
          "tag": "Showcase"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-03.webp",
          "alt": "หน้าหลักเกม Forza Horizon 6 โลโก้ภาษาไทย",
          "caption": "โลโก้ภาษาไทยในเกม (ซิ่งทะยาน สุดขอบฟ้า 6)",
          "tag": "Title"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-04.webp",
          "alt": "เมนูหลักและแผนที่โลกภาษาไทย Forza Horizon 6",
          "caption": "เมนูหลักและแผนที่โลกภาษาไทย",
          "tag": "Main Menu"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-05.webp",
          "alt": "หน้าอัปเดตซีรีส์และกิจกรรมภาษาไทย",
          "caption": "หน้าอัปเดตซีรีส์และไฮไลต์",
          "tag": "Festival"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-06.webp",
          "alt": "เมนูโหมดการแข่งขันภาษาไทย",
          "caption": "โหมดแข่งขัน Street Race / Drift Attack / Drag Meet",
          "tag": "Events"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-07.webp",
          "alt": "เมนูตั้งค่ากราฟิกภาษาไทย Forza Horizon 6",
          "caption": "เมนูตั้งค่ากราฟิกและระบบ",
          "tag": "Settings"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-08.webp",
          "alt": "หน้ารายละเอียดรถและค่าสเปกภาษาไทย",
          "caption": "ข้อมูลรถและสเปกสมรรถนะภาษาไทย",
          "tag": "Garage"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-09.webp",
          "alt": "หน้าร้านค้าและแพ็กเสริมภาษาไทย",
          "caption": "ร้านค้าและรายละเอียดแพ็กเสริม",
          "tag": "Store UI"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-10.webp",
          "alt": "ภาพการขับขี่และชื่อภูมิภาคภาษาไทย",
          "caption": "การขับขี่และชื่อภูมิภาคในเกม",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-11.webp",
          "alt": "ภาพการขับขี่บนถนนภูเขาและป้ายกิจกรรมภาษาไทย",
          "caption": "ป้ายกิจกรรมและ HUD ภาษาไทย",
          "tag": "HUD"
        },
        {
          "src": "/mods/forza-horizon-6/gallery-12.webp",
          "alt": "หน้าแต่งตัวละครภาษาไทย",
          "caption": "เมนูแต่งตัวละครภาษาไทย",
          "tag": "Customize"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Neon / Hydrogen",
      "fontUsed": "IBM Plex Sans Thai (Vector Font 4 น้ำหนัก)",
      "translatedLines": "47,072 รายการ (คงคำอังกฤษ 13,392 รายการ)",
      "coveragePercent": 100,
      "engine": "ForzaTech Engine",
      "fileSize": "143.3 MB / 160.8 MB",
      "releasedAt": "16 พ.ย. 2026",
      "updatedAt": "24 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2483190/Forza_Horizon_6/",
        "steamAppId": 2483190
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/games/store/forza-horizon-6/9NR1R1XWLCNB"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5)",
        "url": "https://store.playstation.com/th-th/search/forza%20horizon%206"
      }
    ],
    "files": [
      {
        "id": "fh6-setup-v1-0",
        "fileName": "FH6_ThaiMod_v1.0_Setup.zip",
        "label": "เวอร์ชันตัวติดตั้งอัตโนมัติ (แนะนำ — Steam & Xbox Game Pass)",
        "version": "v1.0",
        "size": "143.34 MB",
        "uploadedAt": "24 พ.ย. 2026",
        "sha256": "c1f992c2e668b0a492ffb748837c8986660ab2a3d6c65123cc85113da02b5127",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/fh6-v1.0/FH6_ThaiMod_v1.0_Setup.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วเปิด FH6_ThaiMod_Setup.exe เลือกโฟลเดอร์เกมแล้วกดติดตั้ง (หรือถอนติดตั้ง) ได้ทันที",
        "backupUrl": "https://drive.google.com/file/d/1Ux3eGjAVnziVOq3vn5yA25-py_6td1OB/view?usp=sharing",
        "backupHost": "Google Drive",
        "knownNotice": "เวอร์ชันนี้ลง Nexus Mods ไม่ได้เนื่องจากเป็นไฟล์ EXE จึงเปิดให้โหลดโดยตรงผ่านเว็บนี้"
      },
      {
        "id": "fh6-manual-v1-0",
        "fileName": "FH6_ThaiMod.zip",
        "label": "เวอร์ชันลากวางด้วยตนเอง (Manual Drag & Drop)",
        "version": "v1.0",
        "size": "160.80 MB",
        "uploadedAt": "16 พ.ย. 2026",
        "sha256": "c227d3d7fa6aa8fa5879692dccfa1c59be8a800902f97cb8a7dd29bc449acabf",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/fh6-v1.0/FH6_ThaiMod.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำโฟลเดอร์ media ไปวางทับในโฟลเดอร์หลักของเกม (Steam หรือ XboxGames\\Forza Horizon 6\\Content)",
        "backupUrl": "https://drive.google.com/file/d/1BFpNUIhNQm1GwXhdNVGdynUu6CEr3-JD/view?usp=sharing",
        "backupHost": "Google Drive",
        "knownNotice": "เวอร์ชันนี้ลง Nexus Mods ไม่ได้เนื่องจากโครงสร้างไฟล์ของเกมเป็น .zip ซ้อน .zip จึงเปิดให้โหลดโดยตรงผ่านเว็บนี้"
      }
    ],
    "fallbackSteam": {
      "name": "Forza Horizon 6",
      "releaseDate": "18 พ.ค. 2026",
      "developers": [
        "Playground Games"
      ],
      "publishers": [
        "Xbox Game Studios"
      ],
      "genres": [
        "แข่งรถ",
        "จำลองสถานการณ์",
        "โอเพนเวิลด์"
      ],
      "shortDescription": "ออกสำรวจภูมิทัศน์อันงดงามของประเทศญี่ปุ่นในเทศกาล Horizon พร้อมรถให้สะสมและปรับแต่งกว่าหลายร้อยคัน",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 22H2 (version 19045) or higher"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel i5-8400 OR AMD Ryzen 5 1600"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Nvidia GTX 1650 OR AMD RX 6500 XT OR Intel Arc A380"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "เครือข่าย",
          "value": "การเชื่อมต่ออินเทอร์เน็ตแบบบรอดแบนด์"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 167 GB"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "SSD Required"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 22H2 (version 19045) or higher"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel i5-12400F OR AMD Ryzen 5 5600X"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA RTX 3060 Ti OR AMD RX 6700 XT OR Intel Arc A580"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "เครือข่าย",
          "value": "การเชื่อมต่ออินเทอร์เน็ตแบบบรอดแบนด์"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 167 GB"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "SSD Required"
        }
      ]
    }
  },
  {
    "slug": "aphelion",
    "gameTitle": "Aphelion",
    "thaiTitle": "Aphelion ม็อดภาษาไทย (ห้วงไกลตะวัน)",
    "shortDescription": "Aphelion (ห้วงไกลตะวัน) - ม็อดแปลภาษาไทยสมบูรณ์ แปลครบทั้งเนื้อเรื่อง บทสนทนา เมนู อินเทอร์เฟซ ไฟล์บันทึก และโลโก้ภาษาไทยในเกม | AI Model : Gemini 4 Hydrogen | Steam & Xbox Game Pass",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับเกมผจญภัยไซไฟจาก DON'T NOD เรื่อง Aphelion (“ห้วงไกลตะวัน”) แปลครบทั้งเนื้อเรื่อง บทสนทนา ซับไตเติล เมนู และไฟล์บันทึก พร้อมฟอนต์ Chakra Petch ตัดคำภาษาไทยอัตโนมัติซิงก์เวลาตรงเสียงพากย์ และโลโก้เกมภาษาไทย “ห้วงไกลตะวัน” ทั้งหน้าเมนูหลัก โหมดถ่ายภาพ และเครดิต รองรับทั้ง Steam และ Xbox / PC Game Pass",
    "features": [
      "แปลภาษาไทยครบทุกหมวด: เนื้อเรื่องหลัก, บทสนทนาซับไตเติล, เมนู UI, อินเทอร์เฟซ และไฟล์บันทึกทั้งหมด",
      "โลโก้เกมภาษาไทย “ห้วงไกลตะวัน” แสดงผลทั้งหน้าเมนูหลัก โหมดถ่ายภาพ และหน้าเครดิต",
      "ฟอนต์ภาษาไทย Chakra Petch อ่านสบายตา พร้อมตัดคำภาษาไทยและซิงก์เวลาซับไตเติลตรงเสียงพากย์",
      "ทำงานผ่านโฟลเดอร์ ~mods (Unreal Engine 5.5 IoStore) รองรับทั้ง Steam และ Xbox / PC Game Pass"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ Aphelion_Thai_Mod.zip จะได้โฟลเดอร์ PIO",
      "คัดลอกโฟลเดอร์ PIO ไปวางทับลงในโฟลเดอร์หลักของตัวเกม (Steam หรือ C:\\XboxGames\\Aphelion\\Content)",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Aphelion\\ หรือ C:\\XboxGames\\Aphelion\\Content\\",
    "uninstallNote": "ลบไฟล์ pakchunk99-AphelionThai_P.* ทั้ง 3 ไฟล์ใน PIO\\Content\\Paks\\~mods\\ (หากต้องการคืนภาพ Splash ให้กด Verify / Repair)",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Hydrogen"
      },
      {
        "role": "Thai Font",
        "name": "Chakra Petch (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "ผจญภัย",
      "ไซไฟ",
      "แอ็กชัน",
      "เนื้อเรื่อง"
    ],
    "critics": {
      "metacriticSlug": "aphelion",
      "metacriticScore": 64,
      "metacriticUrl": "https://www.metacritic.com/game/aphelion/",
      "openCriticScore": 67,
      "openCriticTier": "Fair",
      "openCriticUrl": "https://opencritic.com/game/20233/aphelion"
    },
    "releasedOrder": "2026-11-15",
    "nexusDownloads": 12,
    "estimatedPriceThb": 1012,
    "tags": [
      "แปลภาษาไทย 100%",
      "โลโก้ไทยในเกม",
      "ฟอนต์ Chakra Petch",
      "Unreal Engine 5",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "Aphelion ม็อดไทย",
      "Aphelion ม็อดภาษาไทย",
      "ห้วงไกลตะวัน ม็อดไทย",
      "Aphelion แปลไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/aphelion/mods/7",
    "media": {
      "header": "/mods/aphelion/header.webp",
      "cover": "/mods/aphelion/cover.webp",
      "ogImage": "/mods/aphelion/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/aphelion/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Aphelion (ห้วงไกลตะวัน)",
          "caption": "ภาพปกม็อดภาษาไทย Aphelion (ห้วงไกลตะวัน)",
          "tag": "Cover"
        },
        {
          "src": "/mods/aphelion/gallery-01.webp",
          "alt": "หน้าจอหลักและโลโก้ภาษาไทย ห้วงไกลตะวัน — Aphelion",
          "caption": "หน้าจอหลักและโลโก้ภาษาไทย ห้วงไกลตะวัน",
          "tag": "Title"
        },
        {
          "src": "/mods/aphelion/gallery-02.webp",
          "alt": "ตัวอย่างซับไตเติลและเมนูภาษาไทย — Aphelion",
          "caption": "ตัวอย่างซับไตเติลและเมนูภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Hydrogen",
      "fontUsed": "Chakra Petch (ตัดคำอัตโนมัติ)",
      "translatedLines": "แปลครบทั้งเกม (100%)",
      "coveragePercent": 100,
      "engine": "Unreal Engine 5.5 (IoStore)",
      "fileSize": "5.92 MB",
      "releasedAt": "15 พ.ย. 2026",
      "updatedAt": "15 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/1966410/Aphelion/",
        "steamAppId": 1966410
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/search/games?q=Aphelion"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5)",
        "url": "https://store.playstation.com/th-th/search/aphelion"
      }
    ],
    "files": [
      {
        "id": "aphelion-v1-0",
        "fileName": "Aphelion_Thai_Mod.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / Xbox Game Pass)",
        "version": "v1.0",
        "size": "5.92 MB",
        "uploadedAt": "15 พ.ย. 2026",
        "sha256": "8d95babe4348f98a5856a49c491f3e4d7bb32b4602dcd27292b01d022ba18f7c",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/aphelion-v1.0/Aphelion_Thai_Mod.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำโฟลเดอร์ PIO ไปวางทับในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\Aphelion\\Content)",
        "backupUrl": "https://drive.google.com/file/d/1ykqf9SyvCkSEediX2SzoHH8-t6YKj2li/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Aphelion",
      "releaseDate": "28 เม.ย. 2026",
      "developers": [
        "DON'T NOD"
      ],
      "publishers": [
        "DON'T NOD"
      ],
      "genres": [
        "ผจญภัย",
        "ไซไฟ",
        "แอ็กชัน"
      ],
      "shortDescription": "ออกสำรวจดาวเคราะห์น้ำแข็งสุดขอบระบบสุริยะในเกมผจญภัยไซไฟเน้นเนื้อเรื่องจาก DON'T NOD",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i7-8700K / AMD Ryzen 5 1600X"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce GTX 1060 6 GB / AMD Radeon RX 5600 XT 6 GB / Intel Arc A380 6 GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 55 GB"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "SSD required. Minimum specs allow for 1080p 30FPS low settings gameplay. Requires a 64-bit processor and operating system"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 11"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i7-12700K / AMD Ryzen 7 5800X"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 16 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA GeForce RTX 3060 Ti 8 GB / AMD Radeon RX 6800 XT 16 GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 55 GB"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "SSD required Requires a 64-bit processor and operating system"
        }
      ]
    }
  },
  {
    "slug": "terrible-lizards",
    "gameTitle": "Terrible Lizards",
    "thaiTitle": "Terrible Lizards ม็อดภาษาไทย (กิ้งก่า สยอง)",
    "shortDescription": "Terrible Lizards — ม็อดแปลภาษาไทย 100% (กิ้งก่า สยอง) แปลครบ 2,787 ข้อความ พร้อมปุ่มสลับโหมดภาษาไทย/อังกฤษในเกม | AI Model : Gemini 4 Hydrogen | Steam & Xbox Game Pass",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์สำหรับ Terrible Lizards (กิ้งก่า สยอง) แปลครบ 100% ทั้ง 2,787 ข้อความ ครอบคลุมเมนู UI บทสนทนา บันทึกเอกสาร และระบบเกมทั้งหมด พิเศษด้วยตัวเลือกสลับโหมดภาษาไทย/อังกฤษได้ทันทีในเมนูตั้งค่าเกม พร้อมชุดฟอนต์ Niramit, Chakra Petch และ Roboto Mono แพ็กแบบไฟล์เสริมใน ~mods รองรับทั้ง Steam และ Xbox / PC Game Pass",
    "features": [
      "แปลครบ 100% (2,787 / 2,787 ข้อความ): เมนู UI, ระบบเกม, บทสนทนา และบันทึกเอกสารทั้งหมด",
      "มีสวิตช์สลับโหมดม็อดภาษาไทย / ภาษาอังกฤษต้นฉบับ ได้โดยตรงจากเมนูตั้งค่าภายในเกม",
      "ชุดฟอนต์ฟรีถูกลิขสิทธิ์ 100% (SIL OFL 1.1): Niramit, Chakra Petch และ Roboto Mono",
      "แพ็กแบบ Patch (_P) ในโฟลเดอร์ ~mods ไม่มีไฟล์ .ini ทับคอนฟิกเกม รองรับทั้ง Steam และ Xbox Game Pass (WinGDK)"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ TerribleLizards_Thai_Mod.zip แล้วเปิดเข้าโฟลเดอร์ TerribleLizards_Thai_P จะพบโฟลเดอร์ terrible_lizards",
      "ลากโฟลเดอร์ terrible_lizards ไปวางรวมในโฟลเดอร์หลักของเกม (Steam หรือ XboxGames\\Terrible Lizards\\Content)",
      "เข้าเกมเล่นเป็นภาษาไทยได้ทันที (สามารถสลับไทย/อังกฤษได้ในหน้าตั้งค่า)"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Terrible Lizards\\ หรือ C:\\XboxGames\\Terrible Lizards\\Content\\",
    "uninstallNote": "ลบไฟล์ TerribleLizards_Thai_P.pak, .utoc และ .ucas ออกจากโฟลเดอร์ terrible_lizards\\Content\\Paks\\~mods",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Hydrogen"
      },
      {
        "role": "Thai Fonts",
        "name": "Niramit, Chakra Petch & Roboto Mono (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "สยองขวัญ",
      "แอ็กชัน",
      "ผจญภัย",
      "อินดี้"
    ],
    "critics": {
      "metacriticSlug": "terrible-lizards",
      "metacriticScore": 75,
      "metacriticUrl": "https://www.metacritic.com/game/terrible-lizards/",
      "openCriticScore": 69,
      "openCriticTier": "Fair",
      "openCriticUrl": "https://opencritic.com/game/21613/terrible-lizards"
    },
    "releasedOrder": "2026-11-14",
    "nexusDownloads": 14,
    "estimatedPriceThb": 459,
    "tags": [
      "แปลภาษาไทย 100%",
      "สลับไทย/อังกฤษในเกม",
      "Unreal Engine 5",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "Terrible Lizards ม็อดไทย",
      "Terrible Lizards ม็อดภาษาไทย",
      "กิ้งก่า สยอง ม็อดไทย",
      "Terrible Lizards แปลไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/terriblelizards/mods/8",
    "media": {
      "header": "/mods/terrible-lizards/header.webp",
      "cover": "/mods/terrible-lizards/cover.webp",
      "ogImage": "/mods/terrible-lizards/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/terrible-lizards/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Terrible Lizards (กิ้งก่า สยอง)",
          "caption": "ภาพปกม็อดภาษาไทย Terrible Lizards (กิ้งก่า สยอง)",
          "tag": "Cover"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Hydrogen",
      "fontUsed": "Niramit / Chakra Petch / Roboto Mono",
      "translatedLines": "2,787 ข้อความ (100%)",
      "coveragePercent": 100,
      "engine": "Unreal Engine 5.4 (IoStore)",
      "fileSize": "1.29 MB",
      "releasedAt": "14 พ.ย. 2026",
      "updatedAt": "14 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/2920220/Terrible_Lizards/",
        "steamAppId": 2920220
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/search/games?q=Terrible+Lizards"
      }
    ],
    "files": [
      {
        "id": "terrible-lizards-v1-0",
        "fileName": "TerribleLizards_Thai_Mod.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / Xbox Game Pass)",
        "version": "v1.0",
        "size": "1.29 MB",
        "uploadedAt": "14 พ.ย. 2026",
        "sha256": "9be26a79c1ce0a158101fa163f31097d16b08d67745f0d94d93983f0f3c4f581",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/terrible-lizards-v1.0/TerribleLizards_Thai_Mod.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วลากโฟลเดอร์ terrible_lizards ไปวางในโฟลเดอร์หลักของตัวเกม (Steam หรือ XboxGames\\Terrible Lizards\\Content)",
        "backupUrl": "https://drive.google.com/file/d/1J1pgNEvsp0RX5Ah0ihOcM9gvWxRdctbN/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Terrible Lizards",
      "releaseDate": "29 ต.ค. 2026",
      "developers": [
        "WDR Studios LLC"
      ],
      "publishers": [
        "Digital Pajamas",
        "Behaviour Interactive Inc."
      ],
      "genres": [
        "สยองขวัญ",
        "แอ็กชัน",
        "ผจญภัย"
      ],
      "shortDescription": "เกมสยองขวัญผสานพาร์กัวร์เอาชีวิตรอดจากฝูงไดโนเสาร์ในสวนสนุกสุดหลอน",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel® Core™ i5-6400 / AMD Ryzen™ 3 1200"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 6 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA® GeForce® GTX 1050 2GB / AMD Radeon™ RX 560 2GB"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 25 GB"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "Requires a 64-bit processor and operating system"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 11"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel® Core™ i3-10100F / AMD Ryzen™ 3 3100"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 12 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "NVIDIA® GeForce® RTX 2080 / AMD Radeon™ RX 6800XT"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 25 GB"
        },
        {
          "label": "หมายเหตุเพิ่มเติม",
          "value": "Requires a 64-bit processor and operating system"
        }
      ]
    }
  },
  {
    "slug": "hope-in-the-city",
    "gameTitle": "Hope in the City",
    "thaiTitle": "Hope in the City ม็อดภาษาไทย (ความหวังในเมือง)",
    "shortDescription": "Hope in the City — ม็อดภาษาไทย 100% แปลครบทุกข้อความและบทสนทนาในเกม ทำงานผ่าน Doorstop + Harmony ไม่แก้ไฟล์ DLL เกม | AI Model : Gemini 4 Hydrogen | Steam & Xbox Game Pass",
    "overview": "ม็อดแปลภาษาไทยฉบับสมบูรณ์ 100% สำหรับเกมผจญภัยเนื้อเรื่องอินดี้ Hope in the City ออกแบบด้วยระบบ Unity Doorstop + Harmony เพื่อฉีดฟอนต์ภาษาไทยขณะรันไทม์โดยไม่แก้ไขไฟล์ Assembly-CSharp.dll ของเกม จึงปลอดภัย ใช้งานร่วมกับม็อดอื่นได้ และรองรับครบทั้งเวอร์ชัน Steam และ Xbox Game Pass (PC)",
    "features": [
      "แปลครบทุกข้อความ บทสนทนา และเมนูในเกม 100% ด้วยสำนวนธรรมชาติอ่านสบายตา",
      "ฮุกเปลี่ยนฟอนต์ภาษาไทยตอนรันไทม์ผ่าน Unity Doorstop + Harmony ไม่แตะไฟล์ Assembly-CSharp.dll",
      "ติดตั้งง่ายแบบลากวาง ไม่ต้องรันไฟล์ .bat หรือ .exe ใดๆ",
      "รองรับทั้งเวอร์ชัน Steam และ Xbox Game Pass (PC)"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ HopeInTheCity_ThaiMod.zip",
      "นำไฟล์ winhttp.dll, doorstop_config.ini รวมถึงโฟลเดอร์ ThaiMod และ HITC_Data ไปวางทับในโฟลเดอร์หลักของตัวเกม (ที่มีไฟล์ HITC.exe)",
      "เข้าเล่นเกมเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Hope in the City\\ หรือ C:\\XboxGames\\Hope in the City\\Content\\",
    "uninstallNote": "ลบ winhttp.dll, doorstop_config.ini, โฟลเดอร์ ThaiMod และ HITC_Data\\StreamingAssets\\ThaiFont.ttf แล้วกดซ่อมไฟล์เกมบน Steam/Xbox",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Hydrogen"
      },
      {
        "role": "Mod Injection",
        "name": "Unity Doorstop + Harmony"
      }
    ],
    "genres": [
      "ผจญภัย",
      "อินดี้",
      "เนื้อเรื่อง"
    ],
    "releasedOrder": "2026-11-13",
    "nexusDownloads": 8,
    "estimatedPriceThb": 319,
    "tags": [
      "แปลภาษาไทย 100%",
      "Unity Doorstop",
      "Harmony",
      "Steam & Xbox"
    ],
    "seoKeywords": [
      "Hope in the City ม็อดไทย",
      "Hope in the City ม็อดภาษาไทย",
      "Hope in the City แปลไทย",
      "ความหวังในเมือง ม็อดไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/hopeinthecity/mods/1",
    "media": {
      "header": "/mods/hope-in-the-city/header.webp",
      "cover": "/mods/hope-in-the-city/cover.webp",
      "ogImage": "/mods/hope-in-the-city/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/hope-in-the-city/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Hope in the City (ความหวังในเมือง)",
          "caption": "ภาพปกม็อดภาษาไทย Hope in the City (ความหวังในเมือง)",
          "tag": "Cover"
        },
        {
          "src": "/mods/hope-in-the-city/gallery-01.webp",
          "alt": "ตัวอย่างหน้าจอและบทสนทนาภาษาไทยในเกม — Hope in the City",
          "caption": "ตัวอย่างหน้าจอและบทสนทนาภาษาไทยในเกม",
          "tag": "Gameplay"
        },
        {
          "src": "/mods/hope-in-the-city/gallery-02.webp",
          "alt": "ตัวอย่างข้อความและเมนูภาษาไทย — Hope in the City",
          "caption": "ตัวอย่างข้อความและเมนูภาษาไทย",
          "tag": "Gameplay"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Hydrogen",
      "fontUsed": "ThaiFont TTF (Harmony Runtime Hook)",
      "translatedLines": "แปลครบทั้งเกม (100%)",
      "coveragePercent": 100,
      "engine": "Unity (Mono + Doorstop)",
      "fileSize": "976.7 KB",
      "releasedAt": "13 พ.ย. 2026",
      "updatedAt": "13 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Xbox Game Pass (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/3610790/Hope_in_the_City/",
        "steamAppId": 3610790
      },
      {
        "platform": "xbox",
        "label": "Xbox / Game Pass (PC)",
        "url": "https://www.xbox.com/th-th/search/games?q=Hope+in+the+City"
      }
    ],
    "files": [
      {
        "id": "hope-v1-0",
        "fileName": "HopeInTheCity_ThaiMod.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / Xbox Game Pass)",
        "version": "v1.0",
        "size": "976.7 KB",
        "uploadedAt": "13 พ.ย. 2026",
        "sha256": "eabb40e5a164026a75a5d66af2406e7a6f35f6e48e699bfc4a8fd83bc8fdf30a",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/hope-v1.0/HopeInTheCity_ThaiMod.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำ winhttp.dll, doorstop_config.ini, ThaiMod และ HITC_Data ไปวางในโฟลเดอร์หลักของตัวเกม",
        "backupUrl": "https://drive.google.com/file/d/1dXhH_oorujO2CHN8JjtbCg2-B-8scBZJ/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Hope in the City",
      "releaseDate": "11 พ.ย. 2026",
      "developers": [
        "Lofty Sky Entertainment Inc."
      ],
      "publishers": [
        "Lofty Sky Entertainment Inc.",
        "NAGA Games"
      ],
      "genres": [
        "ผจญภัย",
        "อินดี้",
        "เนื้อเรื่อง"
      ],
      "shortDescription": "ออกสำรวจเมืองนีออนยามค่ำคืนและค้นหาความหวังในเกมผจญภัยเน้นเนื้อเรื่องสไตล์โลว์โพลี",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ *",
          "value": "Windows 7 (64 bit)"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "i7 2600k"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "GeForce GTX 560"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 9.0"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 3 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 (64 bit)"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "i5 10400F"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "GeForce GTX 1060"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 10 GB"
        }
      ]
    }
  },
  {
    "slug": "gori-cuddly-carnage",
    "gameTitle": "Gori: Cuddly Carnage",
    "thaiTitle": "Gori: Cuddly Carnage ม็อดภาษาไทย",
    "shortDescription": "Gori: Cuddly Carnage - ม็อดภาษาไทยสมบูรณ์แบบ 100% (3,195 รายการ) แปลครบทุกเมนู คอสตูม อัปเกรด คัตซีน และบทสนทนาทุกตัวละคร ฟอนต์ Kanit คมชัด | AI Model : Gemini 4 Argon | Steam & Epic",
    "overview": "ม็อดแปลภาษาไทยสมบูรณ์แบบ 100% สำหรับเกมแอ็กชันฟันแหลกบนโฮเวอร์บอร์ด Gori: Cuddly Carnage แปลครบ 3,195 รายการ ครอบคลุมเมนู UI 1,006 รายการ ไอเทม/สกิน 294 รายการ และบทพากย์ มุกตลก คำสบถสุดกวนของ Frank พร้อมฟอนต์ไทย Kanit คมชัด แก้ปัญหาสระลอย ตัวอักษรโปร่งใส และข้อความตกขอบสมบูรณ์ รองรับทั้งการลากวางและ Vortex",
    "features": [
      "แปลครบ 100% (3,195 รายการ): เมนูหลักและ UI (1,006), ไอเทม/สกิน/สถิติ (294) และบทพากย์/คัตซีนทุกตัวละคร",
      "ฟอนต์ภาษาไทย Kanit คมชัดสไตล์มินิมอล ปรับสเกลสัดส่วนสวยงาม อ่านง่าย",
      "แก้บัคสระลอย ตัวอักษรโปร่งใส ข้อความตกขอบ และจัดระเบียบหน้าแจ้งเตือนคอนโทรลเลอร์เรียบร้อย",
      "ทำงานแบบไฟล์แพตช์ (_P) ในโฟลเดอร์ ~mods ไม่ทับไฟล์เกมเดิม และรองรับการติดตั้งผ่าน Vortex"
    ],
    "installSteps": [
      "ดาวน์โหลดและแตกไฟล์ Gori_Cuddly_Carnage_Thai_Mod_v1.0.zip จะพบโฟลเดอร์ GoriCuddlyCarnage",
      "คัดลอกโฟลเดอร์ GoriCuddlyCarnage ไปวางรวมในโฟลเดอร์หลักของตัวเกม (ที่มีไฟล์ Gori_Cuddly_Carnage.exe)",
      "เปิดเกมเล่นเป็นภาษาไทยได้ทันที"
    ],
    "installPathExample": "Steam\\steamapps\\common\\Gori Cuddly Carnage\\",
    "uninstallNote": "ลบไฟล์ Gori_Thai_P.pak, Gori_Thai_Fonts_P.pak, Gori_Thai_P.utoc และ Gori_Thai_P.ucas ออกจากโฟลเดอร์ ~mods",
    "credits": [
      {
        "role": "Thai Localization & Modding",
        "name": "MaTaReaL"
      },
      {
        "role": "AI Translation Model",
        "name": "Gemini 4 Argon"
      },
      {
        "role": "Thai Font",
        "name": "Kanit (SIL OFL 1.1)"
      }
    ],
    "genres": [
      "แอ็กชัน",
      "ผจญภัย",
      "อินดี้"
    ],
    "critics": {
      "metacriticSlug": "gori-cuddly-carnage",
      "metacriticScore": 78,
      "metacriticUrl": "https://www.metacritic.com/game/gori-cuddly-carnage/",
      "openCriticScore": 78,
      "openCriticTier": "Strong",
      "openCriticUrl": "https://opencritic.com/game/17205/gori-cuddly-carnage"
    },
    "releasedOrder": "2026-11-05",
    "nexusDownloads": 9,
    "estimatedPriceThb": 435.58,
    "tags": [
      "แปลภาษาไทย 100%",
      "ฟอนต์ Kanit",
      "Unreal Engine 5",
      "Steam / Epic"
    ],
    "seoKeywords": [
      "Gori Cuddly Carnage ม็อดไทย",
      "Gori Cuddly Carnage ม็อดภาษาไทย",
      "Gori Cuddly Carnage แปลไทย",
      "MaTaReaL ม็อดไทย"
    ],
    "nexusModUrl": "https://www.nexusmods.com/goricuddlycarnage/mods/1",
    "media": {
      "header": "/mods/gori-cuddly-carnage/header.webp",
      "cover": "/mods/gori-cuddly-carnage/cover.webp",
      "ogImage": "/mods/gori-cuddly-carnage/og-share.jpg",
      "gallery": [
        {
          "src": "/mods/gori-cuddly-carnage/cover.webp",
          "alt": "ภาพปกม็อดภาษาไทย Gori: Cuddly Carnage",
          "caption": "ภาพปกม็อดภาษาไทย Gori: Cuddly Carnage",
          "tag": "Cover"
        }
      ]
    },
    "specs": {
      "version": "v1.0",
      "aiModel": "Gemini 4 Argon",
      "fontUsed": "Kanit (Unreal Engine 5)",
      "translatedLines": "3,195 รายการ (100%)",
      "coveragePercent": 100,
      "engine": "Unreal Engine 5.1 (IoStore)",
      "fileSize": "3.13 MB",
      "releasedAt": "5 พ.ย. 2026",
      "updatedAt": "5 พ.ย. 2026",
      "supportedGamePlatform": "Steam / Epic (PC)"
    },
    "stores": [
      {
        "platform": "steam",
        "label": "Steam (PC)",
        "url": "https://store.steampowered.com/app/1299690/Gori_Cuddly_Carnage/",
        "steamAppId": 1299690
      },
      {
        "platform": "epic",
        "label": "Epic Games Store",
        "url": "https://store.epicgames.com/th/p/gori-cuddly-carnage-57031b"
      },
      {
        "platform": "xbox",
        "label": "Xbox Store",
        "url": "https://www.xbox.com/th-th/games/store/gori-cuddly-carnage/9p8v3g7m8w2s"
      },
      {
        "platform": "playstation",
        "label": "PlayStation Store (PS5 / PS4)",
        "url": "https://store.playstation.com/th-th/search/gori%20cuddly%20carnage"
      },
      {
        "platform": "nintendo",
        "label": "Nintendo Switch",
        "url": "https://www.nintendo.com/us/store/products/gori-cuddly-carnage-switch/"
      }
    ],
    "files": [
      {
        "id": "gori-v1-0",
        "fileName": "Gori_Cuddly_Carnage_Thai_Mod_v1.0.zip",
        "label": "ม็อดแปลภาษาไทย 100% (Steam / Epic PC)",
        "version": "v1.0",
        "size": "3.13 MB",
        "uploadedAt": "5 พ.ย. 2026",
        "sha256": "f6aebded754b60cf9dd6fb1a3283ce57b07757188cb6c2f11667cab81a492b18",
        "primaryUrl": "https://github.com/MaTaReaL/matareal-modthai-releases/releases/download/gori-v1.0/Gori_Cuddly_Carnage_Thai_Mod_v1.0.zip",
        "primaryHost": "GitHub Releases",
        "installNote": "แตกไฟล์แล้วนำโฟลเดอร์ GoriCuddlyCarnage ไปวางรวมในโฟลเดอร์หลักของตัวเกม (รองรับการติดตั้งผ่าน Vortex ด้วย)",
        "backupUrl": "https://drive.google.com/file/d/1lJKsMd2KqSFhWzDMGnLdPGZxeLyLY4Xu/view?usp=sharing",
        "backupHost": "Google Drive"
      }
    ],
    "fallbackSteam": {
      "name": "Gori: Cuddly Carnage",
      "releaseDate": "29 ส.ค. 2024",
      "developers": [
        "Angry Demon Studio"
      ],
      "publishers": [
        "Wired Productions",
        "CouchPlay Interactive (Greater China)"
      ],
      "genres": [
        "แอ็กชัน",
        "ผจญภัย",
        "อินดี้"
      ],
      "shortDescription": "สวมบทแมวเหมียวสุดโหดซิ่งโฮเวอร์บอร์ดมีชีวิตไล่เชือดกองทัพของเล่นกลายพันธุ์ในเมืองนีออนสุดบ้าคลั่ง",
      "minimumSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i5 6th Gen or AMD Ryzen 3"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 4 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Nvidia GTX 1050, Intel Arc A380, AMD RX560"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 11"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 8 GB"
        }
      ],
      "recommendedSpecs": [
        {
          "label": "ระบบปฏิบัติการ",
          "value": "Windows 10 64-bit"
        },
        {
          "label": "โปรเซสเซอร์",
          "value": "Intel Core i7 10th Gen or AMD Ryzen 5"
        },
        {
          "label": "หน่วยความจำ",
          "value": "แรม 8 GB"
        },
        {
          "label": "กราฟิกส์",
          "value": "Nvidia GTX 2060, Intel Arc A750, AMD RX 5600xt"
        },
        {
          "label": "DirectX",
          "value": "เวอร์ชัน 12"
        },
        {
          "label": "พื้นที่จัดเก็บข้อมูล",
          "value": "พื้นที่ว่างที่พร้อมใช้งาน 8 GB"
        }
      ]
    }
  }
];

export function getModBySlug(slug: string): ModEntry | undefined {
  return MODS.find((m) => m.slug === slug);
}

export function getAllModSlugs(): string[] {
  return MODS.map((m) => m.slug);
}

export function getModsBySeries(seriesId: string): ModEntry[] {
  return MODS.filter((m) => m.series?.id === seriesId).sort(
    (a, b) => (a.series?.order ?? 999) - (b.series?.order ?? 999)
  );
}
