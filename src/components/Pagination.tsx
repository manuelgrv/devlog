import { ReactElement } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonType = "left" | "right" | "number";

interface PaginationButtonProps {
  buttonType: ButtonType;
  pageNumber?: number;
  disabled?: boolean;
  onClick: () => void;
  className?: string | string[];
}

function PaginationButton({
  buttonType,
  pageNumber,
  disabled,
  onClick,
  className,
}: PaginationButtonProps): ReactElement {
  return (
    <button
      className={clsx(
        "px-2",
        "py-1",
        "rounded",
        "transition-colors duration-200",
        "text-gruvbox-faded_blue dark:text-gruvbox-light2",
        disabled && "opacity-50",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonType === "left" ? (
        <ChevronLeft />
      ) : buttonType === "right" ? (
        <ChevronRight />
      ) : (
        pageNumber || ""
      )}
    </button>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): ReactElement {
  const getPages = (): number[] => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <nav
      className={clsx(
        "mx-auto",
        "flex",
        "flex-wrap",
        "w-full",
        "justify-center",
        "items-center",
        "space-x-2",
      )}
    >
      <PaginationButton
        buttonType="left"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pages.map((page) => (
        <PaginationButton
          key={page}
          buttonType="number"
          pageNumber={page}
          onClick={() => onPageChange(page)}
          className={clsx(
            "rounded",
            "transition-colors duration-200",
            currentPage === page
              ? "bg-gruvbox-bright_blue/30 text-gruvbox-neutral_blue dark:bg-gruvbox-dark2"
              : "bg-transparent text-gruvbox-neutra_blue dark:text-gruvbox-light1 hover:bg-gruvbox-light1/20",
          )}
        />
      ))}

      <PaginationButton
        buttonType="right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
}
