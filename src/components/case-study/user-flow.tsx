// UserFlow — ผังการใช้งานจริงจากจอที่ออกแบบไว้ (จอไหน → ไปจอไหน)
//
// 1 lane = 1 เส้นทาง (เช่น ค้นหาห้องจนถึงติดต่อเจ้าของ) · node = จอมือถือย่อ + ชื่อจอใต้ภาพ
// คั่นด้วยลูกศร · จอเยอะเกินความกว้างจะขึ้นบรรทัดใหม่เอง ไม่มี scroll แนวนอน
// ข้อมูลอยู่ใน `userFlow` ของแต่ละโปรเจกต์ (data/projects.ts) — component นี้ไม่มีเนื้อหาของตัวเอง

import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export type UserFlowLane = {
  title: string;
  steps: { src: string; label: string }[];
};

/** ลูกศรคั่นระหว่างจอ — จอแคบหมุนลง 90° (เหมือน WorkflowSitemap) */
function Connector() {
  return (
    <span
      className="flex h-[152px] shrink-0 items-center px-0.5 text-foreground/25 sm:h-[176px]"
      aria-hidden="true"
    >
      <ChevronRight className="h-4 w-4 max-sm:rotate-90" strokeWidth={2.6} />
    </span>
  );
}

export function UserFlow({ lanes }: { lanes: readonly UserFlowLane[] }) {
  return (
    <div className="flex flex-col gap-[clamp(26px,3vw,34px)]">
      {lanes.map((lane) => (
        <div key={lane.title}>
          <h4 className="text-[15px] font-bold tracking-[-0.01em] text-foreground">
            {lane.title}
          </h4>

          <div className="mt-4 flex flex-wrap items-start gap-y-4 rounded-xl bg-[#f3f3f1] px-[clamp(12px,2vw,18px)] py-[clamp(14px,2vw,20px)]">
            {lane.steps.map((s, i) => (
              <React.Fragment key={`${lane.title}-${s.src}`}>
                {i > 0 && <Connector />}
                <figure className="w-[68px] shrink-0 sm:w-[80px]">
                  <Image
                    src={s.src}
                    alt={s.label}
                    width={660}
                    height={1320}
                    sizes="80px"
                    quality={82}
                    className="block h-auto w-full drop-shadow-[0_10px_22px_-14px_rgba(30,50,90,0.5)]"
                  />
                  {/* ความสูงคงที่ 2 บรรทัด เพื่อให้ทุก node สูงเท่ากัน ลูกศรจะอยู่กลางพอดี */}
                  <figcaption className="mt-2 h-[30px] overflow-hidden text-center text-[10.5px] leading-[1.4] text-muted-foreground">
                    {s.label}
                  </figcaption>
                </figure>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
