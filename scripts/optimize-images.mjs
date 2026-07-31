// ────────────────────────────────────────────────────────────────────────────
// OPTIMIZE IMAGES — บีบอัดรูปใน public/uploads ใหม่ "โดยไม่ลดพิกเซล"
//
// แทนคำสั่ง `sips` เดิมที่ใช้ได้เฉพาะบน Mac (ดู MIGRATION.md)
// ขนาดภาพ (กว้าง x สูง) เท่าเดิมทุกประการ — เปลี่ยนแค่วิธีเข้ารหัสไฟล์ให้เล็กลง
//
//   npm run img:test    ลองบีบอัดหลายระดับคุณภาพ ดูผลก่อน (ไม่แตะไฟล์จริง)
//   npm run img         บีบอัดจริง (สำรองไฟล์เดิมไว้ที่ .image-backup/ ก่อนเสมอ)
//
// ตัวเลือกเพิ่ม:  --quality=88   --min-mb=1   --dir=public/uploads
// ────────────────────────────────────────────────────────────────────────────

import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync, renameSync } from "node:fs";
import path from "node:path";

const arg = (k, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${k}=`));
  return hit ? hit.split("=")[1] : d;
};
const TEST = process.argv.includes("--test");
const DIR = arg("dir", "public/uploads");
const QUALITY = Number(arg("quality", 88));
const MIN_MB = Number(arg("min-mb", 1));
const BACKUP = ".image-backup";
const TESTDIR = ".image-test";

const mb = (bytes) => bytes / 1024 / 1024;
const pad = (s, n) => String(s).padStart(n);

/** ไล่หาไฟล์รูปทุกระดับชั้นใน dir */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

/** บีบอัดไฟล์เดียว — คงพิกเซลเดิม คืนค่า buffer + meta */
async function encode(file, quality) {
  const img = sharp(file, { limitInputPixels: false });
  const meta = await img.metadata();
  const isPng = meta.format === "png";
  const buf = isPng
    ? // PNG: บีบอัดระดับสูงสุด ไม่แตะสี (lossless — พิกเซลเหมือนเดิมเป๊ะ)
      await img.png({ compressionLevel: 9, effort: 10 }).toBuffer()
    : // JPEG: ใช้ mozjpeg เข้ารหัสใหม่ให้เล็กลงที่คุณภาพเท่าเดิม
      await img.jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
  return { buf, meta, isPng };
}

const files = walk(DIR)
  .map((f) => ({ f, size: statSync(f).size }))
  .filter((x) => mb(x.size) >= MIN_MB)
  .sort((a, b) => b.size - a.size);

if (!files.length) {
  console.log(`ไม่มีไฟล์ที่ใหญ่กว่า ${MIN_MB} MB ใน ${DIR} — ไม่ต้องทำอะไร`);
  process.exit(0);
}

console.log(
  `พบ ${files.length} ไฟล์ที่ใหญ่กว่า ${MIN_MB} MB  (รวม ${mb(files.reduce((s, x) => s + x.size, 0)).toFixed(1)} MB)\n`,
);

// ── โหมดทดสอบ: เขียนตัวอย่างหลายคุณภาพ ไม่แตะไฟล์จริง ────────────────────────
if (TEST) {
  mkdirSync(TESTDIR, { recursive: true });
  const qualities = [95, 92, 90, 88, 85];
  const target = files[0];
  const meta0 = await sharp(target.f, { limitInputPixels: false }).metadata();
  console.log(`ทดสอบกับไฟล์ใหญ่สุด: ${path.basename(target.f)}`);
  console.log(`ต้นฉบับ ${meta0.width} x ${meta0.height}  ${mb(target.size).toFixed(2)} MB\n`);

  for (const q of qualities) {
    const t = Date.now();
    const { buf } = await encode(target.f, q);
    const out = path.join(TESTDIR, `q${q}-${path.basename(target.f)}`);
    await sharp(buf).toFile(out);
    const m = await sharp(out).metadata();
    const ok = m.width === meta0.width && m.height === meta0.height;
    console.log(
      `  q=${q}  ${pad(mb(buf.length).toFixed(2), 6)} MB  ลดลง ${pad((100 - (buf.length / target.size) * 100).toFixed(0), 3)}%  ` +
        `${m.width}x${m.height} ${ok ? "✓ พิกเซลเท่าเดิม" : "✗ ผิด!"}  ${((Date.now() - t) / 1000).toFixed(1)}s`,
    );
  }
  console.log(`\nไฟล์ตัวอย่างอยู่ที่ ${TESTDIR}/ — เปิดเทียบกับต้นฉบับได้เลย`);
  console.log(`พอใจแล้วสั่ง: npm run img -- --quality=<ค่าที่เลือก>`);
  process.exit(0);
}

// ── โหมดจริง: สำรองก่อน แล้วเขียนทับ ────────────────────────────────────────
mkdirSync(BACKUP, { recursive: true });
let before = 0,
  after = 0,
  changed = 0;

for (const { f, size } of files) {
  const { buf, meta, isPng } = await encode(f, QUALITY);
  before += size;

  // กันพลาด: ถ้าเข้ารหัสใหม่แล้วพิกเซลไม่ตรง ให้ข้ามไฟล์นั้น
  const check = await sharp(buf).metadata();
  if (check.width !== meta.width || check.height !== meta.height) {
    console.log(`  ⚠ ข้าม ${path.basename(f)} — พิกเซลไม่ตรง`);
    after += size;
    continue;
  }

  // ไม่ได้เล็กลงก็ไม่ต้องเปลี่ยน (เก็บของเดิมที่ดีกว่าไว้)
  if (buf.length >= size) {
    console.log(`  = ${path.basename(f)} เดิมเล็กกว่าอยู่แล้ว ข้าม`);
    after += size;
    continue;
  }

  const bak = path.join(BACKUP, path.basename(f));
  if (!existsSync(bak)) copyFileSync(f, bak);

  // เขียนลง temp ก่อนแล้วค่อย rename — กันไฟล์เสียถ้าถูกขัดจังหวะกลางคัน
  const tmp = f + ".tmp";
  await sharp(buf).toFile(tmp);
  renameSync(tmp, f);

  after += buf.length;
  changed++;
  console.log(
    `  ✓ ${path.basename(f).padEnd(38)} ${pad(mb(size).toFixed(2), 6)} → ${pad(mb(buf.length).toFixed(2), 6)} MB  ` +
      `(-${(100 - (buf.length / size) * 100).toFixed(0)}%)  ${meta.width}x${meta.height} คงเดิม${isPng ? "  [PNG lossless]" : ""}`,
  );
}

console.log(
  `\nเสร็จ — แก้ ${changed} ไฟล์  ${mb(before).toFixed(1)} MB → ${mb(after).toFixed(1)} MB ` +
    `(ประหยัด ${mb(before - after).toFixed(1)} MB / ${(100 - (after / before) * 100).toFixed(0)}%)`,
);
console.log(`ไฟล์เดิมสำรองไว้ที่ ${BACKUP}/ — ถ้าไม่พอใจก็ก็อปกลับได้ หรือใช้ git checkout`);
