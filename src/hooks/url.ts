import "dayjs/locale/ja";

import { useMemo } from "react";

import dayjs from "dayjs";

dayjs.locale("ja");

export const useFullPath = (path: string): string =>
  useMemo(() => new URL(path, "https://hbsnow.dev").href, [path]);

export const useOgpImagePath = (message: string): string =>
  useMemo(() => {
    const image = `${message.replace(" | hbsnow.dev", "")}.png`;
    const url = new URL(
      encodeURIComponent(image),
      "https://hbsnow-og-image.now.sh"
    );
    url.searchParams.append("theme", "light");
    url.searchParams.append("md", "0");
    url.searchParams.append("fontSize", "100px");
    url.searchParams.append(
      "images",
      "https://hbsnow.dev/assets/img/site-icons/icon.svg"
    );

    return url.href;
  }, [message]);
