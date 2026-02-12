export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex justify-center">
      <div className="w-full max-w-5xl border-x border-black/10">
        {children}
      </div>
    </div>
  );
}
