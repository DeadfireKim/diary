import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { routes } from "@/commons/constants/url";

const GRAPHQL_ENDPOINT = "https://main-practice.codebootcamp.co.kr/graphql";

const signupSchema = z
  .object({
    email: z.string().refine((val) => val.includes("@"), {
      message: "올바른 이메일 형식이 아닙니다.",
    }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." })
      .regex(/(?=.*[a-zA-Z])(?=.*[0-9])/, {
        message: "영문과 숫자를 포함해야 합니다.",
      }),
    passwordConfirm: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

type CreateUserInput = { email: string; password: string; name: string };
type CreateUserResponse = { _id: string };

async function createUser(input: CreateUserInput): Promise<CreateUserResponse> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation createUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            _id
          }
        }
      `,
      variables: { createUserInput: input },
    }),
  });
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.createUser;
}

export function useSignupForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "", passwordConfirm: "", name: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignupFormData) =>
      createUser({ email: data.email, password: data.password, name: data.name }),
    onSuccess: (result) => {
      openModal(
        <div data-testid="signup-success-modal" data-user-id={result._id}>
          <Modal
            variant="info"
            actions="single"
            title="가입 완료"
            message="회원가입이 성공적으로 완료되었습니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              router.push(routes.login.path);
            }}
          />
        </div>
      );
    },
    onError: () => {
      openModal(
        <div data-testid="signup-failure-modal">
          <Modal
            variant="danger"
            actions="single"
            title="가입 실패"
            message="회원가입에 실패했습니다. 다시 시도해주세요."
            confirmText="확인"
            onConfirm={() => {
              closeModal();
            }}
          />
        </div>
      );
    },
  });

  const onSubmit = (data: SignupFormData) => mutate(data);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isPending,
  };
}
