import { SVGProps, FC } from "react";

export const EarthIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      d="M11.99 2.38703C6.47 2.38703 2 6.86703 2 12.387C2 17.907 6.47 22.387 11.99 22.387C17.52 22.387 22 17.907 22 12.387C22 6.86703 17.52 2.38703 11.99 2.38703ZM18.92 8.38703H15.97C15.65 7.13703 15.19 5.93703 14.59 4.82703C16.43 5.45703 17.96 6.73703 18.92 8.38703ZM12 4.42703C12.83 5.62703 13.48 6.95703 13.91 8.38703H10.09C10.52 6.95703 11.17 5.62703 12 4.42703ZM4.26 14.387C4.1 13.747 4 13.077 4 12.387C4 11.697 4.1 11.027 4.26 10.387H7.64C7.56 11.047 7.5 11.707 7.5 12.387C7.5 13.067 7.56 13.727 7.64 14.387H4.26ZM5.08 16.387H8.03C8.35 17.637 8.81 18.837 9.41 19.947C7.57 19.317 6.04 18.047 5.08 16.387ZM8.03 8.38703H5.08C6.04 6.72703 7.57 5.45703 9.41 4.82703C8.81 5.93703 8.35 7.13703 8.03 8.38703ZM12 20.347C11.17 19.147 10.52 17.817 10.09 16.387H13.91C13.48 17.817 12.83 19.147 12 20.347ZM14.34 14.387H9.66C9.57 13.727 9.5 13.067 9.5 12.387C9.5 11.707 9.57 11.037 9.66 10.387H14.34C14.43 11.037 14.5 11.707 14.5 12.387C14.5 13.067 14.43 13.727 14.34 14.387ZM14.59 19.947C15.19 18.837 15.65 17.637 15.97 16.387H18.92C17.96 18.037 16.43 19.317 14.59 19.947ZM16.36 14.387C16.44 13.727 16.5 13.067 16.5 12.387C16.5 11.707 16.44 11.047 16.36 10.387H19.74C19.9 11.027 20 11.697 20 12.387C20 13.077 19.9 13.747 19.74 14.387H16.36Z"
      fill="black"
    />
  </svg>
);