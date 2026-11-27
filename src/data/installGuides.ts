export interface InstallTreeNode {
  name: string;
  type: "dir" | "file";
  /**
   * "anchor" = existing game file/folder used as landmark (Sky blue)
   * "mod" = new mod file/folder to drop here (Emerald green = Go/Place here)
   * "overwrite" = mod folder/file that merges/overwrites existing one (Amber gold = Merge/Replace safely, NOT red!)
   * "parent" = container folder leading to target
   */
  role: "parent" | "anchor" | "mod" | "overwrite";
  badge?: string;
  note?: string;
  children?: InstallTreeNode[];
}

export interface InstallGuidePlatform {
  platformLabel: string;
  howToOpen: string;
  rootFolderHint: string;
  /** Exact items the player drags & drops (e.g. "1 โฟลเดอร์" or "2 ไฟล์ + 1 โฟลเดอร์") */
  dragSummary: string;
  dragItems: { name: string; type: "dir" | "file"; action: "add" | "overwrite" }[];
  tree: InstallTreeNode[];
}

export interface ModInstallGuide {
  /** Which folder inside the downloaded ZIP to open first */
  zipSourceHint: string;
  platforms: InstallGuidePlatform[];
}

function makeFtfGuide(
  zipFolder: string,
  exeName: string,
  dataFolder: string
): ModInstallGuide {
  return {
    zipSourceHint: `แตกไฟล์ ZIP แล้วเปิดเข้าไปในโฟลเดอร์ ${zipFolder}/`,
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ (Manage) → เปิดหาไฟล์ภายในเครื่อง (Browse local files)",
        rootFolderHint: `โฟลเดอร์หลักของเกม (ที่มี ${exeName})`,
        dragSummary: "2 ไฟล์ + 1 โฟลเดอร์",
        dragItems: [
          { name: "ThaiMod/", type: "dir", action: "add" },
          { name: "winhttp.dll", type: "file", action: "add" },
          { name: "doorstop_config.ini", type: "file", action: "add" },
        ],
        tree: [
          { name: exeName, type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: dataFolder, type: "dir", role: "anchor", note: "โฟลเดอร์เกมเดิม" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  };
}

function makeUe5FolderDropGuide(
  modRootFolder: string,
  exeHint: string,
  hasXbox = true
): ModInstallGuide {
  const treeNodes: InstallTreeNode[] = [
    ...(exeHint ? [{ name: exeHint, type: "file" as const, role: "anchor" as const, badge: "จุดสังเกต" }] : []),
    { name: "Engine/", type: "dir", role: "anchor", badge: exeHint ? undefined : "จุดสังเกต", note: "โฟลเดอร์เกมเดิม" },
    {
      name: `${modRootFolder}/`,
      type: "dir",
      role: "overwrite",
      badge: "ลากมาวางรวมตรงนี้",
      note: "กดยืนยันรวมโฟลเดอร์ (Merge) — ไม่ทับไฟล์หลักเกม",
    },
  ];

  const dragItems = [{ name: `${modRootFolder}/`, type: "dir" as const, action: "overwrite" as const }];

  const platforms: InstallGuidePlatform[] = [
    {
      platformLabel: "Steam (PC)",
      howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
      rootFolderHint: `โฟลเดอร์หลักของเกม (ที่มี Engine/ และ ${modRootFolder}/)`,
      dragSummary: "1 โฟลเดอร์ (จบในครั้งเดียว)",
      dragItems,
      tree: treeNodes,
    },
  ];

  if (hasXbox) {
    platforms.push({
      platformLabel: "Xbox / Game Pass (PC)",
      howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
      rootFolderHint: `โฟลเดอร์ Content/ (ที่มี Engine/ และ ${modRootFolder}/)`,
      dragSummary: "1 โฟลเดอร์ (จบในครั้งเดียว)",
      dragItems,
      tree: treeNodes,
    });
  }

  return {
    zipSourceHint: `แตกไฟล์ ZIP แล้วลากโฟลเดอร์ ${modRootFolder}/ เพียงโฟลเดอร์เดียว`,
    platforms,
  };
}

export const INSTALL_GUIDES: Record<string, ModInstallGuide> = {
  "sea-of-solitude": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเปิดเข้าไปในโฟลเดอร์ SOS_ThaiMod/",
    platforms: [
      {
        platformLabel: "Steam / EA App (PC)",
        howToOpen: "Steam: คลิกขวาเกม → จัดการ → เปิดหาไฟล์ภายในเครื่อง | EA App: จัดการ → ดูคุณสมบัติ → เปิดโฟลเดอร์",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี SeaOfSolitude.exe)",
        dragSummary: "1 โฟลเดอร์ (วางทับ)",
        dragItems: [{ name: "SeaOfSolitude_Data/", type: "dir", action: "overwrite" }],
        tree: [
          { name: "SeaOfSolitude.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "SeaOfSolitude_Data/",
            type: "dir",
            role: "overwrite",
            badge: "วางทับตรงนี้",
            note: "กดยืนยันแทนที่ไฟล์ทั้งหมด",
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
    zipSourceHint: "แตกไฟล์ VenusVacationPRISM_ThaiMod_v1.0.zip จะได้ 2 โฟลเดอร์",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี VVPrism.exe)",
        dragSummary: "2 โฟลเดอร์ (วางทับ)",
        dragItems: [
          { name: "archive/", type: "dir", action: "overwrite" },
          { name: "fdata_package/", type: "dir", action: "overwrite" },
        ],
        tree: [
          { name: "VVPrism.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "archive/", type: "dir", role: "overwrite", badge: "วางทับตรงนี้", note: "กดยืนยันแทนที่ไฟล์" },
          { name: "fdata_package/", type: "dir", role: "overwrite", badge: "วางทับตรงนี้", note: "กดยืนยันแทนที่ไฟล์" },
        ],
      },
    ],
  },

  outbound: {
    zipSourceHint: "แตกไฟล์ Outbound_Thai_Mod_v1.0.zip แล้วเลือกไฟล์และโฟลเดอร์ม็อดทั้งหมด",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Outbound.exe)",
        dragSummary: "3 ไฟล์ + 2 โฟลเดอร์",
        dragItems: [
          { name: "BepInEx/", type: "dir", action: "add" },
          { name: "dotnet/", type: "dir", action: "add" },
          { name: "winhttp.dll", type: "file", action: "add" },
          { name: "doorstop_config.ini", type: "file", action: "add" },
          { name: ".doorstop_version", type: "file", action: "add" },
        ],
        tree: [
          { name: "Outbound.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Outbound_Data/", type: "dir", role: "anchor", note: "โฟลเดอร์เกมเดิม" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มี Outbound.exe)",
        dragSummary: "3 ไฟล์ + 2 โฟลเดอร์",
        dragItems: [
          { name: "BepInEx/", type: "dir", action: "add" },
          { name: "dotnet/", type: "dir", action: "add" },
          { name: "winhttp.dll", type: "file", action: "add" },
          { name: "doorstop_config.ini", type: "file", action: "add" },
          { name: ".doorstop_version", type: "file", action: "add" },
        ],
        tree: [
          { name: "gamelaunchhelper.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Outbound.exe", type: "file", role: "anchor" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },

  "farm-and-feast": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเปิดเข้าไปในโฟลเดอร์ Mod_Files/",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกม Farm & Feast ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Farm & Feast.exe)",
        dragSummary: "3 ไฟล์ + 2 โฟลเดอร์",
        dragItems: [
          { name: "BepInEx/", type: "dir", action: "add" },
          { name: "dotnet/", type: "dir", action: "add" },
          { name: "winhttp.dll", type: "file", action: "add" },
          { name: "doorstop_config.ini", type: "file", action: "add" },
          { name: ".doorstop_version", type: "file", action: "add" },
        ],
        tree: [
          { name: "Farm & Feast.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Farm & Feast_Data/", type: "dir", role: "anchor", note: "โฟลเดอร์เกมเดิม" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },

  "control-im-not-coming-back": {
    zipSourceHint: "แตกไฟล์ Control_ImNotComingBack_ThaiMod_v1.0.zip",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มีไฟล์ .exe เปิดเกม)",
        dragSummary: "2 ไฟล์ + 1 โฟลเดอร์",
        dragItems: [
          { name: "ThaiMod/", type: "dir", action: "add" },
          { name: "winhttp.dll", type: "file", action: "add" },
          { name: "doorstop_config.ini", type: "file", action: "add" },
        ],
        tree: [
          { name: "Control, I'm Not Coming Back.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },

  routine: makeUe5FolderDropGuide("Routine", "Routine.exe", true),
  denshattack: makeUe5FolderDropGuide("Denshattack_Proto", "Denshattack.exe", true),
  aphelion: makeUe5FolderDropGuide("PIO", "", true),
  "terrible-lizards": makeUe5FolderDropGuide("terrible_lizards", "", true),
  "gori-cuddly-carnage": makeUe5FolderDropGuide("GoriCuddlyCarnage", "Gori_Cuddly_Carnage.exe", false),

  "paw-patrol-dino-world": {
    zipSourceHint: "เลือกโหลดไฟล์ให้ตรงแพลตฟอร์ม (Steam หรือ Xbox Game Pass)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง → เข้าไปที่ PDW / Content / Paks",
        rootFolderHint: "โฟลเดอร์ Paks/ (สร้างโฟลเดอร์ ~mods หากยังไม่มี)",
        dragSummary: "1 ไฟล์",
        dragItems: [{ name: "PDW_Thai_P.pak", type: "file", action: "add" }],
        tree: [
          { name: "PDW-Windows.pak", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "~mods/",
            type: "dir",
            role: "mod",
            badge: "สร้างโฟลเดอร์นี้",
            children: [{ name: "PDW_Thai_P.pak", type: "file", role: "mod", badge: "วางไฟล์นี้" }],
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → Content / PDW / Content / Paks",
        rootFolderHint: "โฟลเดอร์ Paks/ (สำรองไฟล์เดิมเก็บไว้ก่อน)",
        dragSummary: "1 ไฟล์ (วางทับ)",
        dragItems: [{ name: "PDW-WinGDK.pak", type: "file", action: "overwrite" }],
        tree: [
          { name: "PDW-WinGDK.pak", type: "file", role: "overwrite", badge: "วางทับไฟล์เดิม", note: "สำรองไฟล์เดิมก่อน" },
        ],
      },
    ],
  },

  "forza-horizon-6": {
    zipSourceHint: "แนะนำใช้ตัวติดตั้งอัตโนมัติ (FH6_ThaiMod_Setup.exe) หรือแบบลากวางโฟลเดอร์ media/",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวา Forza Horizon 6 ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี ForzaHorizon6.exe)",
        dragSummary: "1 โฟลเดอร์ (วางทับ) หรือรันตัวติดตั้ง",
        dragItems: [{ name: "media/", type: "dir", action: "overwrite" }],
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "media/", type: "dir", role: "overwrite", badge: "วางทับตรงนี้", note: "หรือรัน FH6_ThaiMod_Setup.exe" },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มี ForzaHorizon6.exe)",
        dragSummary: "1 โฟลเดอร์ (วางทับ) หรือรันตัวติดตั้ง",
        dragItems: [{ name: "media/", type: "dir", action: "overwrite" }],
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "media/", type: "dir", role: "overwrite", badge: "วางทับตรงนี้", note: "หรือรัน FH6_ThaiMod_Setup.exe" },
        ],
      },
    ],
  },

  "hope-in-the-city": {
    zipSourceHint: "แตกไฟล์ HopeInTheCity_ThaiMod.zip (ไม่ต้องลากไฟล์ README)",
    platforms: [
      {
        platformLabel: "Steam / Xbox Game Pass (PC)",
        howToOpen: "Steam: จัดการ → เปิดหาไฟล์ภายในเครื่อง | Xbox: จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี HITC.exe)",
        dragSummary: "2 ไฟล์ + 2 โฟลเดอร์",
        dragItems: [
          { name: "HITC_Data/", type: "dir", action: "overwrite" },
          { name: "ThaiMod/", type: "dir", action: "add" },
          { name: "winhttp.dll", type: "file", action: "add" },
          { name: "doorstop_config.ini", type: "file", action: "add" },
        ],
        tree: [
          { name: "HITC.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "HITC_Data/", type: "dir", role: "overwrite", badge: "วางทับตรงนี้" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },
};
