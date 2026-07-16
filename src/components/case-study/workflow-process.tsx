// "My work flow" — my working process as bento cards (icon + title + short
// caption, no numbers). Adapts per project, but generally runs in this order.

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
import { type FlowStep } from "./step-flow";
import { WorkflowBento } from "./workflow-bento";

const STEPS: FlowStep[] = [
  { label: "Requirement", sub: "รับโจทย์ธุรกิจ", icon: ClipboardList },
  { label: "Research & Ideate", sub: "ศึกษา & หาไอเดีย", icon: Search },
  { label: "Wireframe", sub: "ร่างโครงหน้าจอ", icon: PenTool },
  { label: "Present", sub: "นำเสนองาน", icon: Presentation },
  { label: "UI Design", sub: "ออกแบบ UI", icon: Palette },
  { label: "Hand-off", sub: "ส่งต่อ dev", icon: Code2 },
  { label: "Design Checklist", sub: "ตรวจ QA", icon: ListChecks },
  { label: "Deploy", sub: "ปล่อยขึ้นจริง", icon: Rocket },
];

export function WorkflowProcess() {
  return <WorkflowBento steps={STEPS} showNumber={false} />;
}
