import '@testing-library/jest-dom';

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveFocus(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveStyle(style: Record<string, any>): R;
      toBeVisible(): R;
      toBeEnabled(): R;
      toBeDisabled(): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveValue(value?: string | number | string[]): R;
      toHaveDisplayValue(value: string | string[]): R;
      toBeSelected(): R;
      toBeRequired(): R;
      toBeInvalid(): R;
      toBeValid(): R;
      toHaveAccessibleName(name?: string): R;
      toHaveAccessibleDescription(description?: string): R;
      toHaveTextContent(text?: string): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
      toHaveErrorMessage(message?: string): R;
    }
  }
}
