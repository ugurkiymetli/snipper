import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SnackbarProvider } from "notistack";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Component {...pageProps} />;
    </SnackbarProvider>
  );
};

export default api.withTRPC(MyApp);
