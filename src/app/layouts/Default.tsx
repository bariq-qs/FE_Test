import { PropsWithChildren } from "react";
import "@/app/styles/scss/layouts/default.scss";
import DefaultHeader from "../components/header/DefaultHeader";
import DefaultSidebar from "../components/sidebar/Default";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='wrap-default-layout'>
      <DefaultHeader />
      <DefaultSidebar />
      <div className='main'>{children}</div>
    </div>
  );
};

export default DefaultLayout;
