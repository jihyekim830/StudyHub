import { CardDefaultIcon } from "@/assets/icons/cheating-icons";
import { CHEATING_COUNT_ICON_RULES } from "@/constants";

interface CheatingCountIconsProps {
  cheatingCount: number;
}

function CheatingCountIcons({ cheatingCount }: CheatingCountIconsProps) {
  return (
    <div className="flex gap-2" aria-label={`부정행위 누적 ${cheatingCount}회`}>
      {CHEATING_COUNT_ICON_RULES.map(({ threshold, icon }) => (
        <img
          key={`cheating-count-icon-${threshold}`}
          src={cheatingCount < threshold ? CardDefaultIcon : icon}
          alt=""
          aria-hidden
        />
      ))}
    </div>
  );
}

export default CheatingCountIcons;
