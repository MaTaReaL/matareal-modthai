# คู่มือขึ้นเว็บจริง (Deploy) & ทำ SEO ติด Google — MaTaReaL ม็อดไทย

## 1. อัปโหลดไฟล์ม็อดขึ้น GitHub Releases (หลัก) + Google Drive (สำรอง)
1. สร้าง Public Repository ชื่อ `matareal-modthai-releases` บน GitHub (ใช้สิทธิ์ GitHub Student Pack ได้เลย ฟรีและไม่จำกัดแบนด์วิดท์)
2. กด **Releases → Create a new release** ตั้ง Tag `vvp-v1.0` แล้วลากไฟล์ `VenusVacationPRISM_ThaiMod_v1.0.zip` (82 MB) ลงไปกด Publish
3. คัดลอกลิงก์ไฟล์ `.zip` จาก GitHub Release และลิงก์สำรองจาก Google Drive ไปใส่ใน `src/data/mods.ts` (หรือตั้งเป็น Environment Variable `VVP_GITHUB_RELEASE_URL` และ `VVP_GDRIVE_MIRROR_URL` บน Vercel)

## 2. ตั้งค่าฐานข้อมูลยอดดาวน์โหลดจริงฟรี (Upstash Redis)
1. สมัครฟรีที่ [upstash.com](https://upstash.com) (ล็อกอินด้วย GitHub ได้เลย)
2. กด **Create Database** → ตั้งชื่อ `matareal-modthai` → เลือก Region **Singapore (`ap-southeast-1`)**
3. คัดลอก `UPSTASH_REDIS_REST_URL` และ `UPSTASH_REDIS_REST_TOKEN` มาเตรียมใส่ใน Vercel

## 3. ตั้งค่าแจ้งบัคเข้า Discord (Discord Webhook)
1. เปิดห้อง Discord ที่ต้องการรับแจ้งบัค → กดเฟืองตั้งค่าห้อง (**Edit Channel**)
2. ไปที่ **Integrations → Webhooks → New Webhook** → ตั้งชื่อ `MaTaReaL Bug Bot` → กด **Copy Webhook URL**
3. นำไปใส่ในตัวแปร `DISCORD_WEBHOOK_URL` บน Vercel

## 4. Deploy ขึ้น Vercel (ฟรี + เร็วที่สุดสำหรับ Next.js & SEO)
1. Push โฟลเดอร์ `matareal-modthai` ขึ้น GitHub Repo ของคุณแมทธิว
2. ไปที่ [vercel.com](https://vercel.com) → **Add New Project** → เลือก Repo `matareal-modthai`
3. ใส่ Environment Variables ตามไฟล์ `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` = URL เว็บจริงของคุณ (เช่น `https://matareal-modthai.vercel.app` หรือโดเมนฟรีจาก GitHub Student Pack)
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `DISCORD_WEBHOOK_URL`
   - `GOOGLE_SITE_VERIFICATION` (ใส่หลังจากทำข้อ 5)
4. กด **Deploy** — ระบบจะตั้ง Region สิงคโปร์ (`sin1`) อัตโนมัติจาก `vercel.json` ทำให้โหลดไวมากในไทยและดึงราคา Steam ไทยได้ตรงเป๊ะ!

## 5. ส่งเว็บให้ Google เก็บข้อมูล (ติดคำค้น "Venus Vacation PRISM - DEAD OR ALIVE Xtreme ม็อดไทย")
1. เข้า [Google Search Console](https://search.google.com/search-console) → กด **Add Property** (URL prefix) → ใส่ URL เว็บจริง
2. เลือกวิธียืนยันแบบ **HTML tag** → ก๊อปเฉพาะข้อความใน `content="..."` ไปใส่ใน `GOOGLE_SITE_VERIFICATION` บน Vercel แล้วกด Redeploy
3. กลับมากด **Verify** → ไปที่เมนู **Sitemaps** → พิมพ์ `sitemap.xml` แล้วกด **Submit**
4. ไปที่ช่อง **URL Inspection** ด้านบนสุด → วางลิงก์หน้าม็อด `/mods/venus-vacation-prism-dead-or-alive-xtreme` → กด **Request Indexing** (ปกติจะเริ่มติด Google ภายใน 1–3 วัน)

## 6. โบนัส GitHub Student Pack (โดเมนฟรี 1 ปี!)
คุณแมทธิวมี **GitHub Student Developer Pack** อยู่แล้ว สามารถรับโดเมนฟรี 1 ปี (เช่น `.me` จาก Namecheap หรือ `.live` / `.games` จาก Name.com) แล้วนำมาผูกใน **Vercel → Settings → Domains** จะยิ่งช่วยให้ชื่อแบรนด์ `MaTaReaL ม็อดไทย` ดูโปรและติดอันดับ SEO เร็วขึ้นอีกมาก!
