import { Button, LinkButton } from "@/components/common";

type ExamBottomButtonProps =
  | {
      type: "button";
      label: string;
      onClick: () => void;
      disabled: boolean;
    }
  | {
      type: "link";
      label: string;
      to: string;
    };

const BUTTON_BASE =
  "mx-auto flex h-16 items-center justify-center px-8 py-0 text-lg";

function ExamBottomButton(props: ExamBottomButtonProps) {
  return (
    <div className="mt-58.5 mb-24.5 flex">
      {props.type === "button" ? (
        <Button
          className={BUTTON_BASE}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.label}
        </Button>
      ) : (
        <LinkButton className={BUTTON_BASE} to={props.to}>
          {props.label}
        </LinkButton>
      )}
    </div>
  );
}

export default ExamBottomButton;
