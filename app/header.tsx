import { Logo } from "@/assets/icons/logo";
import { SVGLinearWrapper } from "@/components/atoms/linear-wrapper";

export function Header() {
  return (
    <header data-testid="header" className="col-span-full row-span-1 p-4">
      <div className="flex items-end-safe gap-3">
        <SVGLinearWrapper className="w-32">
          <Logo className="pointer-events-none w-full opacity-0" />{" "}
        </SVGLinearWrapper>
        <h1 className="text-gl font-bold uppercase">Back-Office.</h1>
      </div>
    </header>
  );
}
