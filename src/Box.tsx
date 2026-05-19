type BoxProps = {
  children: React.ReactNode;
};

export function Box({ children }: BoxProps) {
  return <div className="box">{children}</div>;
}