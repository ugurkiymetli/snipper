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
      <div className="bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Component {...pageProps} />;
      </div>
    </SnackbarProvider>
  );
};

export default api.withTRPC(MyApp);
