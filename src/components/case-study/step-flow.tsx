// ชนิดข้อมูลกลางของ "หนึ่งขั้นใน workflow" — ใช้ร่วมกันระหว่าง
// home/work-flow.tsx (My Work Flow) และ case-study/claude-section.tsx
//
// หมายเหตุ: เดิมไฟล์นี้มี component `StepFlow` (กล่องเรียงต่อกันด้วยลูกศร) ด้วย
// แต่ตอนนี้ทุกที่ใช้การ์ดแบบ WorkflowBento หมดแล้ว จึงเหลือไว้แค่ type

import { type LucideIcon } from "lucide-react";

export type FlowStep = { label: string; sub?: string; icon?: LucideIcon };
