import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";

const meta = {
  title: "Commons/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "danger"],
      description: "모달의 스타일 변형 (info: 검정, danger: 빨강)",
    },
    actions: {
      control: "select",
      options: ["single", "dual"],
      description: "버튼 개수 (single: 확인 1개, dual: 취소+확인 2개)",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "모달의 테마",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    message: {
      control: "text",
      description: "모달 메시지",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
    cancelText: {
      control: "text",
      description: "취소 버튼 텍스트 (dual일 때만)",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    title: "알림",
    message: "작업이 완료되었습니다.",
    onConfirm: () => alert("확인 클릭"),
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "알림",
    message: "작업이 완료되었습니다.",
    confirmText: "확인",
    onConfirm: () => alert("확인 클릭"),
  },
};

// 3. Info Single - 정보 모달 (버튼 1개)
export const InfoSingle: Story = {
  args: {
    variant: "info",
    actions: "single",
    title: "일기 등록 완료",
    message: "등록이 완료 되었습니다.",
    confirmText: "확인",
    onConfirm: () => alert("확인 클릭"),
  },
};

// 4. Info Dual - 정보 모달 (버튼 2개)
export const InfoDual: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "일기 등록 취소",
    message: "일기 등록을 취소 하시겠어요?",
    confirmText: "등록 취소",
    cancelText: "계속 작성",
    onConfirm: () => alert("등록 취소 클릭"),
    onCancel: () => alert("계속 작성 클릭"),
  },
};

// 5. Danger Single - 경고 모달 (버튼 1개)
export const DangerSingle: Story = {
  args: {
    variant: "danger",
    actions: "single",
    title: "삭제 완료",
    message: "일기가 삭제되었습니다.",
    confirmText: "확인",
    onConfirm: () => alert("확인 클릭"),
  },
};

// 6. Danger Dual - 경고 모달 (버튼 2개)
export const DangerDual: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    title: "일기 삭제",
    message: "정말로 삭제하시겠습니까?",
    confirmText: "삭제",
    cancelText: "취소",
    onConfirm: () => alert("삭제 클릭"),
    onCancel: () => alert("취소 클릭"),
  },
};

// 7. Light Theme - 모든 조합 (Light)
export const LightTheme: Story = {
  args: {
    title: "",
    message: "",
    onConfirm: () => {},
  },
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Info Single */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Info + Single (Light)
        </h3>
        <Modal
          variant="info"
          actions="single"
          theme="light"
          title="일기 등록 완료"
          message="등록이 완료 되었습니다."
          confirmText="확인"
          onConfirm={() => alert("확인")}
        />
      </div>

      {/* Info Dual */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Info + Dual (Light)
        </h3>
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          confirmText="등록 취소"
          cancelText="계속 작성"
          onConfirm={() => alert("등록 취소")}
          onCancel={() => alert("계속 작성")}
        />
      </div>

      {/* Danger Single */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Danger + Single (Light)
        </h3>
        <Modal
          variant="danger"
          actions="single"
          theme="light"
          title="삭제 완료"
          message="일기가 삭제되었습니다."
          confirmText="확인"
          onConfirm={() => alert("확인")}
        />
      </div>

      {/* Danger Dual */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Danger + Dual (Light)
        </h3>
        <Modal
          variant="danger"
          actions="dual"
          theme="light"
          title="일기 삭제"
          message="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => alert("삭제")}
          onCancel={() => alert("취소")}
        />
      </div>
    </div>
  ),
};

// 8. Dark Theme - 모든 조합 (Dark)
export const DarkTheme: Story = {
  args: {
    title: "",
    message: "",
    onConfirm: () => {},
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Info Single */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Info + Single (Dark)
        </h3>
        <Modal
          variant="info"
          actions="single"
          theme="dark"
          title="일기 등록 완료"
          message="등록이 완료 되었습니다."
          confirmText="확인"
          onConfirm={() => alert("확인")}
        />
      </div>

      {/* Info Dual */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Info + Dual (Dark)
        </h3>
        <Modal
          variant="info"
          actions="dual"
          theme="dark"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          confirmText="등록 취소"
          cancelText="계속 작성"
          onConfirm={() => alert("등록 취소")}
          onCancel={() => alert("계속 작성")}
        />
      </div>

      {/* Danger Single */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Danger + Single (Dark)
        </h3>
        <Modal
          variant="danger"
          actions="single"
          theme="dark"
          title="삭제 완료"
          message="일기가 삭제되었습니다."
          confirmText="확인"
          onConfirm={() => alert("확인")}
        />
      </div>

      {/* Danger Dual */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Danger + Dual (Dark)
        </h3>
        <Modal
          variant="danger"
          actions="dual"
          theme="dark"
          title="일기 삭제"
          message="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => alert("삭제")}
          onCancel={() => alert("취소")}
        />
      </div>
    </div>
  ),
};

// 9. All Combinations - 8개 모든 조합 (2x2x2)
export const AllCombinations: Story = {
  args: {
    title: "",
    message: "",
    onConfirm: () => {},
  },
  render: () => {
    const variants = ["info", "danger"] as const;
    const actionsList = ["single", "dual"] as const;
    const themes = ["light", "dark"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {themes.map((theme) => (
          <div
            key={theme}
            style={{
              padding: "32px",
              borderRadius: "12px",
              backgroundColor: theme === "dark" ? "#1c1c1c" : "#f2f2f2",
            }}
          >
            <h2
              style={{
                marginBottom: "32px",
                fontSize: "18px",
                fontWeight: 700,
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
            >
              {theme.toUpperCase()} Theme
            </h2>

            {variants.map((variant) => (
              <div key={variant} style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    marginBottom: "16px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: theme === "dark" ? "#e4e4e4" : "#333333",
                  }}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </h3>

                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  {actionsList.map((actions) => (
                    <div key={actions}>
                      <p
                        style={{
                          marginBottom: "8px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: theme === "dark" ? "#c7c7c7" : "#777777",
                        }}
                      >
                        {actions}
                      </p>
                      <Modal
                        variant={variant}
                        actions={actions}
                        theme={theme}
                        title={
                          actions === "single"
                            ? "일기 등록 완료"
                            : "일기 등록 취소"
                        }
                        message={
                          actions === "single"
                            ? "등록이 완료 되었습니다."
                            : "일기 등록을 취소 하시겠어요?"
                        }
                        confirmText={actions === "single" ? "확인" : "등록 취소"}
                        cancelText="계속 작성"
                        onConfirm={() =>
                          alert(
                            `${variant} + ${actions} + ${theme}: 확인 클릭`,
                          )
                        }
                        onCancel={() =>
                          alert(
                            `${variant} + ${actions} + ${theme}: 취소 클릭`,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
