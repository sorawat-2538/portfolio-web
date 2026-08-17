// ProcessSection — section "Process & Key Decisions" ที่ใช้ร่วมกันทุกหน้างาน
//
// เดิมโค้ดชุดนี้อยู่ใน case-study-view.tsx ที่เดียว (มีแค่หน้า propertyhub ที่ได้ใช้)
// ย้ายออกมาเป็น component กลาง เพื่อให้หน้างานที่ใช้ view คนละตัว
// (PlaceholderView / PropertyhubAppView / PropertyosView) ใช้โครงเดียวกันได้
//
// โครง: Design Process (แถบ 5 ขั้น + ย่อหน้าอธิบาย) → Decision 1..n
//        แต่ละ decision = ชื่อ (callout ส้ม) → Problem → Trade-off → Validation
//
// เนื้อหาแก้ที่ `decisions` ใน data/projects.ts — decision ที่ยังไม่มีข้อมูลจริง
// ใส่ `{ pending: true }` ไว้ จะขึ้นเป็นการ์ดเส้นประ "รอเนื้อหาจริง"

import Image from "next/image";
import type { CaseImage, Decision } from "@/data/projects";
import { DecisionFigures } from "./decision-figures";
import { ListingDialogMock } from "./listing-dialog-mock";
import { FeaturePhaseFlow } from "./feature-phase-flow";
import { UserFlow, type UserFlowLane } from "./user-flow";
import { WebScreensPanel } from "./web-screens-panel";

/** ค่าที่ยังเป็น placeholder "[ ... ]" ใน data/projects.ts — ห้ามหลุดขึ้นหน้าเว็บ
 *  (นิยามอยู่ที่ไฟล์นี้ไฟล์เดียว · case-study-view.tsx import ไปใช้ต่อ) */
export function isPlaceholder(s?: string) {
  return !s || s.includes("[ ");
}

/** true = โปรเจกต์นี้มี decision ที่แสดงได้จริง (ใช้ตัดสินว่าจะขึ้น section ไหม) */
export function hasProcess(decisions?: readonly Decision[]) {
  return Boolean(decisions?.some((d) => d.pending || !isPlaceholder(d.title)));
}

/** ขั้นย่อยใน Process (เช่น Requirement / Research / Wireframe & Style Guide)
 *  วางต่อจากแถบ process ก่อนถึงส่วน Decision — ไม่ใส่ = ไม่มีขั้นย่อย */
export type ProcessPhase = {
  title: string;
  body?: string;
  images?: CaseImage[];
  /** จำนวนคอลัมน์ของรูปในขั้นนี้ (default 1 = รูปเดียวเต็มความกว้าง) */
  cols?: 1 | 2 | 3;
  /** true = ไม่โชว์ caption ใต้รูป (เช่น Style Guide ที่ในรูปมีชื่อหัวข้ออยู่แล้ว) */
  hideCaptions?: boolean;
  /** true = รูปในขั้นนี้กดขยายไม่ได้ (เช่น จอแอปในตลาดขั้น Research) */
  noZoom?: boolean;
  /** มีค่านี้ = รูปในขั้นนี้เรียงเป็นแถวเดียวเลื่อนแนวนอน (ลากด้วยเมาส์ได้ + กดดูเต็มจอ)
   *  แทนกริด · "phone" = สล็อตแคบสำหรับจอมือถือ · ใช้กับ Wireframe ของ Renthub App */
  rail?: "wide" | "phone";
};

// หมายเหตุ: เดิมมี DEFAULT_NOTE เป็นย่อหน้ากลางที่ทุกงานได้อัตโนมัติ — ย้ายไปเก็บเป็น
// `processNote` ของ propertyhub ใน data/projects.ts แล้ว (17 ส.ค. 2026) เพราะข้อความนั้น
// ยกตัวอย่างของ Propertyhub โดยเฉพาะ ไม่ควรถูกใช้ซ้ำกับงานอื่น

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

/** หัวข้อของขั้นย่อยใน process (Requirement / Research / …) — ชุดเดียวกับ H3 ในหน้า case study */
function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[clamp(19px,2.1vw,22px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
      {children}
    </h3>
  );
}

