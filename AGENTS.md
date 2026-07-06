<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio (S.Tunaram) — Project Context

Next.js portfolio ของ product designer แปลงมาจาก Claude Design DC (`../Portfolio/Portfolio - Home.dc.html` เก็บไว้เป็นภาพอ้างอิงดีไซน์เดิม)

Stack สากล: **Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui + lucide-react** · deploy บน Vercel

เจ้าของงานเป็น **designer** ทำงานด้วยการ **prompt** ไม่ได้เขียน/ดีบั๊กโค้ดเอง → เวลาช่วยงานให้จบ error เองทั้งหมด อธิบายเป็นภาษาคน

---

## โครงสร้าง (แก้ที่ไหน)

```
src/
├─ data/
│  ├─ profile.ts   ← เนื้อหาหน้าแรกทั้งหมด: hero, aboutSummary, headline, stats,
│  │                 certifications, education, employment, skillGroups(3 กลุ่ม), contact
│  ├─ projects.ts  ← ข้อมูล case study 5 โปรเจกต์ (มี screens[] ต่อโปรเจกต์)
│  ├─ nav.ts       ← โฟลเดอร์เมนู sidebar (จัดกลุ่มโปรเจกต์)
│  └─ tools.ts     ← โลโก้/แบดจ์เครื่องมือในหน้า case study
├─ app/
│  ├─ page.tsx              ← หน้าแรก — ประกอบ section: hero, AboutMe, Education,
│  │                          Employment, SkillsGrid, SkillsConstellation, ContactMe
│  ├─ work/[slug]/page.tsx  ← case study (static ทุก slug + SEO metadata)
│  ├─ layout.tsx            ← Inter + SidebarProvider + shell (header/sidebar/footer). ⚠️ ไม่มี dark mode แล้ว
│  └─ globals.css           ← design tokens + @font-face Aktiv Grotesk Thai + keyframes (orbit, reveal)
├─ components/
│  ├─ site-header.tsx (มี avatar วงกลม) / site-footer.tsx / back-to-top.tsx / reveal.tsx
│  ├─ sidebar/ → site-sidebar.tsx (accordion + mobile drawer), sidebar-context.tsx, menu-button.tsx
│  ├─ home/  → about-me.tsx, skills-grid.tsx, skills-constellation.tsx, contact-me.tsx, work-grid.tsx*
│  └─ case-study/ → case-study-view.tsx (7 section), screen-gallery.tsx (thumbnail+lightbox)
public/  uploads/ (รูปงาน) · fonts/ (aktiv-grotesk-thai.woff2)
```
*work-grid.tsx ยังมีอยู่แต่ไม่ได้ใช้ (เอา Selected Work ออกจากหน้าแรกแล้ว เพราะซ้ำ sidebar) — โปรเจกต์เข้าถึงผ่าน sidebar

**หลักการ:** แก้ข้อความ/เพิ่มงาน = แก้ `data/*.ts` เท่านั้น UI ไม่ต้องแตะ

## วิธีเพิ่มโปรเจกต์ใหม่
1. วางรูปที่ `public/uploads/` 2. เพิ่ม entry ใน `projects.ts` + `nav.ts` 3. หน้า `/work/<slug>` สร้างอัตโนมัติ
- หลายจอต่อโปรเจกต์: ใส่ `screens: [{label, src}]` → โชว์เป็น gallery คลิกดูเต็มจอ (lightbox)

## Design / tokens (globals.css :root)
- **ไม่มี dark mode แล้ว** (เอา next-themes/ThemeProvider ออก) — light อย่างเดียว (บล็อก `.dark` ใน css เป็น dead code)
- **title = `#1a1a1a`** (`--foreground`) · **body/รอง = `#434e62`** slate (`--muted-foreground`) · `--faint`, `--hover`
- palette mono — **user ไม่เอาสีน้ำเงิน** (ยกเว้น slate body ที่ user สั่งเอง) · **`--radius: 0.5rem`** (cap ที่ rounded-xl)
- ฟอนต์: **Inter** ทั่วเว็บ (`--font-sans` = Inter + Aktiv Grotesk Thai fallback → ไทยเรนเดอร์ทุกเครื่อง)
- **หัวข้อทุกอันเป็นอังกฤษ + สไตล์เดียวกัน** (ดู [[portfolio-title-standard]]) — home ใช้ `SectionHeading`, case study ใช้ `H2`
- animation: `<Reveal>` (fade+rise ตอน scroll เข้า, respect reduced-motion) · constellation หมุนด้วย CSS

## Deploy / สถานะ
- live: https://portfolio-web-sigma-tan.vercel.app · GitHub: `sorawat-2538/portfolio-web` (auto-deploy ทุก push main)
- push จากเครื่องนี้ผ่าน SSH alias `github-personal` (ดู memory) — เครื่องนี้จะคืนออฟฟิศ
- ⚠️ งานหลายรอบยังอยู่แค่ localhost ยังไม่ push (user review บน localhost ก่อนแล้วค่อยสั่ง "ขึ้นเว็บ")

## ยังเป็น placeholder รอข้อมูลจริง
- `profile.ts`: phone, LinkedIn, resumeUrl, certifications (ชื่อจริง), avatar (ยัง pixel art — รอรูปถ่ายจริง)
- `projects.ts`: metric `[ ... ]` จาก GA4/Clarity, decision titles, heroImage/screens ของ renthub/ai-copilot/brand/market-insight (propertyhub มี Home.jpg + liveUrl จริงแล้ว)

## คำสั่ง
- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build (ตรวจ type + สร้าง static ทุกหน้า)
- deploy: push ขึ้น GitHub แล้วต่อ Vercel (auto-deploy ทุก push) หรือ `npx vercel`

## Library / icon
- ไอคอน: `lucide-react` (หมายเหตุ: lucide เอา brand icon อย่าง Figma/LinkedIn ออกแล้ว → ใช้ไอคอนทั่วไป หรือ inline SVG / ดึงจาก https://svgl.app)
- เพิ่ม shadcn component: `npx shadcn@latest add <name>`
