
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B]">
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-neutral-700 border-t-white"/>
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold text-white">
            Loading...
          </h2>
          <p className="text-sm text-neutral-400">
            Please wait while we prepare your experience.
          </p>
        </div>
      </div>
    </main>
  );
}