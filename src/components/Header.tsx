type HeaderProps = {
    onHelpClick: () => void;
};

const Header = ({ onHelpClick }: HeaderProps) => (
    <div className="relative w-full text-center">
        <button
            type="button"
            className="absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black text-slate-200 transition hover:border-fourGreen/50 hover:bg-fourGreen/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fourGreen"
            aria-label="Open game instructions"
            onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
            }}
            onClick={(event) => {
                event.stopPropagation();
                onHelpClick();
            }}
        >
            ?
        </button>
        <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-fourGreen/80 sm:text-xs">
            Secure numeric puzzle
        </p>
        <h1 className="font-mono text-3xl font-black uppercase tracking-[0.16em] text-fourWhite sm:text-4xl">
            Perfect Four
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
            Crack the 4-digit code in five attempts.
        </p>
    </div>
);

export default Header;
