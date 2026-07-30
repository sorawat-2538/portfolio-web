# ย้ายมาทำต่อบน PC (Windows) — เปิดไฟล์นี้ก่อน

พอร์ตโฟลิโอนี้เป็น **Next.js 16** repo มาตรฐาน — ย้ายเครื่องแล้วรันต่อได้เลย ทำตามนี้:

## 1. ติดตั้งบน PC (ครั้งเดียว)

1. **Git for Windows** — https://git-scm.com/download/win
   (มี Git Credential Manager ในตัว → clone ผ่าน HTTPS แล้ว login ผ่าน browser ได้เลย ไม่ต้องตั้ง SSH key)
2. **Node.js LTS 20 หรือ 22** — https://nodejs.org
   (Next 16 ต้องการ Node ≥ 18.18)
3. **VS Code** (+ ส่วนขยาย Claude Code ถ้าจะใช้ต่อ)

## 2. ดึงโปรเจกต์มา

```bash
git clone https://github.com/sorawat-2538/portfolio-web.git
cd portfolio-web
npm install
npm run dev
```

เปิด http://localhost:3000 — เสร็จ ✅
(ครั้งแรกที่ push จาก PC จะมี popup ให้ login GitHub ผ่าน browser)

> ไม่มีไฟล์ `.env` / secret ที่ต้องขนมา — เว็บรันจาก repo ได้เลย

## 3. คำสั่งประจำ

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | dev server (localhost:3000) |
| `npm run build` | production build (เช็ค type + สร้างทุกหน้า) |
| `git add -A && git commit -m "..."` แล้ว `git push` | ขึ้นเว็บ (Vercel auto-deploy ทุก push main) |

## 4. จุดที่ต่างจาก Mac

- **resize รูป:** เดิมใช้ `sips` (Mac only) — บน Windows ใช้ [Squoosh (เว็บ)](https://squoosh.app) หรือ `npm i -g sharp-cli` แทน
- **line ending:** มี `.gitattributes` คุมเป็น LF แล้ว ไม่ต้องทำอะไรเพิ่ม
- deploy เหมือนเดิมทุกอย่าง (push → Vercel)

## 5. แก้อะไรที่ไหน (ย่อ)

- เนื้อหา/เพิ่มงาน → `src/data/*.ts` (profile, projects, nav, tools)
- รูป → `public/uploads/`
- รายละเอียดโครงสร้างเต็ม → อ่าน **`AGENTS.md`** (= `CLAUDE.md`) ในโปรเจกต์

---

## ⚠️ อย่าลืม back up จาก Mac ก่อนคืนเครื่อง (ของพวกนี้ไม่ได้อยู่ใน repo)

- [ ] ไฟล์ **`.fig`** บน Desktop (`Propertyhub.fig`, `Renthub.fig`, `PropertyOS.fig`, …) — เช็คว่าอยู่ใน Figma cloud (account ตัวเอง) หรือก็อปลง external/personal cloud
- [ ] ไฟล์ brief: `design-brief-returning-visitors.md`, `portfolio-page-pattern.md`, zip ต่าง ๆ
- [ ] เช็ค **Figma account** ว่าเป็นของตัวเอง ไม่ใช่ของบริษัท (กันโดนตัด access)
- [ ] screenshot ต้นฉบับที่ยังไม่ได้ใช้ (ที่ใช้แล้วก็อปเข้า `public/uploads/` + push แล้ว = ปลอดภัย)
