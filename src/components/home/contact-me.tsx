import { Mail, Phone, MessageCircle, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";

type Contact = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

const contacts: Contact[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    label: "LINE ID",
    value: profile.lineId,
    href: `https://line.me/ti/p/~${profile.lineId}`,
    icon: MessageCircle,
  },
];

export function ContactMe() {
  return (
    <section>
      <h2 className="text-[clamp(24px,3vw,32px)] font-bold leading-tight tracking-[-0.02em] text-foreground">
        Let&apos;s work together
      </h2>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {contacts.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel="noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-[#F9FAFB] px-5 py-7 text-center"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-hover text-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[13px] text-faint">{label}</span>
              <span className="mt-0.5 block text-[15px] font-medium text-foreground">
                {value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
