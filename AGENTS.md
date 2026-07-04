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
│  ├─ profile.ts      ← ข้อความหน้าแรกทั้งหมด (hero, about, education, งาน, skills, email, LinkedIn)
│  └─ projects.ts     ← ข้อมูล case study ทั้ง 5 โปรเจกต์ ("หลังบ้าน")
├─ app/
│  ├─ page.tsx                 ← หน้าแรก (Home/About) — ประกอบ section จาก profile.ts
│  ├─ work/[slug]/page.tsx     ← หน้า case study (สร้าง static ทุก slug อัตโนมัติ + SEO metadata)
│  ├─ layout.tsx               ← ฟอนต์ Inter + ThemeProvider (dark mode)
│  └─ globals.css              ← design tokens (สี light/dark) + @font-face Aktiv Grotesk Thai
├─ components/
│  ├─ site-header.tsx / site-footer.tsx / theme-toggle.tsx / back-to-top.tsx
│  ├─ home/  → skills-grid.tsx, work-grid.tsx
│  ├─ case-study/ → case-study-view.tsx   ← 7 section ของ case study อยู่ไฟล์นี้ไฟล์เดียว
│  └─ ui/    → shadcn components (button, card, badge, separator)
public/
├─ uploads/   ← รูปงาน (profile.png, Home.jpg, ฯลฯ)
└─ fonts/     ← aktiv-grotesk-thai.woff2
```

**หลักการ:** เพิ่มงาน/แก้ข้อความ = แก้ที่ `data/*.ts` เท่านั้น โค้ด UI ไม่ต้องแตะ → ไฟล์ไม่บวมตามจำนวนโปรเจกต์

## วิธีเพิ่มโปรเจกต์ใหม่
1. วางรูปที่ `public/uploads/<ไฟล์>`
2. เพิ่ม entry ใน `projects` ที่ `src/data/projects.ts` (copy ของเดิมเป็นแม่แบบ ครบ 7-section)
3. หน้า `/work/<slug>` + การ์ดหน้าแรก + next/prev nav ถูกสร้างให้อัตโนมัติ

## Design tokens
- สี light/dark port 1:1 จาก DC เดิม อยู่ใน `globals.css` (`:root` / `.dark`)
- palette เป็น mono เจตนา — **user ไม่เอาสีน้ำเงินทุกที่** (`--primary` = `#1a1a18` light / `#f3f3f0` dark)
- ค่าพิเศษเดิม: `--faint`, `--hover` → ใช้เป็น `text-faint`, `bg-hover`
- ฟอนต์: Inter (ทั่วไป) · Aktiv Grotesk Thai (`font-thai`) ใช้ในหน้า case study
- case study ทั้งหน้า **font-weight 400** (ไม่ bold) hierarchy ด้วย size+color+letter-spacing

## ยังเป็น placeholder รอข้อมูลจริง
- `profile.ts`: email, LinkedIn, ชื่อใบรับรอง (Certification)
- `projects.ts`: ทุกค่าที่เป็น `[ ... ]` = metric จริงจาก GA4/Clarity, decision titles, liveUrl, heroImage ของ renthub/ai-copilot/brand/market-insight

## คำสั่ง
- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build (ตรวจ type + สร้าง static ทุกหน้า)
- deploy: push ขึ้น GitHub แล้วต่อ Vercel (auto-deploy ทุก push) หรือ `npx vercel`

## Library / icon
- ไอคอน: `lucide-react` (หมายเหตุ: lucide เอา brand icon อย่าง Figma/LinkedIn ออกแล้ว → ใช้ไอคอนทั่วไป หรือ inline SVG / ดึงจาก https://svgl.app)
- เพิ่ม shadcn component: `npx shadcn@latest add <name>`
