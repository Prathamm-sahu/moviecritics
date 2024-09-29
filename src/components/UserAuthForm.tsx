import { FC, useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface UserAuthFormProps {}

const UserAuthForm: FC<UserAuthFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const {toast} = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (err) {
      // toast notification
      // toast({
      //   title: "There was a problem",
      //   description: "There was error login with Google",
      //   variant: "destructive",
      // })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
