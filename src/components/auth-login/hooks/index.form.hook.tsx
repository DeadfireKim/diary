import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { routes } from "@/commons/constants/url";

const GRAPHQL_ENDPOINT = "https://main-practice.codebootcamp.co.kr/graphql";

const loginSchema = z.object({
  email: z.string().refine((val) => val.includes("@"), {
    message: "올바른 이메일 형식이 아닙니다.",
  }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

type LoginUserResponse = { accessToken: string };
type FetchUserLoggedInResponse = { _id: string; name: string };

async function loginUser(email: string, password: string): Promise<LoginUserResponse> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation loginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            accessToken
          }
        }
      `,
      variables: { email, password },
    }),
  });
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.loginUser;
}

async function fetchUserLoggedIn(accessToken: string): Promise<FetchUserLoggedInResponse> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query fetchUserLoggedIn {
          fetchUserLoggedIn {
            _id
            name
          }
        }
      `,
    }),
  });
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.fetchUserLoggedIn;
}

export function useLoginForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const { accessToken } = await loginUser(data.email, data.password);
      const user = await fetchUserLoggedIn(accessToken);
      return { accessToken, user };
    },
    onSuccess: ({ accessToken, user }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify({ _id: user._id, name: user.name }));
      openModal(
        <div
          data-testid="login-success-modal"
          data-access-token={accessToken}
          data-user-id={user._id}
          data-user-name={user.name}
        >
          <Modal
            variant="info"
            actions="single"
            title="로그인 완료"
            message="로그인이 성공적으로 완료되었습니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              router.push(routes.diaries.path);
            }}
          />
        </div>
      );
    },
    onError: () => {
      openModal(
        <div data-testid="login-failure-modal">
          <Modal
            variant="danger"
            actions="single"
            title="로그인 실패"
            message="이메일 또는 비밀번호가 올바르지 않습니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal();
            }}
          />
        </div>
      );
    },
  });

  const onSubmit = (data: LoginFormData) => mutate(data);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isPending,
  };
}
