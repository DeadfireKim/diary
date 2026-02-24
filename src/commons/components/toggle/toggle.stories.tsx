import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toggle from "./index";

const meta = {
  title: "Commons/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "토글의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "토글의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "토글의 테마",
    },
    label: {
      control: "text",
      description: "토글 레이블",
    },
    checked: {
      control: "boolean",
      description: "체크 상태 (Controlled)",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    label: "Toggle",
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    label: "Playground Toggle",
    disabled: false,
  },
};

// 3. With Label - 레이블 포함
export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
  },
};

// 4. Without Label - 레이블 없음
export const WithoutLabel: Story = {
  args: {},
};

// 5. Checked State - 체크된 상태
export const CheckedState: Story = {
  args: {
    label: "Checked Toggle",
    defaultChecked: true,
  },
};

// 6. Disabled - 비활성 상태
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Toggle label="Disabled (Unchecked)" disabled />
      <Toggle label="Disabled (Checked)" disabled defaultChecked />
    </div>
  ),
};

// 7. All Variants - variant 비교
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Toggle variant="primary" label="Primary Toggle" />
      <Toggle variant="secondary" label="Secondary Toggle" />
      <Toggle variant="tertiary" label="Tertiary Toggle" />
    </div>
  ),
};

// 8. All Sizes - size 비교
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Toggle size="small" label="Small Toggle" />
      <Toggle size="medium" label="Medium Toggle" />
      <Toggle size="large" label="Large Toggle" />
    </div>
  ),
};

// 9. Controlled - Controlled 모드
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Toggle
          label={`Controlled Toggle (${checked ? "On" : "Off"})`}
          checked={checked}
          onChange={setChecked}
        />
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Toggle from Outside
        </button>
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
          <Toggle variant="primary" size="small" theme="light" label="Small" />
          <Toggle variant="primary" size="medium" theme="light" label="Medium" />
          <Toggle variant="primary" size="large" theme="light" label="Large" />
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Secondary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Toggle variant="secondary" size="small" theme="light" label="Small" />
          <Toggle variant="secondary" size="medium" theme="light" label="Medium" />
          <Toggle variant="secondary" size="large" theme="light" label="Large" />
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Toggle variant="tertiary" size="small" theme="light" label="Small" />
          <Toggle variant="tertiary" size="medium" theme="light" label="Medium" />
          <Toggle variant="tertiary" size="large" theme="light" label="Large" />
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
          <Toggle variant="primary" size="small" theme="dark" label="Small" />
          <Toggle variant="primary" size="medium" theme="dark" label="Medium" />
          <Toggle variant="primary" size="large" theme="dark" label="Large" />
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
          <Toggle variant="secondary" size="small" theme="dark" label="Small" />
          <Toggle variant="secondary" size="medium" theme="dark" label="Medium" />
          <Toggle variant="secondary" size="large" theme="dark" label="Large" />
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
          <Toggle variant="tertiary" size="small" theme="dark" label="Small" />
          <Toggle variant="tertiary" size="medium" theme="dark" label="Medium" />
          <Toggle variant="tertiary" size="large" theme="dark" label="Large" />
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
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {themes.map((theme) => (
          <div
            key={theme}
            style={{
              padding: "24px",
              borderRadius: "8px",
              backgroundColor: theme === "dark" ? "#1c1c1c" : "#ffffff",
            }}
          >
            <h2
              style={{
                marginBottom: "24px",
                fontSize: "18px",
                fontWeight: 700,
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
            >
              {theme.toUpperCase()} Theme
            </h2>

            {variants.map((variant) => (
              <div key={variant} style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    marginBottom: "12px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: theme === "dark" ? "#e4e4e4" : "#333333",
                  }}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {sizes.map((size) => (
                    <Toggle
                      key={size}
                      variant={variant}
                      size={size}
                      theme={theme}
                      label={`${size.charAt(0).toUpperCase() + size.slice(1)} Toggle`}
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
