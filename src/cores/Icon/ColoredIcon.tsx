import {
  memo,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
} from "react";

type IconType = "activity" | "blog" | "certification" | "event" | "file";

type Props = Readonly<
  PropsWithChildren<{
    name: IconType;
  }> &
    Omit<ComponentPropsWithoutRef<"svg">, "className" | "role" | "viewBox">
>;

const Component = (props: Props): JSX.Element => {
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
      // partAlternationMark
      return (
        <svg {...svgRestProps}>
          <path
            d="M28.5009 28.2204C27.8934 28.2204 27.3215 27.8479 27.0971 27.2454L20.0452 8.34852L15.8934 13.9916C15.5665 14.436 15.0421 14.7023 14.4909 14.7041C14.489 14.7041 14.4871 14.7041 14.4859 14.7041C13.9365 14.7041 13.4127 14.4416 13.084 14.0004L8.86148 8.33414L4.88085 17.846C4.56148 18.6098 3.68335 18.9691 2.92023 18.6498C2.1571 18.3304 1.7971 17.4523 2.11648 16.6891L6.9421 5.15726C7.18398 4.57976 7.72023 4.17351 8.3421 4.09664C8.96335 4.02039 9.58273 4.28476 9.95648 4.78726L14.479 10.8566L18.9996 4.71226C19.3802 4.19476 20.0121 3.92851 20.649 4.01664C21.2859 4.10539 21.8209 4.53476 22.0452 5.13664L29.904 26.1966C30.1934 26.9716 29.7996 27.8348 29.024 28.1241C28.8521 28.1898 28.6752 28.2204 28.5009 28.2204Z"
            fill="#FFB02E"
          />
        </svg>
      );
    case "blog":
      // pencil
      return (
        <svg {...svgRestProps}>
          <path
            d="M14.5813 10.3413L19.5188 12.4909L21.6524 17.4124L18.3946 23.9278C17.7671 25.1829 16.6411 26.1165 15.2916 26.5007L3.68028 29.8063C3.26034 29.9259 2.80859 29.8086 2.49985 29.4999C2.19127 29.1913 2.07393 28.7398 2.1932 28.32L5.49368 16.7039C5.87743 15.3533 6.81139 14.2263 8.06724 13.5983L14.5813 10.3413Z"
            fill="#D3D3D3"
          />
          <path
            d="M18.1213 2.56503C18.9024 1.78399 20.1687 1.78399 20.9497 2.56503L29.435 11.0503C30.2161 11.8314 30.2161 13.0977 29.435 13.8787L25.8995 17.4143L18.9973 12.9177L14.5858 6.10057L18.1213 2.56503Z"
            fill="#433B6B"
          />
          <path
            d="M14.5858 6.10059L25.8995 17.4143C24.7279 18.5859 22.8284 18.5859 21.6568 17.4143L14.5858 10.3432C13.4142 9.17165 13.4142 7.27216 14.5858 6.10059Z"
            fill="#FFB02E"
          />
          <path
            d="M11.171 22.2431C12.2861 22.7758 13.6621 22.5803 14.5858 21.6567C15.7573 20.4851 15.7573 18.5857 14.5858 17.4141C13.4142 16.2425 11.5147 16.2425 10.3431 17.4141C9.41947 18.3377 9.22402 19.7138 9.75676 20.829L2.43616 28.1496C2.04563 28.5401 2.04563 29.1733 2.43616 29.5638C2.82668 29.9543 3.45985 29.9543 3.85037 29.5638L11.171 22.2431Z"
            fill="#635994"
          />
        </svg>
      );
    case "certification":
      // Trophy
      return (
        <svg {...svgRestProps}>
          <path
            d="M10.5208 7.52114C10.0012 5.7093 8.1239 4.65179 6.30748 5.15196C6.27354 5.1604 6.20545 5.17748 6.14394 5.19799C3.65095 6.02898 3.45292 9.41201 5.68876 10.6483L10.6585 13.3981C11.0772 13.6298 11.6044 13.4782 11.8361 13.0595C12.0678 12.6408 11.9161 12.1135 11.4974 11.8819L6.52712 9.13168C5.54516 8.58886 5.70443 7.17631 6.68631 6.84385L6.69246 6.84216C6.70347 6.83922 6.7167 6.8359 6.73807 6.83055C6.74577 6.82863 6.75344 6.8266 6.76109 6.82446C7.66072 6.57309 8.59583 7.09488 8.85505 7.99882C8.98695 8.45881 9.46678 8.72477 9.92677 8.59286C10.3868 8.46095 10.6527 7.98112 10.5208 7.52114Z"
            fill="#D3883E"
          />
          <path
            d="M22.4608 7.99882C22.72 7.09488 23.6552 6.57309 24.5548 6.82446C24.5624 6.8266 24.5701 6.82863 24.5778 6.83055C24.5992 6.8359 24.6124 6.83922 24.6234 6.84216L24.6296 6.84385C25.6114 7.17631 25.7704 8.58902 24.7884 9.13185L19.8184 11.8819C19.3997 12.1135 19.2481 12.6408 19.4798 13.0595C19.7115 13.4782 20.2387 13.6298 20.6574 13.3981L25.6274 10.6481C27.8633 9.41184 27.6649 6.02898 25.1719 5.19799C25.1104 5.17748 25.0423 5.1604 25.0084 5.15196C23.192 4.65179 21.3146 5.7093 20.7951 7.52114C20.6632 7.98112 20.9291 8.46095 21.3891 8.59286C21.8491 8.72477 22.3289 8.45881 22.4608 7.99882Z"
            fill="#D3883E"
          />
          <path
            d="M17.328 17.51V13.29H13.9879V17.51C13.9879 18.25 13.658 18.96 13.088 19.43L11.168 21.03H20.1479L18.228 19.43C17.658 18.95 17.328 18.25 17.328 17.51Z"
            fill="#D3883E"
          />
          <path
            d="M15.658 16.54C11.808 16.54 8.68799 13.42 8.68799 9.56999V2.70999C8.68799 2.31999 9.00798 2 9.39798 2H21.928C22.318 2 22.638 2.31999 22.638 2.70999V9.56999C22.638 13.42 19.518 16.54 15.658 16.54Z"
            fill="#FFB02E"
          />
          <path
            d="M22.7923 21.03H8.19719C7.42737 21.03 6.77355 21.54 6.62592 22.25L5.01245 29.34C4.93863 29.67 5.20226 29.98 5.56081 29.98H25.4392C25.7977 29.98 26.0614 29.67 25.9876 29.34L24.3741 22.25C24.2159 21.54 23.5621 21.03 22.7923 21.03Z"
            fill="#6D4534"
          />
          <path
            d="M18.383 23.96H12.617C12.2817 23.96 12.004 24.24 12.004 24.6V26.41C12.004 26.76 12.2721 27.05 12.617 27.05H18.383C18.7183 27.05 18.996 26.77 18.996 26.41V24.6C18.996 24.25 18.7278 23.96 18.383 23.96Z"
            fill="#FFB02E"
          />
        </svg>
      );
    case "event":
      // Sparkles
      return (
        <svg {...svgRestProps}>
          <path
            d="M10.5194 7.0517C10.2265 6.93064 9.99626 6.69861 9.88117 6.41614L8.929 4.25725C8.75112 3.91425 8.23842 3.91425 8.071 4.25725L7.11883 6.41614C6.99327 6.69861 6.76308 6.92055 6.48057 7.0517L5.26682 7.57629C4.91106 7.74779 4.91106 8.24212 5.26682 8.41362L6.48057 8.93821C6.77354 9.05927 7.00374 9.2913 7.11883 9.57377L8.071 11.7427C8.24888 12.0858 8.76158 12.0858 8.929 11.7427L9.88117 9.57377C10.0067 9.2913 10.2369 9.06936 10.5194 8.93821L11.7332 8.41362C12.0889 8.24212 12.0889 7.74779 11.7332 7.57629L10.5194 7.0517Z"
            fill="#F9C23C"
          />
          <path
            d="M25.5744 13.5546C24.7045 13.1673 24.0166 12.4539 23.6525 11.5775L20.7897 4.81023C20.2637 3.72992 18.7363 3.72992 18.2103 4.81023L15.3475 11.5775C14.9733 12.4539 14.2854 13.1673 13.4256 13.5546L9.80419 15.1955C8.73194 15.7254 8.73194 17.2746 9.80419 17.8045L13.4256 19.4454C14.2955 19.8327 14.9834 20.5461 15.3475 21.4225L18.2103 28.1898C18.7363 29.2701 20.2637 29.2701 20.7897 28.1898L23.6525 21.4225C24.0267 20.5461 24.7146 19.8327 25.5744 19.4454L29.1958 17.8045C30.2681 17.2746 30.2681 15.7254 29.1958 15.1955L25.5744 13.5546Z"
            fill="#F9C23C"
          />
          <path
            d="M8.2811 20.3304C8.44173 20.7222 8.73465 21.0258 9.10315 21.2021L10.6528 21.927C11.1157 22.1621 11.1157 22.8379 10.6528 23.073L9.10315 23.7979C8.73465 23.9742 8.44173 24.2876 8.2811 24.6696L7.05276 27.6474C6.82598 28.1175 6.17402 28.1175 5.94724 27.6474L4.7189 24.6696C4.55827 24.2778 4.26535 23.9742 3.89685 23.7979L2.34724 23.073C1.88425 22.8379 1.88425 22.1621 2.34724 21.927L3.89685 21.2021C4.26535 21.0258 4.55827 20.7124 4.7189 20.3304L5.94724 17.3526C6.17402 16.8825 6.82598 16.8825 7.05276 17.3526L8.2811 20.3304Z"
            fill="#F9C23C"
          />
        </svg>
      );
    case "file":
      return (
        <svg {...svgRestProps}>
          <path
            d="M15.385 7.39062L12.9075 4.915C12.3219 4.32875 11.5275 4 10.6987 4H4.125C2.95125 4 2 4.95125 2 6.125V13.5H12.985H30V10.1375C30 8.96375 29.0487 8.0125 27.875 8.0125H16.8875C16.3237 8.0125 15.7838 7.78875 15.385 7.39062Z"
            fill="#FFB02E"
          />
          <path
            d="M27.875 30H4.125C2.95125 30 2 29.0545 2 27.8878V13.1122C2 11.9455 2.95125 11 4.125 11H27.875C29.0487 11 30 11.9455 30 13.1122V27.8878C30 29.0545 29.0487 30 27.875 30Z"
            fill="#FCD53F"
          />
        </svg>
      );
  }
};

export const ColoredIcon = memo(Component);
