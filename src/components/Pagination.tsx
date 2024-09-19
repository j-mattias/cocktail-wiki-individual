interface IPaginationProps {
  numPages: number;
  handleClick: (page: string) => void;
  currentPage: number;
}

export function Pagination({
  numPages,
  handleClick,
  currentPage,
}: IPaginationProps) {
  const pages = [];

  // Calculate the amount of pages the total amount of posts will require
  for (let i = 1; i <= numPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          className={page === currentPage ? "activePage" : ""}
          key={page}
          onClick={() => handleClick(page.toString())}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
