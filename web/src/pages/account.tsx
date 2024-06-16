import { IconCheckCircle, IconPencil } from "@/components/icons";
import Avatar from "@/components/ui/Avatar";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AvatarUrls } from "@/data/avatarUrls";
import { useMyUserQuery } from "@/graphql/hooks";
import { UserAvatar } from "@/graphql/types";
import DefaultLayout from "@/layouts/default";
import { isServer } from "@/utils/isServer";
import { urqlClient } from "@/utils/urqlClient";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TextField } from "react-aria-components";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Account = () => {
  const [{ data, fetching }] = useMyUserQuery({
    pause: isServer(),
  });
  const [showPasswordRequirement, setShowPasswordRequirement] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = z.object({
    avatarId: z.enum(
      Object.values(UserAvatar) as [UserAvatar, ...UserAvatar[]]
    ),
    fullName: z.string().trim().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }).email(),
  });

  type UserData = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(validationSchema),
    defaultValues: useMemo(() => {
      return {
        avatarId: data?.myUser?.avatarId,
        fullName: data?.myUser?.fullName,
        email: data?.myUser?.email,
      };
    }, [data]),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const selectedAvatar = watch("avatarId");

  const handleAvatarSelect = (avatar: UserAvatar) => {
    setValue("avatarId", avatar, { shouldValidate: true });
  };

  const onSubmit = async (data: UserData) => {
    console.log(data);
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (!data?.myUser) {
    return <div>Error</div>;
  }

  return (
    <DefaultLayout>
      <div className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl"
          noValidate
        >
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-semibold">My Account</h1>
            <Button type="submit">Save</Button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger>
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <Avatar
                      src={AvatarUrls[getValues("avatarId")]}
                      className="h-28 w-28"
                    />
                    <div className="absolute bg-black/70 w-full h-full flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <IconPencil className="fill-white h-8 w-8" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-fit">
                  <DialogHeader>
                    <DialogTitle>Edit Profile Picture</DialogTitle>
                    <DialogDescription>
                      Change your profile picture.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Object.values(UserAvatar).map((avatar, index) => (
                      <label
                        key={`avatar-${index}`}
                        className={clsx(
                          "relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer",
                          {
                            "border-2 border-primary":
                              selectedAvatar === avatar,
                          }
                        )}
                        onClick={() => handleAvatarSelect(avatar)}
                      >
                        <input
                          type="radio"
                          value={avatar}
                          {...register("avatarId")}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Image
                          src={AvatarUrls[avatar]}
                          alt="avatar-image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div
                          className={`absolute inset-0 ${
                            selectedAvatar === avatar ? "bg-black/70" : ""
                          }`}
                        ></div>
                        {selectedAvatar === avatar && (
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                            <IconCheckCircle className="fill-white" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button">Done</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">
                  {data.myUser.fullName}
                </h1>
                <p className="text-gray-500">{data.myUser.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <TextField>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
              </TextField>
              <TextField>
                <Label>Email</Label>
                <Input placeholder="Email" {...register("email")} />
              </TextField>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Change Password</h2>
              <TextField>
                <Label>Old password</Label>
                <PasswordInput placeholder="Old password" />
              </TextField>
              <TextField>
                <Label>New password</Label>
                <PasswordInput placeholder="New password" />
              </TextField>
              <TextField>
                <Label>Confirm new password</Label>
                <PasswordInput placeholder="Confirm new password" />
              </TextField>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Delete Account</h2>
              <p>
                By deleting your account, you will lose all your dara and access
                to your reicpes that you are associated with.
              </p>
              <div>
                <Button type="button" variant="outline">
                  Delete your account
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl" noValidate>
  //     <div className="flex justify-between mb-6">
  //       <h1 className="text-3xl font-semibold">My Account</h1>
  //       <Button type="submit">Save</Button>
  //     </div>
  //     <div className="flex flex-col gap-8">
  //       <div className="flex flex-col gap-3">
  //         <h2 className="text-lg font-semibold">Personal Information</h2>
  //         <TextField>
  //           <Label>Full Name</Label>
  //           <Input
  //             type="text"
  //             placeholder="Full Name"
  //             {...register("fullName")}
  //           />
  //         </TextField>
  //         <TextField>
  //           <Label>Email</Label>
  //           <input type="email" placeholder="Email" {...register("email")} />
  //         </TextField>
  //       </div>
  //     </div>
  //   </form>
  // );
};

export default withUrqlClient(urqlClient)(Account);
