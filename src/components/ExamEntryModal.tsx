import { Button, Input } from "@/components/common";
import { Modal, ModalContent, ModalTrigger } from "@/components/common/modal";
import { SubjectThumbnail } from "@/components";
import { useState } from "react";
import { useExamCodeVerification } from "@/hooks/api";
import { useNavigate } from "react-router";

interface ExamEntryModalProps {
  subjectThumbnailUrl: string | null;
  subjectTitle: string;
  questionCount: number;
  durationTime: number;
  deploymentId: number;
}

function ExamEntryModal({
  subjectThumbnailUrl,
  subjectTitle,
  questionCount,
  durationTime,
  deploymentId,
}: ExamEntryModalProps) {
  const [code, setCode] = useState("");
  const { isLoading, error, verify } = useExamCodeVerification();
  const navigate = useNavigate();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 6) return;
    setCode(value);
  };
  const handleExamStart = async () => {
    const isVerified = await verify(deploymentId, code);

    if (isVerified)
      navigate(`/exam/${deploymentId}`, { state: { durationTime } });
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button variant="outline" className="h-12 w-28 p-0 font-semibold">
          응시하기
        </Button>
      </ModalTrigger>
      <ModalContent className="w-96 p-6">
        <div className="mb-5 flex flex-col items-center gap-1">
          <SubjectThumbnail
            thumbnailUrl={subjectThumbnailUrl}
            subjectTitle={subjectTitle}
          />
          <span className="mt-1 text-lg font-semibold">{subjectTitle}</span>
          <p className="text-sm font-semibold tracking-tight">
            <span className="text-neutral-600">{`총 ${questionCount}문항 ㆍ `}</span>
            <span className="text-primary-600">{`제한시간 ${durationTime}분`}</span>
          </p>
        </div>
        <span className="mb-1 font-semibold tracking-tight text-neutral-700">
          참가 코드입력
        </span>
        <Input
          placeholder="6자리를 입력해주세요"
          className="mb-6"
          value={code}
          onChange={handleCodeChange}
          variant={error ? "danger" : "default"}
          errorMessage={error?.message}
        />
        <Button
          className="h-12 w-full p-0 font-semibold"
          onClick={handleExamStart}
          disabled={isLoading}
        >
          시험시작
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default ExamEntryModal;
