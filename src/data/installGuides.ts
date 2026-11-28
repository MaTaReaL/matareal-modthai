export interface InstallTreeNode {
  name: string;
  type: "dir" | "file";
  /**
   * "anchor" = existing game file/folder used as landmark (Sky blue)
   * "mod" = mod file/folder the player deploys here (Emerald green — always green)
   */
  role: "anchor" | "mod";
  badge?: string;
  note?: string;
}

export interface InstallGuidePlatform {
  platformLabel: string;
  howToOpen: string;
  rootFolderHint: string;
  /** Exact count of items to deploy (e.g. "1 โฟลเดอร์", "1 โฟลเดอร์ + 2 ไฟล์") */
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
    zipSourceHint: `แตกไฟล์ ZIP แล้วเปิดโฟลเดอร์ ${zipFolder}/`,
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ (Manage) → เปิดหาไฟล์ภายในเครื่อง (Browse local files)",
        rootFolderHint: `โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ ${exeName}`,
        dragSummary: "1 โฟลเดอร์ + 2 ไฟล์",
        dragItems: [
          { name: "ThaiMod/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
        ],
        tree: [
          { name: exeName, type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: dataFolder, type: "dir", role: "anchor", note: "โฟลเดอร์ต้นฉบับของเกม" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
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
  mergeNote = "วางรวมกับโฟลเดอร์เดิมของเกม (Merge)"
): ModInstallGuide {
  const treeNodes: InstallTreeNode[] = [
    ...(exeHint ? [{ name: exeHint, type: "file" as const, role: "anchor" as const, badge: "จุดสังเกต" }] : []),
    {
      name: "Engine/",
      type: "dir",
      role: "anchor",
      badge: exeHint ? undefined : "จุดสังเกต",
      note: "โฟลเดอร์ต้นฉบับของเกม",
    },
    { name: `${modFolder}/`, type: "dir", role: "mod", badge: "ติดตั้งที่นี่", note: mergeNote },
  ];

  const dragItems = [{ name: `${modFolder}/`, type: "dir" as const }];

  const platforms: InstallGuidePlatform[] = [
    {
      platformLabel: "Steam (PC)",
      howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
      rootFolderHint: `โฟลเดอร์หลักของเกม — มีโฟลเดอร์ ${modFolder}/ อยู่ภายใน`,
      dragSummary: "1 โฟลเดอร์",
      dragItems,
      tree: treeNodes,
    },
  ];

  if (hasXbox) {
    platforms.push({
      platformLabel: "Xbox / Game Pass (PC)",
      howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
      rootFolderHint: `โฟลเดอร์ Content/ — มีโฟลเดอร์ ${modFolder}/ อยู่ภายใน`,
      dragSummary: "1 โฟลเดอร์",
      dragItems,
      tree: treeNodes,
    });
  }

  return { zipSourceHint, platforms };
}

export const INSTALL_GUIDES: Record<string, ModInstallGuide> = {
  "sea-of-solitude": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเปิดโฟลเดอร์ SOS_ThaiMod/",
    platforms: [
      {
        platformLabel: "Steam / EA App (PC)",
        howToOpen:
          "Steam: คลิกขวาเกม → จัดการ → เปิดหาไฟล์ภายในเครื่อง | EA App: จัดการ → ดูคุณสมบัติ → เปิดโฟลเดอร์",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ SeaOfSolitude.exe",
        dragSummary: "1 โฟลเดอร์",
        dragItems: [{ name: "SeaOfSolitude_Data/", type: "dir" }],
        tree: [
          { name: "SeaOfSolitude.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "SeaOfSolitude_Data/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "วางทับโฟลเดอร์เดิมและยืนยันการแทนที่ไฟล์ทั้งหมด",
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
    zipSourceHint: "แตกไฟล์ ZIP แล้วเลือกโฟลเดอร์ archive/ และ fdata_package/ (ข้ามไฟล์ README)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ VVPrism.exe",
        dragSummary: "2 โฟลเดอร์",
        dragItems: [
          { name: "archive/", type: "dir" },
          { name: "fdata_package/", type: "dir" },
        ],
        tree: [
          { name: "VVPrism.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "archive/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "ยืนยันการวางทับไฟล์เดิม",
          },
          {
            name: "fdata_package/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "ยืนยันการวางทับไฟล์เดิม",
          },
        ],
      },
    ],
  },

  outbound: {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเลือก 2 โฟลเดอร์ และ 3 ไฟล์ข้างล่างนี้ (ข้ามไฟล์ README_TH.txt)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ Outbound.exe",
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
          { name: "Outbound_Data/", type: "dir", role: "anchor", note: "โฟลเดอร์ต้นฉบับของเกม" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ — ตำแหน่งเดียวกับ Outbound.exe",
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
          { name: "BepInEx/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
        ],
      },
    ],
  },

  "farm-and-feast": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเปิดโฟลเดอร์ Mod_Files/ เพื่อคัดลอกไฟล์ทั้งหมดภายใน",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกม Farm & Feast ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ Farm & Feast.exe",
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
          { name: "Farm & Feast_Data/", type: "dir", role: "anchor", note: "โฟลเดอร์ต้นฉบับของเกม" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: ".doorstop_version", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
        ],
      },
    ],
  },

  "control-im-not-coming-back": {
    zipSourceHint: "แตกไฟล์ ZIP แล้วเลือก 1 โฟลเดอร์ และ 2 ไฟล์ข้างล่างนี้ (ข้ามไฟล์ README_TH.txt)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับไฟล์ .exe เปิดเกม",
        dragSummary: "1 โฟลเดอร์ + 2 ไฟล์",
        dragItems: [
          { name: "ThaiMod/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
        ],
        tree: [
          { name: "Control, I'm Not Coming Back.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
        ],
      },
    ],
  },

