import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // เสิร์ฟฟอร์แมตใหม่ก่อน (เล็กกว่า JPG/PNG ~30–50% ที่ความคมเท่ากัน)
    // browser ที่ไม่รองรับจะ fallback กลับไปฟอร์แมตเดิมให้เอง
    formats: ["image/avif", "image/webp"],
    // ค่า quality ที่อนุญาตให้ใช้ผ่าน prop `quality` (Next 16 ต้อง allowlist)
    // 75 = โฟโต้ทั่วไป, 88/90 = ภาพ UI/สกรีนช็อตที่มีตัวอักษร/เส้นคม
    // ⚠️ ต้องมีครบทุกค่าที่ใช้จริงในโค้ด ไม่งั้น Next เตือนแล้วไม่ optimize ให้
    qualities: [75, 88, 90],
    // เก็บ cache รูปที่ optimize แล้วนาน 30 วัน (ลดงาน re-encode ซ้ำ)
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
