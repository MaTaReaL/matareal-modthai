export interface InstallTreeNode {
  name: string;
  type: "dir" | "file";
  /**
   * "anchor" = existing game file/folder used as landmark (Sky blue)
   * "mod" = mod file/folder the player drags & drops here (Emerald green — always green!)
   */
  role: "anchor" | "mod";
  badge?: string;
  note?: string;
}

export interface InstallGuidePlatform {
  platformLabel: string;
  howToOpen: string;
  rootFolderHint: string;
  /** Exact count of items to drag (e.g. "1 โฟลเดอร์", "1 โฟลเดอร์ + 2 ไฟล์") */
  dragSummary: string;
  dragItems: { name: string; type: "dir" | "file" }[];
  tree: InstallTreeNode[];
}

export interface ModInstallGuide {
  /** Exact instruction of what to open inside the downloaded ZIP */
  zipSourceHint: string;
  platforms: InstallGuidePlatform[];
}

function makeFtfGuide(zipFolder: string, exeName: string, dataFolder: string): ModInstallGuide {
  return {
    zipSourceHint: `แตกไฟล์ ZIP แล้วเปิดเข้าโฟลเดอร์ ${zipFolder}/`,
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ (Manage) → เปิดหาไฟล์ภายในเครื่อง (Browse local files)",
        rootFolderHint: `โฟลเดอร์หลักของเกม (ที่มี ${exeName})`,
        dragSummary: "1 โฟลเดอร์ + 2 ไฟล์",
        dragItems: [
          { name: "ThaiMod/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
        ],
        tree: [
          { name: exeName, type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: dataFolder, type: "dir", role: "anchor", note: "โฟลเดอร์เกมเดิม" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
        ],
      },
    ],
  };
}

function makeSingleFolderMergeGuide(
  modFolder: string,
  zipSourceHint: string,
  exeHint: string,
  hasXbox = true,
  mergeNote = "ชื่อตรงโฟลเดอร์เกมเดิม — กดวางรวม (Merge)"
): ModInstallGuide {
  const treeNodes: InstallTreeNode[] = [
    ...(exeHint ? [{ name: exeHint, type: "file" as const, role: "anchor" as const, badge: "จุดสังเกต" }] : []),
    { name: "Engine/", type: "dir", role: "anchor", badge: exeHint ? undefined : "จุดสังเกต", note: "โฟลเดอร์เกมเดิม" },
    { name: `${modFolder}/`, type: "dir", role: "mod", badge: "ลากมาวางตรงนี้", note: mergeNote },
  ];

  const dragItems = [{ name: `${modFolder}/`, type: "dir" as const }];

  const platforms: InstallGuidePlatform[] = [
    {
      platformLabel: "Steam (PC)",
      howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
      rootFolderHint: `โฟลเดอร์หลักของเกม (ที่มีโฟลเดอร์ ${modFolder}/ อยู่แล้ว)`,
      dragSummary: "1 โฟลเดอร์",
      dragItems,
      tree: treeNodes,
    },
  ];

  if (hasXbox) {
    platforms.push({
      platformLabel: "Xbox / Game Pass (PC)",
      howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
      rootFolderHint: `โฟลเดอร์ Content/ (ที่มีโฟลเดอร์ ${modFolder}/ อยู่แล้ว)`,
      dragSummary: "1 โฟลเดอร์",
      dragItems,
      tree: treeNodes,
    });
  }

  return { zipSourceHint, platforms };
}

