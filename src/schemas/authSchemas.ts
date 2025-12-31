import * as z from "zod";

const emailPart = z.email({ message: "이메일 형식이 올바르지 않습니다." });

const phoneParts = {
  phone1: z.string().min(3, { message: "" }),
  phone2: z.string().min(4, { message: "" }),
  phone3: z.string().min(4, { message: "" }),
};

const verificationCodePart = z
  .string()
  .length(6, { message: "인증번호는 6자리여야 합니다." });

export const LoginSchema = z.object({
  email: emailPart,
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export const EmailVerificationSchema = z.object({
  email: emailPart,
  emailcode: verificationCodePart,
  emailToken: z.string().optional(),
});

export const SMSVerificationSchema = z.object({
  ...phoneParts,
  smscode: verificationCodePart.regex(/^\d+$/, {
    message: "숫자만 입력 가능합니다.",
  }),
  smsToken: z.string().optional(),
});

export const PasswordSchema = z
  .string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
  .regex(/[a-zA-Z]/, { message: "영문이 포함되어야 합니다." })
  .regex(/[0-9]/, { message: "숫자가 포함되어야 합니다." })
  .regex(/[^a-zA-Z0-9]/, { message: "특수문자가 포함되어야 합니다." });

export const PasswordConfirmSchema = z
  .string()
  .min(1, { message: "비밀번호 확인을 입력해주세요." });

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "기존 비밀번호를 입력해주세요." }),
    newPassword: PasswordSchema,
    passwordConfirm: PasswordConfirmSchema,
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const SignupSchema = z
  .object({
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    email: emailPart,
    password: PasswordSchema,
    passwordConfirm: PasswordConfirmSchema,
    nickname: z
      .string()
      .min(2, { message: "닉네임은 2자 이상 입력해주세요." })
      .max(10, { message: "닉네임은 10자 이내여야 합니다." })
      .regex(
        /[a-zA-Z0-9가-힣]+$/,
        "특수문자를 제외한 한글, 영문, 숫자만 사용 가능합니다."
      ),
    birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "생년월일은 YYYY-MM-DD 형식으로 입력해주세요.",
    }),
    gender: z.enum(["M", "F"]),
    ...phoneParts,
    emailToken: z.string().min(1, "이메일 인증이 필요합니다."),
    smsToken: z.string().min(1, "휴대폰 인증이 필요합니다."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type EmailVerificationSchemaType = z.infer<
  typeof EmailVerificationSchema
>;
export type SMSVerificationSchemaType = z.infer<typeof SMSVerificationSchema>;
export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
