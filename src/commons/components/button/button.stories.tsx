import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta = {
  title: "Commons/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "버튼의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "버튼의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "버튼의 테마",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "primary",
    size: "medium",
    theme: "light",
    disabled: false,
  },
};

// 3. All Variants - variant 비교
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
};

// 4. All Sizes - size 비교
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

// 5. Light Theme - 모든 조합 (Light)
export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Primary Variant */}
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Primary (Light)
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant="primary" size="small" theme="light">
            Small
          </Button>
          <Button variant="primary" size="medium" theme="light">
            Medium
          </Button>
          <Button variant="primary" size="large" theme="light">
            Large
          </Button>
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Secondary (Light)
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant="secondary" size="small" theme="light">
            Small
          </Button>
          <Button variant="secondary" size="medium" theme="light">
            Medium
          </Button>
          <Button variant="secondary" size="large" theme="light">
            Large
          </Button>
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary (Light)
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant="tertiary" size="small" theme="light">
            Small
          </Button>
          <Button variant="tertiary" size="medium" theme="light">
            Medium
          </Button>
          <Button variant="tertiary" size="large" theme="light">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 6. Dark Theme - 모든 조합 (Dark)
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Primary Variant */}
      <div>
        <h3
          style={{
            marginBottom: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Primary (Dark)
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant="primary" size="small" theme="dark">
            Small
          </Button>
          <Button variant="primary" size="medium" theme="dark">
            Medium
          </Button>
          <Button variant="primary" size="large" theme="dark">
            Large
          </Button>
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3
          style={{
            marginBottom: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Secondary (Dark)
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant="secondary" size="small" theme="dark">
            Small
          </Button>
          <Button variant="secondary" size="medium" theme="dark">
            Medium
          </Button>
          <Button variant="secondary" size="large" theme="dark">
            Large
          </Button>
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3
          style={{
            marginBottom: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Tertiary (Dark)
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant="tertiary" size="small" theme="dark">
            Small
          </Button>
          <Button variant="tertiary" size="medium" theme="dark">
            Medium
          </Button>
          <Button variant="tertiary" size="large" theme="dark">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 7. Disabled State - 비활성 상태
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary Disabled
      </Button>
    </div>
  ),
};

// 8. All Combinations - 18개 모든 조합 (3x3x2)
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
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={variant}
                      size={size}
                      theme={theme}
                    >
                      {size}
                    </Button>
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
