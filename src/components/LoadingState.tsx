export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <section className="loading-state" aria-live="polite">
      <p>{label}</p>
    </section>
  );
}
