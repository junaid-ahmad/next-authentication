"use client";

import { useState } from "react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";

const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  let PasswordIcon = isPasswordVisible ? EyeSlashIcon : EyeIcon;

  return (
    <form className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md">
      <Input label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input
        label="Email"
        className="col-span-2"
        type="email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        label="Phone"
        className="col-span-2"
        startContent={<PhoneIcon className="w-4" />}
      />
      <Input
        label="Password"
        className="col-span-2"
        type={isPasswordVisible ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={
          <PasswordIcon
            className="w-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        }
      />
      <Input
        label="Confirm Password"
        className="col-span-2"
        type={isPasswordVisible ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
      />
      <Checkbox className="col-span-2">
        I accept the <Link href="/terms">Terms</Link>{" "}
      </Checkbox>
      <div className="flex justify-center col-span-2">
        <Button type="submit" color="primary" className="w-48">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
