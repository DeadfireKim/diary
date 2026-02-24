import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pagination from "./index";

const meta = {
  title: "Commons/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "페이지네이션의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "페이지네이션의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "페이지네이션의 테마",
    },
    currentPage: {
      control: "number",
      description: "현재 페이지",
    },
    totalPages: {
      control: "number",
      description: "전체 페이지 수",
    },
    siblingCount: {
      control: "number",
      description: "현재 페이지 주변 표시 개수",
    },
    showFirstLast: {
      control: "boolean",
      description: "처음/마지막 버튼 표시",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log("Page changed to:", page),
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 5,
    totalPages: 20,
    siblingCount: 1,
    showFirstLast: true,
    onPageChange: (page) => console.log("Page changed to:", page),
  },
};

// 3. Few Pages - 적은 페이지 수
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    onPageChange: (page) => console.log("Page changed to:", page),
  },
};

// 4. Many Pages - 많은 페이지 수
export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: (page) => console.log("Page changed to:", page),
  },
};

// 5. Without First/Last - 처음/마지막 버튼 없음
export const WithoutFirstLast: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: false,
    onPageChange: (page) => console.log("Page changed to:", page),
  },
};

// 6. Custom Sibling Count - siblingCount 조정
export const CustomSiblingCount: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Sibling Count: 0
        </h4>
        <Pagination
          currentPage={5}
          totalPages={20}
          siblingCount={0}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Sibling Count: 1 (Default)
        </h4>
        <Pagination
          currentPage={5}
          totalPages={20}
          siblingCount={1}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Sibling Count: 2
        </h4>
        <Pagination
          currentPage={5}
          totalPages={20}
          siblingCount={2}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  ),
};

// 7. All Variants - variant 비교
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Primary
        </h4>
        <Pagination
          variant="primary"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Secondary
        </h4>
        <Pagination
          variant="secondary"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary
        </h4>
        <Pagination
          variant="tertiary"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  ),
};

// 8. All Sizes - size 비교
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start" }}>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Small
        </h4>
        <Pagination
          size="small"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Medium
        </h4>
        <Pagination
          size="medium"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Large
        </h4>
        <Pagination
          size="large"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  ),
};

// 9. Interactive - Controlled 모드
export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <div
          style={{
            padding: "16px",
            background: "#f5f5f5",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <strong>Current Page: {currentPage}</strong> / {totalPages}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setCurrentPage(1)}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Go to First
          </button>
          <button
            onClick={() => setCurrentPage(Math.ceil(totalPages / 2))}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Go to Middle
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Go to Last
          </button>
        </div>
      </div>
    );
  },
};

// 10. Light Theme - 모든 조합 (Light)
export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Primary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Primary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Pagination
            variant="primary"
            size="small"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="primary"
            size="medium"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="primary"
            size="large"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Secondary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Pagination
            variant="secondary"
            size="small"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="secondary"
            size="medium"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="secondary"
            size="large"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Pagination
            variant="tertiary"
            size="small"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="tertiary"
            size="medium"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="tertiary"
            size="large"
            theme="light"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </div>
    </div>
  ),
};

// 11. Dark Theme - 모든 조합 (Dark)
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Primary Variant */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Primary (Dark)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Pagination
            variant="primary"
            size="small"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="primary"
            size="medium"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="primary"
            size="large"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Secondary (Dark)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Pagination
            variant="secondary"
            size="small"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="secondary"
            size="medium"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="secondary"
            size="large"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Tertiary (Dark)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Pagination
            variant="tertiary"
            size="small"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="tertiary"
            size="medium"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
          <Pagination
            variant="tertiary"
            size="large"
            theme="dark"
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => console.log("Page:", page)}
          />
        </div>
      </div>
    </div>
  ),
};

// 12. All Combinations - 18개 모든 조합
export const AllCombinations: Story = {
  render: () => {
    const variants = ["primary", "secondary", "tertiary"] as const;
    const sizes = ["small", "medium", "large"] as const;
    const themes = ["light", "dark"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {themes.map((theme) => (
          <div
            key={theme}
            style={{
              padding: "32px",
              borderRadius: "8px",
              backgroundColor: theme === "dark" ? "#1c1c1c" : "#ffffff",
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
                    fontSize: "14px",
                    fontWeight: 600,
                    color: theme === "dark" ? "#e4e4e4" : "#333333",
                  }}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {sizes.map((size) => (
                    <Pagination
                      key={size}
                      variant={variant}
                      size={size}
                      theme={theme}
                      currentPage={5}
                      totalPages={15}
                      onPageChange={(page) => console.log("Page:", page)}
                    />
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
