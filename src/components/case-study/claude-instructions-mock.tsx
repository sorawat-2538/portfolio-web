// ClaudeInstructionsMock — dialog "Set project instructions" ของ Claude
// ใช้ในขั้นที่ 1 ของ section "Set Workflow by Claude"
//
// จำลอง UI จริงของ Claude (ธีมเข้มโทนอุ่น) — ข้อความข้างในคือ instruction จริง
// ของ project PropertyOS ที่เขียนไว้ครั้งเดียวแล้วใช้กับทุกแชตในโปรเจกต์
// กล่องข้อความ scroll อ่านได้ · static ทั้งหมด ไม่ใช่ของใช้งานจริง

const INSTRUCTIONS = `กำลังทำ Project PropertyOS เป็นแพลตฟอร์ม SaaS สำหรับตัวแทนและหน่วยงานด้านอสังหาริมทรัพย์ persona ส่วนใหญ่เป็นคนไทย

Core Featured หลักคือ
- Listing Management
: Create/update/delete property listings
- Listing Distribution
: Automatically post/feed property listings to multiple portals
- Listing Acquisition Tools
: Market scan, find owner listings from social media and property portals, owner contact database
- Sales Management
: Leads, contacts, pipeline view
- Team Functionality
: Create agents within team, manage listings ownership, assign listings to agents, commission calculation
- Unified Communication Hub
: Line, WhatsApp connection, AI chatbot

กรุณาอ้างอิงกับข้อมูลที่มีในประเทศไทย และอาจจะ Prompt เป็นภาษาไทย ช่วยคิดเป็นภาษาอังกฤษ และตอบกลับมาเป็นภาษาอังกฤษได้เลย`;

export function ClaudeInstructionsMock() {
  return (
    <div>
      <div
        className="select-none overflow-hidden rounded-xl border border-white/10 shadow-[0_28px_60px_-24px_rgba(8,15,30,0.55)]"
        style={{ background: "#30302e" }}
      >
        <div className="px-[clamp(16px,2.4vw,24px)] pt-[clamp(16px,2.4vw,22px)]">
          <h4 className="text-[clamp(17px,2vw,20px)] font-semibold text-[#f5f4ef]">
            Set project instructions
          </h4>
          <p className="mt-2 text-[13.5px] leading-[1.6] text-[#a6a39b]">
            Provide Claude with relevant instructions and information for chats within
            PropertyOS. This will work alongside your{" "}
            <span className="text-[#d6d3cb] underline underline-offset-2">
              profile instructions
            </span>{" "}
            and the selected style in a chat.
          </p>

          {/* กล่องข้อความ — scroll อ่านได้ */}
          <div
            className="mt-4 max-h-[clamp(230px,32vw,300px)] overflow-y-auto rounded-lg border px-4 py-3.5 text-[13px] leading-[1.65] text-[#e8e6df] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar]:w-2"
            style={{ background: "#262624", borderColor: "#4a4844" }}
          >
            <p className="whitespace-pre-wrap">{INSTRUCTIONS}</p>
          </div>
        </div>

        {/* footer */}
        <div className="flex justify-end gap-2 px-[clamp(16px,2.4vw,24px)] pb-[clamp(16px,2.4vw,22px)] pt-4">
          <span
            className="rounded-lg border px-4 py-2 text-[13px] font-medium text-[#a6a39b]"
            style={{ borderColor: "#4a4844" }}
          >
            Cancel
          </span>
          <span
            className="rounded-lg px-4 py-2 text-[13px] font-medium text-[#d6d3cb]"
            style={{ background: "#413f3b" }}
          >
            Save instructions
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
        instruction จริงของ project PropertyOS — เขียนครั้งเดียว ทุกแชตในโปรเจกต์รู้บริบทเอง
      </p>
    </div>
  );
}
