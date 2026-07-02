import { useEffect, useRef } from "react";

type InstructionsModalProps = {
    onClose: () => void;
};

const InstructionsModal = ({ onClose }: InstructionsModalProps) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        closeButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/78 px-4 backdrop-blur-sm"
            role="presentation"
            onPointerDown={(event) => {
                event.stopPropagation();
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="instructions-title"
                aria-describedby="instructions-description"
                className="max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-5 text-slate-200 shadow-2xl shadow-black/60"
                onPointerDown={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-fourGreen/80">How to play</p>
                        <h2 id="instructions-title" className="mt-1 text-2xl font-black text-fourWhite">
                            Find the code
                        </h2>
                    </div>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl leading-none text-slate-200 transition hover:border-fourGreen/50 hover:bg-fourGreen/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fourGreen"
                        aria-label="Close instructions"
                        onClick={onClose}
                    >
                        x
                    </button>
                </div>
                <div id="instructions-description" className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    <p>Type four unique digits, then press Enter to submit your guess.</p>
                    <p>Green means the digit is correct and in the right position. Yellow means the digit is in the code but in another position.</p>
                    <p>On mobile, tap the board to open the numeric keyboard. You have five attempts.</p>
                </div>
            </section>
        </div>
    );
};

export default InstructionsModal;
