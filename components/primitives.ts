import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      velvet: "from-[#833137] to-[#d47478]",
      brown: "from-[#c78688] to-[#d47478]",
      pink: "from-[#d1afc6] to-[#db9d97]",
      blue: "from-[#738592] to-[#4b5c6c]",
      white: "from-[#fef9ff] to-[#fef9ff]",
      pale: "from-[#e8ded4] to-[#e8ded4]",
      purple: "from-[#5d4e5f] to-[#5d4e5f]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },

    size: {
      card: "text-[1.2rem] sm:text-[1.4rem] md:text-[1.4rem] lg:text-[1.4rem]",
      sm: "text-[1.5rem] lg:text-[1.7rem]",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "pale",
        "velvet",
        "purple",
        "brown",
        "pink",
        "blue",
        "white",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
