import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-8 text-center sm:px-8 min-[900px]:px-0">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
