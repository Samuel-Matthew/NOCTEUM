import { useCustomCursor } from "@/hooks/UseCustomCursor";

export default function CustomCursor() {
  const { cursorRef, textRef, ringRef, stateRef } = useCustomCursor();

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:flex items-center justify-center"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        ref={ringRef}
        className="flex items-center justify-center rounded-full border"
        style={{
          width: 16,
          height: 16,
          borderColor: "var(--accent)",
          borderWidth: 1,
          backgroundColor: stateRef.current.mixBlend
            ? "transparent"
            : "var(--accent)",
        }}
      >
        <span
          ref={textRef}
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{
            color: stateRef.current.mixBlend
              ? "var(--text-primary)"
              : "var(--bg-primary)",
          }}
        />
      </div>
    </div>
  );
}
