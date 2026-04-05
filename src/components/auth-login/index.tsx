"use client";

import Link from "next/link";
import Input from "@/commons/components/input";
import Button from "@/commons/components/button";
import { routes } from "@/commons/constants/url";
import { useLoginForm } from "./hooks/index.form.hook";
import styles from "./styles.module.css";

export default function AuthLogin() {
  const { register, handleSubmit, errors, isValid, isPending } = useLoginForm();

  return (
    <div className={styles.container} data-testid="login-container">
      <div className={styles.card}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className={styles.logoText}>Diary</span>
          </div>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>나만의 감정 일기를 시작해보세요</p>
        </div>

        {/* 폼 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            variant="primary"
            size="medium"
            theme="light"
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            error={!!errors.email}
            helperText={errors.email?.message}
            data-testid="login-email-input"
            {...register("email")}
          />
          <Input
            variant="primary"
            size="medium"
            theme="light"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            error={!!errors.password}
            helperText={errors.password?.message}
            data-testid="login-password-input"
            {...register("password")}
          />

          <div className={styles.buttonWrap}>
            <Button
              variant="primary"
              size="medium"
              theme="light"
              className={styles.submitButton}
              type="submit"
              disabled={!isValid || isPending}
              data-testid="login-submit-button"
            >
              {isPending ? "로그인 중..." : "로그인"}
            </Button>
          </div>
        </form>

        {/* 회원가입 이동 */}
        <div className={styles.footer}>
          <span className={styles.signupPrompt}>아직 계정이 없으신가요?</span>
          <Link href={routes.signup.path} className={styles.signupLink}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