export const INSTALL_GUIDES: Record<string, ModInstallGuide> = {
  "sea-of-solitude": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเปิดเข้าโฟลเดอร์ SOS_ThaiMod/",
    platforms: [
      {
        platformLabel: "Steam / EA App (PC)",
        howToOpen: "Steam: คลิกขวาเกม → จัดการ → เปิดหาไฟล์ภายในเครื่อง | EA App: จัดการ → ดูคุณสมบัติ → เปิดโฟลเดอร์",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี SeaOfSolitude.exe และ SeaOfSolitude_Data/)",
        dragSummary: "1 โฟลเดอร์",
        dragItems: [{ name: "SeaOfSolitude_Data/", type: "dir" }],
        tree: [
          { name: "SeaOfSolitude.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "SeaOfSolitude_Data/",
            type: "dir",
            role: "mod",
            badge: "ลากมาวางทับตรงนี้",
            note: "ชื่อตรงโฟลเดอร์เกมเดิม — กดยืนยันวางทับทั้งหมด",
          },
        ],
      },
    ],
  },

  "fears-to-fathom-home-alone": makeFtfGuide(
    "ThaiMod_EP1",
    "Fears To Fathom.exe",
    "Fears To Fathom_Data/"
  ),
  "fears-to-fathom-norwood-hitchhike": makeFtfGuide(
    "ThaiMod_EP2",
    "Fears To Fathom - Norwood Hitchhike.exe",
    "Fears To Fathom - Norwood Hitchhike_Data/"
  ),
  "fears-to-fathom-carson-house": makeFtfGuide(
    "ThaiMod_EP3",
    "Fears To Fathom - Carson House.exe",
    "Fears To Fathom - Carson House_Data/"
  ),
  "fears-to-fathom-ironbark-lookout": makeFtfGuide(
    "ThaiMod_EP4",
    "Fears to Fathom - Ironbark Lookout.exe",
    "Fears to Fathom - Ironbark Lookout_Data/"
  ),
  "fears-to-fathom-woodbury-getaway": makeFtfGuide(
    "ThaiMod_EP5",
    "Fears to Fathom - Woodbury Getaway.exe",
    "Fears to Fathom - Woodbury Getaway_Data/"
  ),
  "fears-to-fathom-scratch-creek": makeFtfGuide(
    "ThaiMod_ScratchCreek",
    "Fears to Fathom - Scratch Creek.exe",
    "Fears to Fathom - Scratch Creek_Data/"
  ),

  "venus-vacation-prism-dead-or-alive-xtreme": {
    zipSourceHint: "แตกไฟล์ ZIP จะเห็นโฟลเดอร์ archive/ และ fdata_package/ (ข้ามไฟล์ README)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี archive/ และ fdata_package/)",
        dragSummary: "2 โฟลเดอร์",
        dragItems: [
          { name: "archive/", type: "dir" },
          { name: "fdata_package/", type: "dir" },
        ],
        tree: [
          { name: "VVPrism.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "archive/", type: "dir", role: "mod", badge: "ลากมาวางทับตรงนี้", note: "กดยืนยันวางทับ" },
          { name: "fdata_package/", type: "dir", role: "mod", badge: "ลากมาวางทับตรงนี้", note: "กดยืนยันวางทับ" },
        ],
      },
    ],
  },

  outbound: {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเลือก 2 โฟลเดอร์ + 3 ไฟล์นี้ (ข้ามไฟล์ README_TH.txt)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Outbound.exe)",
        dragSummary: "2 โฟลเดอร์ + 3 ไฟล์",
        dragItems: [
          { name: "BepInEx/", type: "dir" },
          { name: "dotnet/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
          { name: ".doorstop_version", type: "file" },
        ],
        tree: [
          { name: "Outbound.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Outbound_Data/", type: "dir", role: "anchor", note: "โฟลเดอร์เกมเดิม" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มี Outbound.exe)",
        dragSummary: "2 โฟลเดอร์ + 3 ไฟล์",
        dragItems: [
          { name: "BepInEx/", type: "dir" },
          { name: "dotnet/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
          { name: ".doorstop_version", type: "file" },
        ],
        tree: [
          { name: "gamelaunchhelper.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Outbound.exe", type: "file", role: "anchor" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
        ],
      },
    ],
  },

  "farm-and-feast": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเปิดเข้าโฟลเดอร์ Mod_Files/ นำไฟล์ทั้งหมดข้างในมาวาง",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกม Farm & Feast ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Farm & Feast.exe)",
        dragSummary: "2 โฟลเดอร์ + 3 ไฟล์",
        dragItems: [
          { name: "BepInEx/", type: "dir" },
          { name: "dotnet/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
          { name: ".doorstop_version", type: "file" },
        ],
        tree: [
          { name: "Farm & Feast.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Farm & Feast_Data/", type: "dir", role: "anchor", note: "โฟลเดอร์เกมเดิม" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
        ],
      },
    ],
  },

  "control-im-not-coming-back": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเลือก 1 โฟลเดอร์ + 2 ไฟล์นี้ (ข้ามไฟล์ README_TH.txt)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มีไฟล์ .exe เปิดเกม)",
        dragSummary: "1 โฟลเดอร์ + 2 ไฟล์",
        dragItems: [
          { name: "ThaiMod/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
        ],
        tree: [
          { name: "Control, I'm Not Coming Back.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
        ],
      },
    ],
  },

  routine: makeSingleFolderMergeGuide(
    "Routine",
    "แตกไฟล์ ZIP แล้วลากโฟลเดอร์ Routine/ เพียงโฟลเดอร์เดียว (ข้ามไฟล์ README)",
    "Routine.exe",
    true
  ),
  denshattack: makeSingleFolderMergeGuide(
    "Denshattack_Proto",
    "แตกไฟล์ ZIP แล้วลากโฟลเดอร์ Denshattack_Proto/ เพียงโฟลเดอร์เดียว (ข้ามไฟล์ README)",
    "Denshattack.exe",
    true
  ),
  aphelion: makeSingleFolderMergeGuide(
    "PIO",
    "แตกไฟล์ ZIP แล้วลากโฟลเดอร์ PIO/ เพียงโฟลเดอร์เดียว (ข้ามไฟล์ README)",
    "",
    true
  ),
  "terrible-lizards": makeSingleFolderMergeGuide(
    "terrible_lizards",
    "แตกไฟล์ ZIP → เปิดเข้าโฟลเดอร์ TerribleLizards_Thai_P/ แล้วลากโฟลเดอร์ terrible_lizards/",
    "",
    true
  ),
  "gori-cuddly-carnage": makeSingleFolderMergeGuide(
    "GoriCuddlyCarnage",
    "แตกไฟล์ ZIP แล้วลากโฟลเดอร์ GoriCuddlyCarnage/ เพียงโฟลเดอร์เดียว (ข้ามไฟล์ README)",
    "Gori_Cuddly_Carnage.exe",
    false
  ),
  "paw-patrol-dino-world": {
    zipSourceHint: "เลือกโหลดไฟล์ให้ตรงแพลตฟอร์ม → แตกไฟล์ ZIP แล้วลากโฟลเดอร์ PDW/ เพียงโฟลเดอร์เดียว",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Engine/ และ PDW/)",
        dragSummary: "1 โฟลเดอร์",
        dragItems: [{ name: "PDW/", type: "dir" }],
        tree: [
          { name: "Engine/", type: "dir", role: "anchor", badge: "จุดสังเกต", note: "โฟลเดอร์เกมเดิม" },
          {
            name: "PDW/",
            type: "dir",
            role: "mod",
            badge: "ลากมาวางตรงนี้",
            note: "จัด Path ข้างในไว้ครบแล้ว — กดวางรวม (Merge) จบเลย",
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มี Engine/ และ PDW/)",
        dragSummary: "1 โฟลเดอร์",
        dragItems: [{ name: "PDW/", type: "dir" }],
        tree: [
          { name: "Engine/", type: "dir", role: "anchor", badge: "จุดสังเกต", note: "โฟลเดอร์เกมเดิม" },
          {
            name: "PDW/",
            type: "dir",
            role: "mod",
            badge: "ลากมาวางทับตรงนี้",
            note: "กดยืนยันวางทับ PDW-WinGDK.pak (แนะนำสำรองไฟล์เดิมก่อน)",
          },
        ],
      },
    ],
  },

  "forza-horizon-6": {
    zipSourceHint: "แบบตัวติดตั้ง: เปิด FH6_ThaiMod_Setup.exe | แบบลากวาง: แตกไฟล์แล้วลากโฟลเดอร์ media/",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวา Forza Horizon 6 ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี ForzaHorizon6.exe และ media/)",
        dragSummary: "1 โฟลเดอร์ (หรือใช้ตัวติดตั้ง)",
        dragItems: [{ name: "media/", type: "dir" }],
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "media/",
            type: "dir",
            role: "mod",
            badge: "ลากมาวางทับตรงนี้",
            note: "ชื่อตรงโฟลเดอร์เกมเดิม — กดยืนยันวางทับ",
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มี ForzaHorizon6.exe และ media/)",
        dragSummary: "1 โฟลเดอร์ (หรือใช้ตัวติดตั้ง)",
        dragItems: [{ name: "media/", type: "dir" }],
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "media/",
            type: "dir",
            role: "mod",
            badge: "ลากมาวางทับตรงนี้",
            note: "ชื่อตรงโฟลเดอร์เกมเดิม — กดยืนยันวางทับ",
          },
        ],
      },
    ],
  },

  "hope-in-the-city": {
    zipSourceHint: "แตกไฟล์ ZIP → เปิดเข้าโฟลเดอร์ HopeInTheCity_ThaiMod/ แล้วลาก 2 โฟลเดอร์ + 2 ไฟล์ (ข้าม README)",
    platforms: [
      {
        platformLabel: "Steam / Xbox Game Pass (PC)",
        howToOpen: "Steam: จัดการ → เปิดหาไฟล์ภายในเครื่อง | Xbox: จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี HITC.exe และ HITC_Data/)",
        dragSummary: "2 โฟลเดอร์ + 2 ไฟล์",
        dragItems: [
          { name: "HITC_Data/", type: "dir" },
          { name: "ThaiMod/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
        ],
        tree: [
          { name: "HITC.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "HITC_Data/", type: "dir", role: "mod", badge: "ลากมาวางทับตรงนี้", note: "กดยืนยันวางรวม/ทับ" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ลากมาวางตรงนี้" },
        ],
      },
    ],
  },
};
