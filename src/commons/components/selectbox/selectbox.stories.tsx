import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Selectbox, { SelectOption } from "./index";

const fruitOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "kr", label: "South Korea" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

const priorityOptions: SelectOption[] = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent", disabled: true },
];

const meta = {
  title: "Commons/Selectbox",
  component: Selectbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "셀렉트박스의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "셀렉트박스의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "셀렉트박스의 테마",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태",
    },
  },
} satisfies Meta<typeof Selectbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit",
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    options: fruitOptions,
    placeholder: "Choose an option",
    error: false,
    disabled: false,
  },
};

// 3. With Default Value - 기본값 설정
export const WithDefaultValue: Story = {
  args: {
    options: fruitOptions,
    defaultValue: "banana",
    placeholder: "Select a fruit",
  },
};

// 4. Disabled Options - 비활성 옵션 포함
export const DisabledOptions: Story = {
  args: {
    options: priorityOptions,
    placeholder: "Select priority",
  },
};

// 5. Error State - 에러 상태
export const ErrorState: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select country",
    error: true,
    value: "",
  },
};

// 6. Disabled - 비활성 상태
export const Disabled: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit",
    disabled: true,
  },
};

// 7. All Variants - variant 비교
export const AllVariants: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "300px" }}>
      <Selectbox
        variant="primary"
        options={fruitOptions}
        placeholder="Primary variant"
      />
      <Selectbox
        variant="secondary"
        options={fruitOptions}
        placeholder="Secondary variant"
      />
      <Selectbox
        variant="tertiary"
        options={fruitOptions}
        placeholder="Tertiary variant"
      />
    </div>
  ),
};

// 8. All Sizes - size 비교
export const AllSizes: Story = {
  args: { options: [] },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "300px" }}>
      <Selectbox
        size="small"
        options={fruitOptions}
        placeholder="Small size"
      />
      <Selectbox
        size="medium"
        options={fruitOptions}
        placeholder="Medium size"
      />
      <Selectbox
        size="large"
        options={fruitOptions}
        placeholder="Large size"
      />
    </div>
  ),
};

// 9. Controlled - Controlled 모드
export const Controlled: Story = {
  args: { options: [] },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "300px" }}>
        <Selectbox
          options={fruitOptions}
          value={value}
          onChange={setValue}
          placeholder="Select a fruit"
        />
        <div style={{ padding: "12px", background: "#f5f5f5", borderRadius: "4px" }}>
          Selected: <strong>{value || "None"}</strong>
        </div>
        <button
          onClick={() => setValue("")}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Clear Selection
        </button>
      </div>
    );
  },
};

// 10. Light Theme - 모든 조합 (Light)
export const LightTheme: Story = {
  args: { options: [] },
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "350px" }}>
      {/* Primary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Primary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Selectbox
            variant="primary"
            size="small"
            theme="light"
            options={fruitOptions}
            placeholder="Small"
          />
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            options={fruitOptions}
            placeholder="Medium"
          />
          <Selectbox
            variant="primary"
            size="large"
            theme="light"
            options={fruitOptions}
            placeholder="Large"
          />
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Secondary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Selectbox
            variant="secondary"
            size="small"
            theme="light"
            options={countryOptions}
            placeholder="Small"
          />
          <Selectbox
            variant="secondary"
            size="medium"
            theme="light"
            options={countryOptions}
            placeholder="Medium"
          />
          <Selectbox
            variant="secondary"
            size="large"
            theme="light"
            options={countryOptions}
            placeholder="Large"
          />
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Selectbox
            variant="tertiary"
            size="small"
            theme="light"
            options={priorityOptions}
            placeholder="Small"
          />
          <Selectbox
            variant="tertiary"
            size="medium"
            theme="light"
            options={priorityOptions}
            placeholder="Medium"
          />
          <Selectbox
            variant="tertiary"
            size="large"
            theme="light"
            options={priorityOptions}
            placeholder="Large"
          />
        </div>
      </div>
    </div>
  ),
};

// 11. Dark Theme - 모든 조합 (Dark)
export const DarkTheme: Story = {
  args: { options: [] },
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "350px" }}>
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
          <Selectbox
            variant="primary"
            size="small"
            theme="dark"
            options={fruitOptions}
            placeholder="Small"
          />
          <Selectbox
            variant="primary"
            size="medium"
            theme="dark"
            options={fruitOptions}
            placeholder="Medium"
          />
          <Selectbox
            variant="primary"
            size="large"
            theme="dark"
            options={fruitOptions}
            placeholder="Large"
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
          <Selectbox
            variant="secondary"
            size="small"
            theme="dark"
            options={countryOptions}
            placeholder="Small"
          />
          <Selectbox
            variant="secondary"
            size="medium"
            theme="dark"
            options={countryOptions}
            placeholder="Medium"
          />
          <Selectbox
            variant="secondary"
            size="large"
            theme="dark"
            options={countryOptions}
            placeholder="Large"
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
          <Selectbox
            variant="tertiary"
            size="small"
            theme="dark"
            options={priorityOptions}
            placeholder="Small"
          />
          <Selectbox
            variant="tertiary"
            size="medium"
            theme="dark"
            options={priorityOptions}
            placeholder="Medium"
          />
          <Selectbox
            variant="tertiary"
            size="large"
            theme="dark"
            options={priorityOptions}
            placeholder="Large"
          />
        </div>
      </div>
    </div>
  ),
};

// 12. All Combinations - 18개 모든 조합
export const AllCombinations: Story = {
  args: { options: [] },
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
              minWidth: "400px",
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
                    <Selectbox
                      key={size}
                      variant={variant}
                      size={size}
                      theme={theme}
                      options={fruitOptions}
                      placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} Selectbox`}
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
