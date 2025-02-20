type TProps = { isLoading: boolean; children: React.ReactNode };

export const Button = ({ isLoading, children }: TProps) => (
  <button type="submit" disabled={isLoading}>
    {isLoading ? "Submitting..." : children}
  </button>
);
