import ReduxWrapper from "@/redux/ReduxWrapper";
import ThemeRegistry from "../theme/ThemeRegistry";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ReduxWrapper>
      </body>
    </html>
  );
}
