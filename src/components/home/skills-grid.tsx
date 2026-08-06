import {
  AppWindow,
  Boxes,
  Brush,
  ClipboardCheck,
  Frame,
  GitBranch,
  Image as ImageIcon,
  LayoutTemplate,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Search,
  Sparkles,
  SquareKanban,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";

const ICONS: Record<string, LucideIcon> = {
  Search,
  AppWindow,
  Palette,
  MousePointerClick,
  ClipboardCheck,
  Boxes,
  Workflow,
  LayoutTemplate,
  MonitorSmartphone,
  Frame,
  Image: ImageIcon,
  Brush,
  SquareKanban,
  GitBranch,
  Sparkles,
};

export function SkillsGrid() {
  return (
    <div className="mt-7 space-y-8">
      {profile.skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-[16px] font-bold tracking-[-0.01em] text-foreground">
            {group.title}
          </h3>

          {/* auto-fill (ไม่ใช่ auto-fit) — กลุ่มที่มีของไม่ครบแถว เช่น 2 ชิ้นใน 3 ช่อง
              จะคงความกว้างช่องเดิมไว้ ปล่อยช่องที่เหลือว่าง ไม่ยืดกล่องให้เต็มแถว */}
          <div className="mt-4 grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
            {group.items.map((item) => {
              const Icon = ICONS[item.icon] ?? Sparkles;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3.5 rounded-xl border border-border bg-card px-5 py-3.5"
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0 text-[#2d68ff]"
                    strokeWidth={1.7}
                  />
                  <span className="text-[15px] text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
