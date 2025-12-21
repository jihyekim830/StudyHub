import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export const SignupSchema = z
  .object({
    email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "영문이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, { message: "특수문자가 포함되어야 합니다." }),

    passwordConfirm: z.string(),

    name: z.string().min(1, { message: "이름을 입력해주세요." }),

    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .max(10, { message: "닉네임은 10자 이내여야 합니다." }),

    birthday: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "생년월일은 YYYY-MM-DD 형식이어야 합니다.",
    }),

    gender: z.enum(["M", "F"]).refine(Boolean, {
      message: "성별을 선택해주세요.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
