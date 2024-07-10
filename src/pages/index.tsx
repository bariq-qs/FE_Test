import { ReactNode } from "react";

type TIndexPageProps = {
  children: ReactNode;
};

const IndexPage = ({ children }: TIndexPageProps) => {
  console.log('loaded index')
  return <div style={{ color: "black" }}>Ini halaman index</div>;
};

export default IndexPage;
