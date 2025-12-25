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
});

export const SMSVerificationSchema = z.object({
  ...phoneParts,
  smscode: verificationCodePart.regex(/^\d+$/, {
    message: "숫자만 입력 가능합니다.",
  }),
});

export const SignupSchema = z
  .object({
    email: emailPart,
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "영문이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, { message: "특수문자가 포함되어야 합니다." }),
    passwordConfirm: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .max(10, { message: "닉네임은 10자 이내여야 합니다." }),
    birthday: z.string().regex(/^\d{8}$/, {
      message: "생년월일은 8자리 숫자로 입력해주세요 (ex. 20001110)",
    }),
    gender: z.enum(["M", "F"]),
    ...phoneParts,
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
