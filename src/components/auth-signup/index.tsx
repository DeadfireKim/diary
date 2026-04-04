"use client";

import Link from "next/link";
import Input from "@/commons/components/input";
import Button from "@/commons/components/button";
import { routes } from "@/commons/constants/url";
import { useSignupForm } from "./hooks/index.form.hook";
import styles from "./styles.module.css";

export default function AuthSignup() {
  const { register, handleSubmit, errors, isValid, isPending } = useSignupForm();

  return (
    <div className={styles.container} data-testid="signup-container">
      <div className={styles.card}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className={styles.logoText}>Diary</span>
          </div>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>감정 일기로 나만의 하루를 기록해보세요</p>
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
            data-testid="signup-email-input"
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
            data-testid="signup-password-input"
            {...register("password")}
          />
          <Input
            variant="primary"
            size="medium"
            theme="light"
            type="password"
            label="비밀번호 재입력"
            placeholder="비밀번호를 다시 입력해주세요"
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            data-testid="signup-password-confirm-input"
            {...register("passwordConfirm")}
          />
          <Input
            variant="primary"
            size="medium"
            theme="light"
            type="text"
            label="이름"
            placeholder="이름을 입력해주세요"
            error={!!errors.name}
            helperText={errors.name?.message}
            data-testid="signup-name-input"
            {...register("name")}
          />

          <div className={styles.buttonWrap}>
            <Button
              variant="primary"
              size="medium"
              theme="light"
              className={styles.submitButton}
              type="submit"
              disabled={!isValid || isPending}
              data-testid="signup-submit-button"
            >
              {isPending ? "가입 중..." : "회원가입"}
            </Button>
          </div>
        </form>

        {/* 로그인 이동 */}
        <div className={styles.footer}>
          <span className={styles.loginPrompt}>이미 계정이 있으신가요?</span>
          <Link href={routes.login.path} className={styles.loginLink}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
