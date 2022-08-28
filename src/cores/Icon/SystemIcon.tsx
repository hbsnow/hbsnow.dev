import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type IconType = "twitter" | "arrowLeft" | "arrowRight" | "quote" | "star";

type Props = Readonly<
  PropsWithChildren<{
    name: IconType;
  }> &
    Omit<ComponentPropsWithoutRef<"svg">, "className" | "role" | "viewBox">
>;

export const SystemIcon = (props: Props): JSX.Element => {
  const { name, ...rest } = props;

  const svgRestProps = {
    width: 24,
    height: 24,
    fill: "currentColor",
    viewBox: "0 0 24 24",
    role: "img",
    ...rest,
  };

  switch (name) {
    case "arrowLeft":
      return (
        <svg {...svgRestProps}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...svgRestProps}>
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          <path d="M0 0h24v24H0V0z" fill="none" />
        </svg>
      );
    case "quote":
      return (
        <svg {...svgRestProps}>
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    case "star":
      return (
        <svg {...svgRestProps}>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...svgRestProps}>
          <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
        </svg>
      );
  }
};
