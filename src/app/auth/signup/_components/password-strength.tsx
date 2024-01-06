import { cn } from "clsx-tailwind-merge";

type Props = {
  passStrength: number;
};

export const PasswordStrength = ({ passStrength }: Props) => {
  let strength: "Weaker" | "Weak" | "Strong" | "Stronger";
  switch (passStrength) {
    case 0:
      strength = "Weaker";
      break;
    case 1:
      strength = "Weak";
      break;
    case 2:
      strength = "Strong";
      break;
    case 3:
      strength = "Stronger";
      break;

    default:
      strength = "Weaker";
  }
  return (
    <div
      className={cn(
        "col-span-2 rounded-full text-xs text-center",
        {
          "bg-red-600": passStrength === 0,
          "bg-orange-600": passStrength === 1,
          "bg-yellow-600": passStrength === 2,
          "bg-green-600": passStrength === 3,
        },
        {
          "w-1/4": passStrength === 0,
          "w-1/2": passStrength === 1,
          "w-3/4": passStrength === 2,
          "w-full": passStrength === 3,
        }
      )}
    >
      {strength}
    </div>
  );
};
