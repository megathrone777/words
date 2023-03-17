export interface TProps {
  currentPage: number;
  onPageChange: (selectedPage: { selected: number }) => void;
  pageCount: number;
}
