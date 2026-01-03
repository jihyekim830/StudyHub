import { changeProfileImage } from "@/api/auth";
import { Button, Input, LoadingUi } from "@/components/common";
import { EditNickname } from "@/components/profile";
import ImageInput from "@/components/profile/ImageInput";
import { useToast } from "@/hooks";
import { useEditProfile, useUserInformation } from "@/hooks/api";
import { cn, creatProfileImageUrl } from "@/lib/utils";
import {
  EditProfileSchema,
  type EditProfileSchemaType,
} from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function MyPageEdit() {
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);

  const { triggerToast } = useToast();
  const navigate = useNavigate();

  const { data: user, isPending } = useUserInformation();
  const { mutate: editProfile } = useEditProfile({
    onSuccess: () => {
      triggerToast({
        variant: "small",
        text: "내 정보 수정을 완료했습니다.",
        status: "success",
      });

      navigate("/my-page");
    },
    onError: () => {
      triggerToast({
        variant: "small",
        text: "내 정보 수정에 실패했습니다. 잠시후 다시 시도해주세요.",
        status: "danger",
      });
    },
  });

  const methods = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    mode: "onChange",
  });

  const {
    register,
    formState: { errors, isValid },
    setValue,
    handleSubmit,
    watch,
    reset,
  } = methods;

  const gender = watch("gender");
  const nickname = watch("nickname");

  const [image, setImage] = useState<File | null>(null);

  const onSubmit = (form: EditProfileSchemaType) => {
    if (isNicknameChanged && !isNicknameChecked) {
      triggerToast({
        variant: "small",
        status: "danger",
        text: "닉네임 중복확인 후 수정할 수 있습니다.",
      });
    } else {
      editProfile(form);

      if (image) {
        changeProfileImage(image);
      }
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        nickname: user.nickname,
        birthday: user.birthday,
        gender: user.gender,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (user) {
      setIsNicknameChanged(user.nickname !== nickname);
    }
  }, [user, nickname]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <LoadingUi />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        유저 데이터를 불러오는데 문제가 발생했습니다. 잠시후 다시 시도해주세요.
      </div>
    );
  }

  const { email, phone_number: phoneNumber, id: userId } = user;

  const profileImageUrl = creatProfileImageUrl(userId);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 정보</h1>
          <div>
            <Button type="submit" disabled={!isValid}>
              저장하기
            </Button>
          </div>
        </div>

        <section className="flex flex-col items-center gap-20 rounded-lg border p-11">
          {/* 프로필 */}
          <div className="flex w-full flex-col items-center gap-10">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="text-primary-600 w-full text-xl font-semibold">
                프로필
              </span>
              <hr className="w-full" />
            </div>

            <ImageInput setImage={setImage} defaultImageUrl={profileImageUrl} />

            <div className="flex w-full flex-col gap-5">
              <EditNickname
                setIsNicknameChecked={setIsNicknameChecked}
                isNicknameChecked={isNicknameChecked}
              />

              <div className="flex w-full flex-col gap-2">
                <label>이메일</label>
                <Input defaultValue={email} disabled />
              </div>
            </div>
          </div>

          {/* 개인정보 */}
          <div className="flex w-full flex-col items-center gap-10">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="text-primary-600 w-full text-xl font-semibold">
                개인정보
              </span>
              <hr className="w-full" />
            </div>

            <div className="flex w-full flex-col gap-5">
              <div className="flex w-full flex-col gap-2">
                <label>이름</label>
                <Input
                  {...register("name")}
                  errorMessage={errors.name?.message}
                />
              </div>

              {/* TODO: 휴대전화 변경 기능 추가 */}
              <div className="flex w-full flex-col gap-2">
                <label>휴대전화</label>
                <div className="flex w-full items-center gap-2">
                  <Input
                    defaultValue={`${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`}
                    className="flex-1"
                  />
                  <Button
                    className="flex h-11 items-center justify-center"
                    variant={"outline"}
                    type="button"
                  >
                    인증번호 전송
                  </Button>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <label>성별</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-10 w-18 rounded-4xl p-0 transition-colors",
                      gender !== "M" &&
                        "border-neutral-400 bg-neutral-200 text-neutral-700"
                    )}
                    onClick={() => {
                      setValue("gender", "M", { shouldDirty: true });
                    }}
                  >
                    남
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "ml-2 h-10 w-18 rounded-4xl p-0 transition-colors",
                      gender !== "F" &&
                        "border-neutral-400 bg-neutral-200 text-neutral-700"
                    )}
                    onClick={() => {
                      setValue("gender", "F", { shouldDirty: true });
                    }}
                  >
                    여
                  </Button>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <label>생년월일</label>
                <Input
                  {...register("birthday")}
                  errorMessage={errors.birthday?.message}
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  );
}
