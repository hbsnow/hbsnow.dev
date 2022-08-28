import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type IconType = "activity" | "partAlternationMark" | "blog" | "pencil";

type Props = Readonly<
  PropsWithChildren<{
    name: IconType;
  }> &
    Omit<ComponentPropsWithoutRef<"svg">, "className" | "role" | "viewBox">
>;

export const ColoredIcon = (props: Props): JSX.Element => {
  const { name, ...rest } = props;

  const svgRestProps = {
    width: 32,
    height: 32,
    fill: "currentColor",
    viewBox: "0 0 32 32",
    role: "img",
    ...rest,
  };

  switch (name) {
    case "activity":
    case "partAlternationMark":
      return (
        <svg {...svgRestProps}>
          <path
            d="M28.5009 28.2204C27.8934 28.2204 27.3215 27.8479 27.0971 27.2454L20.0452 8.34852L15.8934 13.9916C15.5665 14.436 15.0421 14.7023 14.4909 14.7041C14.489 14.7041 14.4871 14.7041 14.4859 14.7041C13.9365 14.7041 13.4127 14.4416 13.084 14.0004L8.86148 8.33414L4.88085 17.846C4.56148 18.6098 3.68335 18.9691 2.92023 18.6498C2.1571 18.3304 1.7971 17.4523 2.11648 16.6891L6.9421 5.15726C7.18398 4.57976 7.72023 4.17351 8.3421 4.09664C8.96335 4.02039 9.58273 4.28476 9.95648 4.78726L14.479 10.8566L18.9996 4.71226C19.3802 4.19476 20.0121 3.92851 20.649 4.01664C21.2859 4.10539 21.8209 4.53476 22.0452 5.13664L29.904 26.1966C30.1934 26.9716 29.7996 27.8348 29.024 28.1241C28.8521 28.1898 28.6752 28.2204 28.5009 28.2204Z"
            fill="#FFB02E"
          />
        </svg>
      );
    case "blog":
    case "pencil":
      return (
        <svg {...svgRestProps}>
          <path
            d="M16.6352 7.58545L21.1451 10.1198L23.7063 14.6565L9.36953 28.9933L4.50768 26.4228L2.29846 21.9222L16.6352 7.58545Z"
            fill="#FF822D"
          />
          <path
            d="M1.3895 28.0652L1.97165 29.377L3.22663 29.9024L9.35704 28.9771L2.31475 21.9348L1.3895 28.0652Z"
            fill="#FFCE7C"
          />
          <path
            d="M1.06291 30.2289L1.38948 28.0652L3.22659 29.9023L1.06291 30.2289Z"
            fill="#402A32"
          />
          <path
            d="M22.2761 1.94443C23.0572 1.16338 24.3235 1.16338 25.1045 1.94443L29.3472 6.18707C30.1282 6.96812 30.1282 8.23445 29.3472 9.0155L25.8117 12.551L21.2845 10.2869L18.7406 5.47996L22.2761 1.94443Z"
            fill="#F92F60"
          />
          <path
            d="M18.7406 5.47998L25.8117 12.551L23.6903 14.6724L16.6193 7.6013L18.7406 5.47998Z"
            fill="#D3D3D3"
          />
        </svg>
      );
  }
};
