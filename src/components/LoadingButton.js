import React from "react";

const LoadingButton = ({
  loading = false,
  disabled = false,
  loadingText,
  children,
  type = "button",
  className = "",
  onClick,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-busy={loading ? "true" : undefined}
      onClick={handleClick}
      className={className}
    >
      {loading && (
        <span className="animate-spin material-symbols-outlined text-[18px]" aria-hidden="true">
          refresh
        </span>
      )}
      <span>{loading ? loadingText || children : children}</span>
    </button>
  );
};

export default LoadingButton;
