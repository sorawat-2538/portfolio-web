// ตรวจว่า path รูปทุกอันที่โค้ดอ้างถึง มีไฟล์จริงและ "ตัวพิมพ์ตรงกันเป๊ะ"
//
// ทำไมต้องมี: Windows ไม่แยกตัวพิมพ์เล็ก/ใหญ่ในชื่อไฟล์ แต่ Vercel รันบน Linux ที่แยก
// 17 ส.ค. 2026 เคยแทนที่คำว่า "RentHub" เป็น "Renthub" ทั้งไฟล์ แล้วไปโดนชื่อไฟล์รูปด้วย
// ในเครื่องยังขึ้นปกติทุกอย่าง แต่พอขึ้นเว็บจริงรูปกลายเป็น 404 — สคริปต์นี้กันไม่ให้เกิดซ้ำ
//
// รันเองด้วย `npm run check:images` · และถูกเรียกอัตโนมัติก่อน `npm run build` (prebuild)

import fs from "node:fs";
import path from "node:path";

const SRC = "src";
const PUBLIC = "public";

/** ไล่เก็บไฟล์ในโฟลเดอร์แบบ recursive */
function walk(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, onFile);
    else onFile(p);
  }
}

// path รูปทั้งหมดที่ถูกอ้างในโค้ด (เฉพาะที่เขียนเป็น string ตรง ๆ)
const refs = new Map(); // path → ไฟล์ต้นทางที่อ้างถึง
walk(SRC, (file) => {
  if (!/\.(ts|tsx)$/.test(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(/"(\/(?:uploads|demos)\/[^"]+\.[A-Za-z0-9]+)"/g)) {
    if (!refs.has(m[1])) refs.set(m[1], file);
  }
});

// ไฟล์จริงใน public/ (เก็บชื่อตามตัวพิมพ์จริง)
const real = new Set();
walk(PUBLIC, (file) => {
  real.add("/" + path.relative(PUBLIC, file).split(path.sep).join("/"));
});
const lower = new Map([...real].map((r) => [r.toLowerCase(), r]));

const problems = [];
for (const [ref, from] of refs) {
  if (real.has(ref)) continue;
  const near = lower.get(ref.toLowerCase());
  problems.push({ ref, from, near });
}

if (problems.length === 0) {
  console.log(`✓ ตรวจ path รูป ${refs.size} รายการ ตรงกับไฟล์จริงทั้งหมด`);
  process.exit(0);
}

console.error(`\n✗ path รูป ${problems.length} รายการไม่ตรงกับไฟล์จริง:\n`);
for (const { ref, from, near } of problems) {
  console.error(`  ${ref}`);
  console.error(`    อ้างจาก : ${from}`);
  console.error(
    near
      ? `    ไฟล์จริง: ${near}  ← ตัวพิมพ์ไม่ตรง (Windows ผ่าน แต่ Vercel จะ 404)`
      : `    ไฟล์จริง: ไม่มีไฟล์นี้ใน public/`,
  );
  console.error("");
}
process.exit(1);
