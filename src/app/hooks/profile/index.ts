import { profileSetup } from "@/app/server_actions/profile";
import { ChangeEvent, useState } from "react";
import { useErrorHandler } from "../common/error";
import { useSearchParams, useRouter } from "next/navigation";

export const useProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    organization: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const { handleError } = useErrorHandler();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const continueUrl = searchParams.get("continueUrl");
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      await profileSetup(profile);
      setIsDisabled(true);
      push(continueUrl || "/home");
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  return {
    profile,
    isDisabled,
    handleProfileChange,
    handleFormSubmit,
  };
};