  routine: makeSingleFolderMergeGuide(
    "Routine",
    "แตกไฟล์ ZIP แล้วเลือกโฟลเดอร์ Routine/ (ข้ามไฟล์ README)",
    "Routine.exe",
    true
  ),
  denshattack: makeSingleFolderMergeGuide(
    "Denshattack_Proto",
    "แตกไฟล์ ZIP แล้วเลือกโฟลเดอร์ Denshattack_Proto/ (ข้ามไฟล์ README)",
    "Denshattack.exe",
    true
  ),
  aphelion: makeSingleFolderMergeGuide(
    "PIO",
    "แตกไฟล์ ZIP แล้วเลือกโฟลเดอร์ PIO/ (ข้ามไฟล์ README)",
    "",
    true
  ),
  "terrible-lizards": makeSingleFolderMergeGuide(
    "terrible_lizards",
    "แตกไฟล์ ZIP → เปิดโฟลเดอร์ TerribleLizards_Thai_P/ → เลือกโฟลเดอร์ terrible_lizards/",
    "",
    true
  ),
  "gori-cuddly-carnage": makeSingleFolderMergeGuide(
    "GoriCuddlyCarnage",
    "แตกไฟล์ ZIP แล้วเลือกโฟลเดอร์ GoriCuddlyCarnage/ (ข้ามไฟล์ README)",
    "Gori_Cuddly_Carnage.exe",
    false
  ),
  "paw-patrol-dino-world": {
    zipSourceHint: "เลือกดาวน์โหลดให้ตรงแพลตฟอร์ม → แตกไฟล์ ZIP แล้วเลือกโฟลเดอร์ PDW/",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม — มีโฟลเดอร์ Engine/ และ PDW/ อยู่ภายใน",
        dragSummary: "1 โฟลเดอร์",
        dragItems: [{ name: "PDW/", type: "dir" }],
        tree: [
          { name: "Engine/", type: "dir", role: "anchor", badge: "จุดสังเกต", note: "โฟลเดอร์ต้นฉบับของเกม" },
          {
            name: "PDW/",
            type: "dir",
            role: "mod",
            badge: "ติดตั้งที่นี่",
            note: "วางรวมกับโฟลเดอร์เดิม (Merge)",
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ — มีโฟลเดอร์ Engine/ และ PDW/ อยู่ภายใน",
        dragSummary: "1 โฟลเดอร์",
        dragItems: [{ name: "PDW/", type: "dir" }],
        tree: [
          { name: "Engine/", type: "dir", role: "anchor", badge: "จุดสังเกต", note: "โฟลเดอร์ต้นฉบับของเกม" },
          {
            name: "PDW/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "ยืนยันวางทับ PDW-WinGDK.pak (แนะนำสำรองไฟล์เดิมก่อน)",
          },
        ],
      },
    ],
  },

  "forza-horizon-6": {
    zipSourceHint: "แบบตัวติดตั้ง: เปิด FH6_ThaiMod_Setup.exe | แบบวางไฟล์เอง: แตกไฟล์แล้วเลือกโฟลเดอร์ media/",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวา Forza Horizon 6 ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ ForzaHorizon6.exe",
        dragSummary: "1 โฟลเดอร์ • รองรับตัวติดตั้ง",
        dragItems: [{ name: "media/", type: "dir" }],
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "media/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "วางรวมกับโฟลเดอร์เดิมและยืนยันการแทนที่ไฟล์",
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ — ตำแหน่งเดียวกับ ForzaHorizon6.exe",
        dragSummary: "1 โฟลเดอร์ • รองรับตัวติดตั้ง",
        dragItems: [{ name: "media/", type: "dir" }],
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "media/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "วางรวมกับโฟลเดอร์เดิมและยืนยันการแทนที่ไฟล์",
          },
        ],
      },
    ],
  },

  "hope-in-the-city": {
    zipSourceHint: "แตกไฟล์ ZIP → เปิดโฟลเดอร์ HopeInTheCity_ThaiMod/ → เลือก 2 โฟลเดอร์ และ 2 ไฟล์ (ข้าม README)",
    platforms: [
      {
        platformLabel: "Steam / Xbox Game Pass (PC)",
        howToOpen:
          "Steam: จัดการ → เปิดหาไฟล์ภายในเครื่อง | Xbox: จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์หลักของเกม — ตำแหน่งเดียวกับ HITC.exe",
        dragSummary: "2 โฟลเดอร์ + 2 ไฟล์",
        dragItems: [
          { name: "HITC_Data/", type: "dir" },
          { name: "ThaiMod/", type: "dir" },
          { name: "winhttp.dll", type: "file" },
          { name: "doorstop_config.ini", type: "file" },
        ],
        tree: [
          { name: "HITC.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "HITC_Data/",
            type: "dir",
            role: "mod",
            badge: "วางทับ / รวมที่นี่",
            note: "ยืนยันการวางรวมและแทนที่ไฟล์",
          },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "ติดตั้งที่นี่" },
        ],
      },
    ],
  },

  "super-meat-boy-3d": makeSingleFolderMergeGuide(
    "SMB",
    "แตกไฟล์ ZIP → เปิดโฟลเดอร์ SMB3D_ThaiMod/ (ข้าม README.txt และ OFL_FONT_LICENSE.txt)",
    "",
    true
  ),
};
