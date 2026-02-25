import type { Meta, StoryObj } from "@storybook/react";
import Input from "./index";

const meta = {
  title: "Commons/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "입력 필드의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "입력 필드의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "입력 필드의 테마",
    },
    label: {
      control: "text",
      description: "레이블 텍스트",
    },
    helperText: {
      control: "text",
      description: "도움말 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    label: "Label",
    placeholder: "Placeholder",
    helperText: "This is helper text",
    error: false,
    disabled: false,
  },
};

// 3. With Label - 레이블 포함
export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
  },
};

// 4. With Helper Text - 도움말 포함
export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "Username must be 4-20 characters",
  },
};

// 5. Error State - 에러 상태
export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "Please enter a valid email address",
    error: true,
    value: "invalid-email",
  },
};

// 6. Disabled - 비활성 상태
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This is disabled",
    disabled: true,
  },
};

// 7. All Variants - variant 비교
export const AllVariants: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "300px" }}>
      <Input variant="primary" placeholder="Primary variant" />
      <Input variant="secondary" placeholder="Secondary variant" />
      <Input variant="tertiary" placeholder="Tertiary variant" />
    </div>
  ),
};

// 8. All Sizes - size 비교
export const AllSizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "300px" }}>
      <Input size="small" placeholder="Small size" />
      <Input size="medium" placeholder="Medium size" />
      <Input size="large" placeholder="Large size" />
    </div>
  ),
};

// 9. Light Theme - 모든 조합 (Light)
export const LightTheme: Story = {
  args: {},
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "400px" }}>
      {/* Primary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Primary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Input
            variant="primary"
            size="small"
            theme="light"
            label="Small"
            placeholder="Small input"
            helperText="This is a small input"
          />
          <Input
            variant="primary"
            size="medium"
            theme="light"
            label="Medium"
            placeholder="Medium input"
            helperText="This is a medium input"
          />
          <Input
            variant="primary"
            size="large"
            theme="light"
            label="Large"
            placeholder="Large input"
            helperText="This is a large input"
          />
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Secondary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Input
            variant="secondary"
            size="small"
            theme="light"
            label="Small"
            placeholder="Small input"
          />
          <Input
            variant="secondary"
            size="medium"
            theme="light"
            label="Medium"
            placeholder="Medium input"
          />
          <Input
            variant="secondary"
            size="large"
            theme="light"
            label="Large"
            placeholder="Large input"
          />
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Input
            variant="tertiary"
            size="small"
            theme="light"
            label="Small"
            placeholder="Small input"
          />
          <Input
            variant="tertiary"
            size="medium"
            theme="light"
            label="Medium"
            placeholder="Medium input"
          />
          <Input
            variant="tertiary"
            size="large"
            theme="light"
            label="Large"
            placeholder="Large input"
          />
        </div>
      </div>
    </div>
  ),
};

// 10. Dark Theme - 모든 조합 (Dark)
export const DarkTheme: Story = {
  args: {},
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "400px" }}>
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
          <Input
            variant="primary"
            size="small"
            theme="dark"
            label="Small"
            placeholder="Small input"
            helperText="This is a small input"
          />
          <Input
            variant="primary"
            size="medium"
            theme="dark"
            label="Medium"
            placeholder="Medium input"
            helperText="This is a medium input"
          />
          <Input
            variant="primary"
            size="large"
            theme="dark"
            label="Large"
            placeholder="Large input"
            helperText="This is a large input"
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
          <Input
            variant="secondary"
            size="small"
            theme="dark"
            label="Small"
            placeholder="Small input"
          />
          <Input
            variant="secondary"
            size="medium"
            theme="dark"
            label="Medium"
            placeholder="Medium input"
          />
          <Input
            variant="secondary"
            size="large"
            theme="dark"
            label="Large"
            placeholder="Large input"
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
          <Input
            variant="tertiary"
            size="small"
            theme="dark"
            label="Small"
            placeholder="Small input"
          />
          <Input
            variant="tertiary"
            size="medium"
            theme="dark"
            label="Medium"
            placeholder="Medium input"
          />
          <Input
            variant="tertiary"
            size="large"
            theme="dark"
            label="Large"
            placeholder="Large input"
          />
        </div>
      </div>
    </div>
  ),
};

// 11. Error States - 에러 상태 모음
export const ErrorStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "400px" }}>
      <Input
        variant="primary"
        label="Email"
        placeholder="email@example.com"
        value="invalid"
        error
        helperText="Please enter a valid email"
      />
      <Input
        variant="secondary"
        label="Password"
        type="password"
        value="123"
        error
        helperText="Password must be at least 8 characters"
      />
      <Input
        variant="tertiary"
        label="Username"
        value="a"
        error
        helperText="Username must be at least 4 characters"
      />
    </div>
  ),
};

// 12. All Combinations - 18개 모든 조합
export const AllCombinations: Story = {
  args: {},
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
              minWidth: "500px",
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
                    <Input
                      key={size}
                      variant={variant}
                      size={size}
                      theme={theme}
                      label={`${size.charAt(0).toUpperCase() + size.slice(1)} Input`}
                      placeholder={`Enter ${size} text...`}
                      helperText={`This is a ${size} ${variant} input`}
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
