export const ogpImagePath = (message: string) => {
  const image = `${message}.png`;
  const url = new URL(
    encodeURIComponent(image),
    "https://hbsnow-og-image.now.sh"
  );
  url.searchParams.append("theme", "light");
  url.searchParams.append("md", "0");
  url.searchParams.append("fontSize", "100px");
  url.searchParams.append(
    "images",
    "https://hbsnow.dev/assets/img/logo/icon.svg"
  );

  return url.href;
};
