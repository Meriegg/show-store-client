const Layout = ({
  children,
  checkout,
}: {
  children: React.ReactNode;
  checkout: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {checkout}
    </>
  );
};

export default Layout;
