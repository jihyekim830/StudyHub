import { Button, Password } from "@/components/common";
import { useChangePassword } from "@/hooks/api";
import { ChangePasswordSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const inputWrapperClassName = "flex w-full items-center justify-between";

export default function ChangePasswordPage() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = ({ newPassword, oldPassword }: ChangePasswordSchema) => {
    changePassword({ newPassword, oldPassword });
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold sm:text-3xl">비밀번호 변경</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-end gap-2.5 rounded-lg border border-neutral-100 px-11 py-14"
      >
        <div className={inputWrapperClassName}>
          <span className="w-32">기존 비밀번호</span>
          <Password
            className="flex-1"
            placeholder="기존 비밀번호를 입력해주세요."
            {...register("oldPassword")}
            errorMessage={errors.oldPassword?.message}
          />
        </div>

        <div className={inputWrapperClassName}>
          <span className="w-32">새 비밀번호</span>
          <Password
            className="flex-1"
            placeholder="새 비밀번호를 입력해주세요."
            {...register("newPassword")}
            errorMessage={errors.newPassword?.message}
          />
        </div>

        <div className={inputWrapperClassName}>
          <span className="w-32">새 비밀번호 확인</span>
          <Password
            className="flex-1"
            placeholder="새 비밀번호를 한 번 더 입력해주세요."
            {...register("passwordConfirm")}
            errorMessage={errors.passwordConfirm?.message}
          />
        </div>

        <Button type="submit" disabled={!isValid || isPending}>
          {isPending ? "변경중" : "변경하기"}
        </Button>
      </form>
    </div>
  );
}
