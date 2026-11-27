export interface InstallTreeNode {
  name: string;
  type: "dir" | "file";
  /**
   * "anchor" = existing game file/folder used as landmark
   * "mod" = new mod file/folder to place here
   * "overwrite" = mod folder/file that merges/overwrites existing one
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
  tree: InstallTreeNode[];
}

export interface ModInstallGuide {
  /** Which folder inside the downloaded ZIP contains the actual mod files */
  zipSourceHint: string;
  /** Short 1-line summary shown at top of modal */
  summary: string;
  platforms: InstallGuidePlatform[];
}

function makeFtfGuide(
  epTitle: string,
  zipFolder: string,
  exeName: string,
  dataFolder: string
): ModInstallGuide {
  return {
    zipSourceHint: `เปิดเข้าโฟลเดอร์ ${zipFolder}/ ในไฟล์ ZIP`,
    summary: `นำไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod ไปวางที่หน้าโฟลเดอร์หลักของเกม ${epTitle}`,
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ (Manage) → เปิดหาไฟล์ภายในเครื่อง (Browse local files)",
        rootFolderHint: `โฟลเดอร์หลักของเกม (ที่มี ${exeName})`,
        tree: [
          { name: exeName, type: "file", role: "anchor", badge: "จุดสังเกต", note: "ไฟล์เปิดเกมหลัก" },
          { name: dataFolder, type: "dir", role: "anchor", note: "โฟลเดอร์ข้อมูลเกมเดิม" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  };
}

function makeUe5ModsGuide(
  rootGameFolderName: string,
  pakPrefix: string,
  exeHint: string,
  hasXbox = true,
  steamName = ""
): ModInstallGuide {
  const treeNodes: InstallTreeNode[] = [
    { name: "Engine/", type: "dir", role: "anchor", note: "โฟลเดอร์เอนจินเกมเดิม" },
    ...(exeHint ? [{ name: exeHint, type: "file" as const, role: "anchor" as const, badge: "จุดสังเกต" }] : []),
    {
      name: `${rootGameFolderName}/`,
      type: "dir",
      role: "overwrite",
      badge: "วางทับ / รวมโฟลเดอร์",
      children: [
        {
          name: "Content/",
          type: "dir",
          role: "parent",
          children: [
            {
              name: "Paks/",
              type: "dir",
              role: "parent",
              children: [
                {
                  name: "~mods/",
                  type: "dir",
                  role: "mod",
                  badge: "ไฟล์ม็อดอยู่ตรงนี้",
                  children: [
                    { name: `${pakPrefix}.pak`, type: "file", role: "mod", badge: "ม็อด" },
                    { name: `${pakPrefix}.utoc`, type: "file", role: "mod", badge: "ม็อด" },
                    { name: `${pakPrefix}.ucas`, type: "file", role: "mod", badge: "ม็อด" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const platforms: InstallGuidePlatform[] = [
    {
      platformLabel: "Steam (PC)",
      howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
      rootFolderHint: `โฟลเดอร์หลักของเกม${steamName ? ` (${steamName})` : ""} ที่มีโฟลเดอร์ Engine/ และ ${rootGameFolderName}/`,
      tree: treeNodes,
    },
  ];

  if (hasXbox) {
    platforms.push({
      platformLabel: "Xbox / Game Pass (PC)",
      howToOpen: "เปิดแอป Xbox → คลิกจุดสามจุด (...) ที่เกม → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
      rootFolderHint: `โฟลเดอร์ Content/ (ที่มีโฟลเดอร์ Engine/ และ ${rootGameFolderName}/)`,
      tree: treeNodes,
    });
  }

  return {
    zipSourceHint: `ลากโฟลเดอร์ ${rootGameFolderName}/ จากในไฟล์ ZIP`,
    summary: `นำโฟลเดอร์ ${rootGameFolderName}/ ไปวางรวมที่โฟลเดอร์หลักของเกม (เมื่อระบบถามให้กดรวมโฟลเดอร์ / Merge)`,
    platforms,
  };
}

export const INSTALL_GUIDES: Record<string, ModInstallGuide> = {
  "sea-of-solitude": {
    zipSourceHint: "เปิดเข้าโฟลเดอร์ SOS_ThaiMod/ ในไฟล์ ZIP",
    summary: "นำโฟลเดอร์ SeaOfSolitude_Data/ ไปวางทับในโฟลเดอร์หลักของตัวเกม (กดยืนยันวางทับทั้งหมด)",
    platforms: [
      {
        platformLabel: "Steam / EA App (PC)",
        howToOpen: "Steam: คลิกขวาเกม → จัดการ → เปิดหาไฟล์ภายในเครื่อง | EA App: จัดการ → ดูคุณสมบัติ → เปิดโฟลเดอร์",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี SeaOfSolitude.exe)",
        tree: [
          { name: "SeaOfSolitude.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "SeaOfSolitude_Data/",
            type: "dir",
            role: "overwrite",
            badge: "วางทับตรงนี้",
            note: "กดยืนยันแทนที่ไฟล์ข้างในทั้งหมด",
            children: [
              { name: "level0, level1, level15, sharedassets*.assets", type: "file", role: "mod", badge: "ม็อด" },
              {
                name: "StreamingAssets/localization/",
                type: "dir",
                role: "parent",
                children: [{ name: "localization_bundle.unity3d", type: "file", role: "mod", badge: "ม็อด" }],
              },
            ],
          },
        ],
      },
    ],
  },

  "fears-to-fathom-home-alone": makeFtfGuide(
    "Home Alone (EP1)",
    "ThaiMod_EP1",
    "Fears To Fathom.exe",
    "Fears To Fathom_Data/"
  ),
  "fears-to-fathom-norwood-hitchhike": makeFtfGuide(
    "Norwood Hitchhike (EP2)",
    "ThaiMod_EP2",
    "Fears To Fathom - Norwood Hitchhike.exe",
    "Fears To Fathom - Norwood Hitchhike_Data/"
  ),
  "fears-to-fathom-carson-house": makeFtfGuide(
    "Carson House (EP3)",
    "ThaiMod_EP3",
    "Fears To Fathom - Carson House.exe",
    "Fears To Fathom - Carson House_Data/"
  ),
  "fears-to-fathom-ironbark-lookout": makeFtfGuide(
    "Ironbark Lookout (EP4)",
    "ThaiMod_EP4",
    "Fears to Fathom - Ironbark Lookout.exe",
    "Fears to Fathom - Ironbark Lookout_Data/"
  ),
  "fears-to-fathom-woodbury-getaway": makeFtfGuide(
    "Woodbury Getaway (EP5)",
    "ThaiMod_EP5",
    "Fears to Fathom - Woodbury Getaway.exe",
    "Fears to Fathom - Woodbury Getaway_Data/"
  ),
  "fears-to-fathom-scratch-creek": makeFtfGuide(
    "Scratch Creek",
    "ThaiMod_ScratchCreek",
    "Fears to Fathom - Scratch Creek.exe",
    "Fears to Fathom - Scratch Creek_Data/"
  ),

  "venus-vacation-prism-dead-or-alive-xtreme": {
    zipSourceHint: "แตกไฟล์ VenusVacationPRISM_ThaiMod_v1.0.zip จะได้ 2 โฟลเดอร์",
    summary: "นำโฟลเดอร์ archive/ และ fdata_package/ ไปวางทับที่โฟลเดอร์หลักของตัวเกม (แทนที่ครบ 4 ไฟล์)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มีไฟล์เปิดเกมหลักและโฟลเดอร์ archive/)",
        tree: [
          { name: "VVPrism.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "archive/",
            type: "dir",
            role: "overwrite",
            badge: "วางทับตรงนี้",
            children: [
              { name: "archive_05.lnk", type: "file", role: "mod", badge: "ทับไฟล์เดิม" },
              { name: "load_inf_05.bin", type: "file", role: "mod", badge: "ทับไฟล์เดิม" },
            ],
          },
          {
            name: "fdata_package/",
            type: "dir",
            role: "overwrite",
            badge: "วางทับตรงนี้",
            children: [
              { name: "0x35d8ee56.fdata", type: "file", role: "mod", badge: "ทับไฟล์เดิม" },
              { name: "root.rdb", type: "file", role: "mod", badge: "ทับไฟล์เดิม" },
            ],
          },
        ],
      },
    ],
  },

  outbound: {
    zipSourceHint: "แตกไฟล์ Outbound_Thai_Mod_v1.0.zip แล้วนำไฟล์ทั้งหมดข้างในไปวาง",
    summary: "วางไฟล์ winhttp.dll, doorstop_config.ini และโฟลเดอร์ BepInEx/, dotnet/ ที่หน้าโฟลเดอร์หลักของเกม (ไม่ทับไฟล์เกมเดิม)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Outbound.exe)",
        tree: [
          { name: "Outbound.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Outbound_Data/", type: "dir", role: "anchor" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มี gamelaunchhelper.exe และ Outbound.exe)",
        tree: [
          { name: "gamelaunchhelper.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Outbound.exe", type: "file", role: "anchor" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },

  "farm-and-feast": {
    zipSourceHint: "เปิดเข้าโฟลเดอร์ Mod_Files/ ในไฟล์ ZIP แล้วคัดลอกทั้งหมดข้างใน",
    summary: "วางไฟล์ทั้งหมดจาก Mod_Files/ ลงหน้าโฟลเดอร์หลักของเกมที่มี Farm & Feast.exe (ไม่ทับไฟล์เกมเดิม)",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกม Farm & Feast ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี Farm & Feast.exe)",
        tree: [
          { name: "Farm & Feast.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "Farm & Feast_Data/", type: "dir", role: "anchor" },
          { name: "BepInEx/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "dotnet/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },

  "control-im-not-coming-back": {
    zipSourceHint: "แตกไฟล์ Control_ImNotComingBack_ThaiMod_v1.0.zip",
    summary: "วาง winhttp.dll, doorstop_config.ini และโฟลเดอร์ ThaiMod/ ลงหน้าโฟลเดอร์หลักของตัวเกม",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มีไฟล์ .exe ของตัวเกม)",
        tree: [
          { name: "Control, I'm Not Coming Back.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          { name: "ThaiMod/", type: "dir", role: "mod", badge: "วางตรงนี้" },
          { name: "winhttp.dll", type: "file", role: "mod", badge: "วางตรงนี้" },
          { name: "doorstop_config.ini", type: "file", role: "mod", badge: "วางตรงนี้" },
        ],
      },
    ],
  },

  routine: makeUe5ModsGuide("Routine", "Routine_TH_FontSplit_P", "Routine.exe", true, "ROUTINE"),
  denshattack: makeUe5ModsGuide("Denshattack_Proto", "pakchunk99-DenshattackThai_P", "Denshattack.exe", true, "Denshattack!"),
  aphelion: makeUe5ModsGuide("PIO", "pakchunk99-AphelionThai_P", "", true, "Aphelion"),
  "terrible-lizards": makeUe5ModsGuide("terrible_lizards", "TerribleLizards_Thai_P", "", true, "Terrible Lizards"),
  "gori-cuddly-carnage": makeUe5ModsGuide("GoriCuddlyCarnage", "Gori_Thai_P", "Gori_Cuddly_Carnage.exe", false, "Gori Cuddly Carnage"),

  "paw-patrol-dino-world": {
    zipSourceHint: "เลือกโหลดไฟล์ให้ตรงแพลตฟอร์ม (Steam หรือ Xbox Game Pass)",
    summary: "เวอร์ชัน Steam วางในโฟลเดอร์ ~mods | เวอร์ชัน Xbox Game Pass วางทับ PDW-WinGDK.pak ใน Paks/",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวาที่เกมใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "เข้าไปที่ PDW/Content/Paks/~mods/ (สร้างโฟลเดอร์ ~mods เองหากยังไม่มี)",
        tree: [
          {
            name: "PDW/",
            type: "dir",
            role: "anchor",
            children: [
              {
                name: "Content/Paks/",
                type: "dir",
                role: "parent",
                children: [
                  { name: "PDW-Windows.pak", type: "file", role: "anchor", badge: "จุดสังเกต" },
                  {
                    name: "~mods/",
                    type: "dir",
                    role: "mod",
                    badge: "สร้างโฟลเดอร์นี้",
                    children: [{ name: "PDW_Thai_P.pak", type: "file", role: "mod", badge: "วางตรงนี้" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → Content → PDW → Content → Paks",
        rootFolderHint: "สำรอง PDW-WinGDK.pak เดิมไว้ก่อน แล้ววางทับไฟล์ใหม่",
        tree: [
          {
            name: "Content/PDW/Content/Paks/",
            type: "dir",
            role: "parent",
            children: [
              { name: "PDW-WinGDK.pak", type: "file", role: "overwrite", badge: "วางทับไฟล์เดิม", note: "สำรองไฟล์เดิมเก็บไว้ก่อน" },
            ],
          },
        ],
      },
    ],
  },

  "forza-horizon-6": {
    zipSourceHint: "แนะนำใช้ตัวติดตั้งอัตโนมัติ (FH6_ThaiMod_Setup.exe) หรือแบบลากวางโฟลเดอร์ media/",
    summary: "แบบตัวติดตั้ง: เปิด FH6_ThaiMod_Setup.exe แล้วเลือกโฟลเดอร์เกม | แบบลากวาง: นำโฟลเดอร์ media/ ไปวางทับในโฟลเดอร์หลักของเกม",
    platforms: [
      {
        platformLabel: "Steam (PC)",
        howToOpen: "คลิกขวา Forza Horizon 6 ใน Steam → จัดการ → เปิดหาไฟล์ภายในเครื่อง",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี ForzaHorizon6.exe และโฟลเดอร์ media/)",
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "media/",
            type: "dir",
            role: "overwrite",
            badge: "วางทับตรงนี้",
            children: [
              { name: "EN.zip, Fonts.zip", type: "file", role: "mod", badge: "ม็อด" },
              { name: "stripped/stringtables/EN.zip", type: "file", role: "mod", badge: "ม็อด" },
              { name: "ui/Fonts.zip & textures/...", type: "file", role: "mod", badge: "ม็อด" },
            ],
          },
        ],
      },
      {
        platformLabel: "Xbox / Game Pass (PC)",
        howToOpen: "เปิดแอป Xbox → จุดสามจุด (...) → จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์ Content/ (ที่มีโฟลเดอร์ media/)",
        tree: [
          { name: "ForzaHorizon6.exe", type: "file", role: "anchor", badge: "จุดสังเกต" },
          {
            name: "media/",
            type: "dir",
            role: "overwrite",
            badge: "วางทับตรงนี้",
            note: "หรือให้ FH6_ThaiMod_Setup.exe ติดตั้งให้อัตโนมัติ",
          },
        ],
      },
    ],
  },

  "hope-in-the-city": {
    zipSourceHint: "แตกไฟล์ HopeInTheCity_ThaiMod.zip (ไม่ต้องลากไฟล์ README)",
    summary: "นำ winhttp.dll, doorstop_config.ini, โฟลเดอร์ ThaiMod/ และ HITC_Data/ ไปวางทับที่โฟลเดอร์หลักของเกม",
    platforms: [
      {
        platformLabel: "Steam / Xbox Game Pass (PC)",
        howToOpen: "Steam: จัดการ → เปิดหาไฟล์ภายในเครื่อง | Xbox: จัดการ → ไฟล์ → เรียกดู → เข้าโฟลเดอร์ Content",
        rootFolderHint: "โฟลเดอร์หลักของเกม (ที่มี HITC.exe และ HITC_Data/)",
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