/** หัวข้อย่อยใน decision (Problem / Trade-off / Validation) — ขนาดเท่า body (17px) แต่ตัวหนา */
function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="text-[17px] font-bold tracking-[0.01em] text-foreground">{children}</h4>;
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={"text-[17px] leading-[1.8] text-muted-foreground " + className}>{children}</p>
  );
}

/** ประโยคเด่น — callout ส้ม ชุดเดียวกับ Takeaway ใน propertyos-view / claude-section */
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-r-xl border-l-[3px] border-amber-500 bg-amber-400/[0.12] px-[clamp(18px,2.4vw,26px)] py-[clamp(16px,2vw,22px)]">
      <p className="text-[clamp(16px,1.8vw,19px)] leading-[1.62] text-foreground">{children}</p>
    </div>
  );
}

export function ProcessSection({
  title,
  heading,
  decisions,
  note,
  image,
  phases,
  flow,
  validationLabel,
}: {
  /** ชื่อโปรเจกต์ — ใช้ใน alt ของรูป */
  title: string;
  /** ชื่อ H2 ของ section — ไม่ใส่ = "Process & Key Decisions"
   *  (Renthub App ใช้ "Key Decision" เพราะ Wireframe แยกไปเป็น section ของตัวเอง) */
  heading?: string;
  decisions: readonly Decision[];
  /** ย่อหน้าใต้รูป process (ไม่ใส่ = ใช้ข้อความกลาง) */
  note?: string;
  /** รูปหัว section (เช่น บอร์ด Design Thinking ของ Propertyhub App)
   *  ไม่ใส่ = ใช้แถบ 5 ขั้นมาตรฐาน · รูปสูง (crop:true) จะกดดูเต็มจอได้ */
  image?: CaseImage;
  /** ขั้นย่อยของ process (Requirement / Research / Wireframe & Style Guide ฯลฯ)
   *  วางระหว่างแถบ process กับส่วน Decision */
  phases?: readonly ProcessPhase[];
  /** ผังการใช้งาน (จอไหน → ไปจอไหน) — วางก่อนขั้นย่อยของ process
   *  ไม่ใส่ = ไม่แสดง · เนื้อหาอยู่ใน `userFlow` ของโปรเจกต์นั้น */
  flow?: { title?: string; body?: string; lanes: readonly UserFlowLane[] };
  /** ชื่อหัวข้อท่อนที่ 3 ของ decision — default "Validation"
   *  หน้า Propertyhub App ใช้ "Why this works" เพราะเป็นเหตุผลของการเดิมพัน ไม่ใช่ผลที่วัดมาแล้ว
   *  (user สั่ง 14 ส.ค. 2026 · เฉพาะหน้านั้นหน้าเดียว) */
  validationLabel?: string;
}) {
  return (
    <section id="s-process" className="scroll-mt-24">
      <H2>{heading ?? "Process & Key Decisions"}</H2>

      {/* ── Design Process (บล็อกนำ) ── แถบ 5 ขั้น (Research ไฮไลต์) + ย่อหน้าอธิบาย
          **เป็นของที่แต่ละงานเลือกเปิดเอง ไม่ใช่ค่าตั้งต้นของทุกงาน** — โชว์ต่อเมื่อโปรเจกต์นั้น
          ส่ง `note` (ข้อความของงานตัวเอง) หรือ `image` (บอร์ด process ของงานตัวเอง) เข้ามา
          ตอนนี้เปิดอยู่หน้าเดียวคือ propertyhub ผ่าน `processNote` ใน data/projects.ts

          ⚠️ ห้ามทำให้เป็นค่า default ที่ทุกหน้าได้อัตโนมัติอีก — 17 ส.ค. 2026 เคยตั้งเงื่อนไขไว้ว่า
          "หน้าไหนไม่มี phases ให้โชว์" ผลคือย่อหน้าที่ยกตัวอย่าง Input Field ของ Propertyhub
          ไปโผล่บนหน้า Renthub App · ตอนแก้ก็ไปปิดทั้งระบบจน Propertyhub ที่เป็นเจ้าของข้อความหายไปด้วย

          หมายเหตุ: โปรเจกต์ที่มี `phases` (เล่าทีละขั้นอยู่แล้ว เช่น Propertyhub App) ไม่ควรเปิดบล็อกนี้
          เพราะแถบ 5 ขั้นกับหัวข้อย่อยด้านล่างเป็นเรื่องเดียวกัน
          WorkflowProcess (การ์ด bento) ยังใช้อยู่บนหน้าแรก · ProcessPhases เก็บไฟล์ไว้เฉย ๆ */}
      {(note || image) && (
        <div className="mt-7">
          {image ? (
            <DecisionFigures images={[image]} title={title} variant="single" />
          ) : (
            <Image
              src="/uploads/propertyhub-process-bar.png"
              alt={`${title} — ขั้นตอนการออกแบบ Requirement → Research → Wireframe → UI → Hand-off`}
              width={2040}
              height={240}
              sizes="(max-width: 900px) 100vw, 860px"
              // 90 = ค่าสูงสุดที่ตั้งไว้ใน images.qualities ของ next.config (92 จะขึ้น warning)
              quality={90}
              className="block h-auto w-full"
            />
          )}
          {note && <Body className="mt-6">{note}</Body>}
        </div>
      )}

      {/* ── USER FLOW ── ผังจอ (จอไหน → ไปจอไหน) จากจอที่ออกแบบไว้จริง */}
      {flow && flow.lanes.length > 0 && (
        <div className="mt-8">
          <H3>{flow.title ?? "User Flow"}</H3>
          {flow.body && <Body className="mt-3">{flow.body}</Body>}
          <div className="mt-6">
            <UserFlow lanes={flow.lanes} />
          </div>
        </div>
      )}

      {/* ── ขั้นย่อยของ process ── หัวข้อ + ย่อหน้า + รูปของขั้นนั้น (กดดูเต็มจอได้)
          ขั้นที่ยังไม่มีรูปจะแสดงแค่ข้อความ ไม่ขึ้นกล่องว่าง */}
      {phases && phases.length > 0 && (
        <div className="mt-7 flex flex-col gap-10">
          {phases.map((ph) => (
            <div key={ph.title}>
              <H3>{ph.title}</H3>
              {ph.body && <Body className="mt-3">{ph.body}</Body>}
              {ph.images && ph.images.length > 0 && (
                <div className="mt-6">
                  {ph.rail ? (
                    /* แถวเดียวเลื่อนแนวนอน — เงา/lightbox ชุดเดียวกับ Style Guide */
                    <WebScreensPanel
                      screens={ph.images.map((im) => ({ src: im.src, label: im.label, w: im.w, h: im.h }))}
                      variant="rail"
                      railWidth={ph.rail}
                      bare
                    />
                  ) : (
                    <DecisionFigures
                      images={ph.images}
                      title={title}
                      variant={ph.cols && ph.cols > 1 ? "grid" : "single"}
                      cols={ph.cols === 2 ? 2 : 3}
                      captions={!ph.hideCaptions}
                      zoomable={!ph.noZoom}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ระยะห่างจากหัวข้อ section: 48px เมื่อมีบล็อกอยู่เหนือ (ขั้น process / user flow / บล็อกนำ)
          เพื่อแยกสองก้อนออกจากกัน · ไม่มีอะไรอยู่เหนือ = 28px เท่ากับ H2 อื่นในหน้า
          (user ทัก 17 ส.ค. 2026 ว่า Key Decision ของ Renthub App ห่างกว่าที่อื่น) */}
      <div
        className={`flex flex-col gap-10 ${
          phases?.length || flow?.lanes.length || note || image ? "mt-12" : "mt-7"
        }`}
      >
        {(() => {
          const shown = decisions.filter((d) => d.pending || !isPlaceholder(d.title));
          // มี decision ข้อเดียว = ไม่ต้องขึ้นหัวว่า "Decision 1" เพราะเลข 1 ที่ไม่มี 2 ตามมา
          // ทำให้ดูเหมือนเนื้อหาหาย (user สั่ง 17 ส.ค. 2026 — ตอนนี้เข้าเงื่อนไขเฉพาะ Renthub App)
          const numbered = shown.length > 1;
          return shown.map((d, i) => (
            <div key={i}>
              {/* เส้นคั่นระหว่าง decision — ข้อแรกไม่ต้องมี เพราะบล็อก Design Process เหนือมันถูกเอาออกแล้ว
                  (17 ส.ค. 2026 — เส้นลอยอยู่ใต้หัวข้อ section เฉยๆ) */}
              {i > 0 && <div className="mb-9 h-px bg-border" />}

              {numbered && (
                <h3 className="text-[clamp(19px,2.1vw,22px)] font-bold leading-snug tracking-[-0.01em] text-foreground">
                  Decision {i + 1}
                </h3>
              )}

              {d.pending ? (
                <div className="mt-4 rounded-xl border border-dashed border-border px-[22px] py-8 text-center text-[14px] text-faint">
                  รอเนื้อหาจริง
                </div>
              ) : (
                <>
                  {/* ชื่อ decision = callout ส้ม ชุดเดียวกับ statement ใต้ Problem */}
                  <Callout>{d.title}</Callout>

                  {/* Before / After — วางถัดจากหัวข้อทันที ไม่มีเส้นขอบ ไม่มีมุมมน ใช้เงาแทน
                      crop ความสูงไว้ 500px เพราะจอ before ยาวมาก · กดดูเต็มจอได้ */}
                  {d.before && d.after && (
                    <div className="mt-7">
                      <DecisionFigures images={[d.before, d.after]} title={title} variant="pair" />
                    </div>
                  )}

                  {/* fake-UI / diagram ประกอบ decision — ไม่ใช่ screenshot */}
                  {d.mock === "listing-dialog" && (
                    <div className="mt-7">
                      <ListingDialogMock />
                    </div>
                  )}
                  {d.mock === "feature-phases" && (
                    <div className="mt-7">
                      <FeaturePhaseFlow />
                    </div>
                  )}

                  {/* ชุดรูปประกอบ decision (เช่น ฟอร์มลงประกาศทีละสเต็ป) — กริด กดดูเต็มจอได้ */}
                  {d.figures && d.figures.length > 0 && (
                    <div className="mt-7">
                      <DecisionFigures
                        images={d.figures}
                        title={title}
                        variant="grid"
                        cols={d.figuresCols ?? 3}
                        center={d.figuresCenter}
                      />
                    </div>
                  )}

                  {/* รูปหลักฐาน (เฉพาะข้อที่ตั้ง reasoningImageFirst) — วางใต้หัวข้อ decision
                      ทันที ตำแหน่งเดียวกับ before/after และ mock แล้วค่อยตามด้วย Problem */}
                  {d.reasoningImage && d.reasoningImageFirst && (
                    <div className="mt-7">
                      <DecisionFigures images={[d.reasoningImage]} title={title} variant="single" />
                    </div>
                  )}

                  {!isPlaceholder(d.reasoning) && (
                    <div className="mt-8">
                      <H4>Problem</H4>
                      <Body className="mt-2">{d.reasoning}</Body>
                      {/* ค่าปกติ — รูปหลักฐานอยู่ใต้ย่อหน้า Problem */}
                      {d.reasoningImage && !d.reasoningImageFirst && (
                        <div className="mt-5">
                          <DecisionFigures
                            images={[d.reasoningImage]}
                            title={title}
                            variant="single"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {!isPlaceholder(d.tradeoff) && (
                    <div className="mt-6">
                      <H4>Trade-off</H4>
                      <Body className="mt-2">{d.tradeoff}</Body>
                    </div>
                  )}

                  {!isPlaceholder(d.outcome) && (
                    <div className="mt-6">
                      <H4>{d.validationLabel ?? validationLabel ?? "Validation"}</H4>
                      <Body className="mt-2">{d.outcome}</Body>
                      {d.outcomeImage && (
                        <div className="mt-5">
                          <DecisionFigures
                            images={[d.outcomeImage]}
                            title={title}
                            variant="single"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ));
        })()}
      </div>
    </section>
  );
}
