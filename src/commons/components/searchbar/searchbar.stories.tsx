import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Searchbar from "./index";

const meta = {
  title: "Commons/Searchbar",
  component: Searchbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "검색바의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "검색바의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "검색바의 테마",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    showClearButton: {
      control: "boolean",
      description: "클리어 버튼 표시",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태",
    },
  },
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - 기본 상태
export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

// 2. Playground - 모든 props 제어 가능
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    placeholder: "Search for anything...",
    showClearButton: true,
    disabled: false,
  },
};

// 3. With Value - 값이 입력된 상태
export const WithValue: Story = {
  args: {
    defaultValue: "Search query",
    placeholder: "Search...",
  },
};

// 4. Without Clear Button - 클리어 버튼 없음
export const WithoutClearButton: Story = {
  args: {
    placeholder: "Search...",
    showClearButton: false,
  },
};

// 5. Disabled - 비활성 상태
export const Disabled: Story = {
  args: {
    placeholder: "Search...",
    disabled: true,
  },
};

// 6. All Variants - variant 비교
export const AllVariants: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "400px" }}>
      <Searchbar variant="primary" placeholder="Primary variant" />
      <Searchbar variant="secondary" placeholder="Secondary variant" />
      <Searchbar variant="tertiary" placeholder="Tertiary variant" />
    </div>
  ),
};

// 7. All Sizes - size 비교
export const AllSizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "400px" }}>
      <Searchbar size="small" placeholder="Small size" />
      <Searchbar size="medium" placeholder="Medium size" />
      <Searchbar size="large" placeholder="Large size" />
    </div>
  ),
};

// 8. Interactive - 인터랙티브 예제
export const Interactive: Story = {
  args: {},
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      console.log("Searching for:", value);
      // 시뮬레이션: 검색 결과
      setSearchResults([
        `Result 1 for "${value}"`,
        `Result 2 for "${value}"`,
        `Result 3 for "${value}"`,
      ]);
    };

    const handleClear = () => {
      console.log("Cleared");
      setSearchValue("");
      setSearchResults([]);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "400px" }}>
        <Searchbar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Type to search..."
        />

        {searchResults.length > 0 && (
          <div
            style={{
              padding: "16px",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
              Search Results:
            </h4>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {searchResults.map((result, index) => (
                <li key={index} style={{ fontSize: "14px", marginBottom: "4px" }}>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

// 9. Light Theme - 모든 조합 (Light)
export const LightTheme: Story = {
  args: {},
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "450px" }}>
      {/* Primary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Primary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Searchbar
            variant="primary"
            size="small"
            theme="light"
            placeholder="Small search"
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="Medium search"
          />
          <Searchbar
            variant="primary"
            size="large"
            theme="light"
            placeholder="Large search"
          />
        </div>
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Secondary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Searchbar
            variant="secondary"
            size="small"
            theme="light"
            placeholder="Small search"
          />
          <Searchbar
            variant="secondary"
            size="medium"
            theme="light"
            placeholder="Medium search"
          />
          <Searchbar
            variant="secondary"
            size="large"
            theme="light"
            placeholder="Large search"
          />
        </div>
      </div>

      {/* Tertiary Variant */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
          Tertiary (Light)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Searchbar
            variant="tertiary"
            size="small"
            theme="light"
            placeholder="Small search"
          />
          <Searchbar
            variant="tertiary"
            size="medium"
            theme="light"
            placeholder="Medium search"
          />
          <Searchbar
            variant="tertiary"
            size="large"
            theme="light"
            placeholder="Large search"
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
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: "450px" }}>
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
          <Searchbar
            variant="primary"
            size="small"
            theme="dark"
            placeholder="Small search"
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="dark"
            placeholder="Medium search"
          />
          <Searchbar
            variant="primary"
            size="large"
            theme="dark"
            placeholder="Large search"
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
          <Searchbar
            variant="secondary"
            size="small"
            theme="dark"
            placeholder="Small search"
          />
          <Searchbar
            variant="secondary"
            size="medium"
            theme="dark"
            placeholder="Medium search"
          />
          <Searchbar
            variant="secondary"
            size="large"
            theme="dark"
            placeholder="Large search"
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
          <Searchbar
            variant="tertiary"
            size="small"
            theme="dark"
            placeholder="Small search"
          />
          <Searchbar
            variant="tertiary"
            size="medium"
            theme="dark"
            placeholder="Medium search"
          />
          <Searchbar
            variant="tertiary"
            size="large"
            theme="dark"
            placeholder="Large search"
          />
        </div>
      </div>
    </div>
  ),
};

// 11. All Combinations - 18개 모든 조합
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
                    <Searchbar
                      key={size}
                      variant={variant}
                      size={size}
                      theme={theme}
                      placeholder={`Search ${size}...`}
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
