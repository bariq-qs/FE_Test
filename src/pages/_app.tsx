import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ThemeProvider from "@/app/provider/Theme";
import "@/app/styles/css/tailwind.css";
import "@/app/styles/scss/main.scss";
import DefaultLayout from "@/app/layouts/Default";
import SnackbarProvider from "react-simple-snackbar";
import { Poppins } from "next/font/google";
import "devextreme/dist/css/dx.light.css";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: ExtendedAppProps) => {
  // useEffect(() => {
  //   const devEx = document.querySelectorAll("dx-license");
  //   devEx.forEach((elem) => {
  //     elem.style.display = 'none'
  //   });
  // }, []);
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    // <body className={poppins.className}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnackbarProvider>
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // </body>
  );
};

export default MyApp;
