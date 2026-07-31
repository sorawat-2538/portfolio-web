// "My Work Flow" — กระบวนการทำงานของผมเป็นการ์ด bento (icon + หัวข้อ + คำอธิบายสั้น)
// เป็น process กลางไม่ผูกกับโปรเจกต์ไหน → อยู่หน้าแรก (ก่อน Technical Skills)
// ไม่ใช่ในหน้า case study เพราะแต่ละ case study เล่า process จริงของตัวเองอยู่แล้ว

import {
  ClipboardList,
  Search,
  PenTool,
  Presentation,
  Palette,
  Code2,
  ListChecks,
  Rocket,
} from "lucide-react";
import { type FlowStep } from "../case-study/step-flow";
import { WorkflowBento } from "./work-flow-bento";

const STEPS: FlowStep[] = [
  { label: "Requirement", sub: "รับรีไควร์เมนต์", icon: ClipboardList },
  { label: "Research & Ideate", sub: "รีเสิร์ชเพื่อหาไอเดีย", icon: Search },
  { label: "Wireframe", sub: "ร่างโครงหน้าจอ", icon: PenTool },
  { label: "Present", sub: "นำเสนองาน", icon: Presentation },
  { label: "UI Design", sub: "ออกแบบ UI", icon: Palette },
  { label: "Hand-off", sub: "ส่งต่อ dev", icon: Code2 },
  { label: "Design Checklist", sub: "ตรวจความเรียบร้อย", icon: ListChecks },
  { label: "Deploy", sub: "ปล่อยขึ้นจริง", icon: Rocket },
];

export function WorkflowProcess() {
  return <WorkflowBento steps={STEPS} showNumber={false} />;
}
