import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
        heading: ["var(--font-poppins)", ...fontFamily.sans],
        proxima: ["Proxima Nova", "var(--font-roboto)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
