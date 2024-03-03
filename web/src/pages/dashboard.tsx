import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import {
  useCreateCookbookMutation,
  useGetUserCookbooksQuery,
} from "@/graphql/hooks";
import { CookbookCover } from "@/graphql/types";

import { CookbookCoverUrls } from "@/data/cookbookCoverUrls";
import { urqlClient } from "@/utils/urqlClient";

import CookbookCard from "@/components/CookbookCard";
import { IconBookAdd, IconCheckCircle, IconX } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import DashboardLayout from "@/layouts/dashboard";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  Radio,
  RadioGroup,
} from "react-aria-components";

const Dashboard = () => {
  const router = useRouter();

  const [{ data, fetching }] = useGetUserCookbooksQuery();
  const [, createCookbook] = useCreateCookbookMutation();

  const [isCookbookModalOpen, setIsCookbookModalOpen] = useState(false);
  const [cookbookName, setCookbookName] = useState("");
  const [cookbookCover, setCookbookCover] = useState<CookbookCover | undefined>(
    undefined
  );
  const isDisabledSubmit = useMemo(() => {
    return !cookbookName || !cookbookCover;
  }, [cookbookName, cookbookCover]);

  const handleCookbookName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCookbookName(e.target.value);
  };

  const handleCookbookCover = (value: string) => {
    setCookbookCover(value as CookbookCover);
  };

  const handleCookbookSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cookbookName && cookbookCover) {
      const result = await createCookbook({
        cookbookData: {
          name: cookbookName,
          coverId: cookbookCover,
        },
      });

      if (result.data?.createCookbook) {
        console.log(result.data.createCookbook);
      }
    } else {
      alert("Missing cookbook name and cover.");
    }
  };

  function renderBody() {
    if (fetching) {
      return <div>Loading...</div>;
    }

    if (!data?.getUserCookbooks) {
      return <div>Error</div>;
    }

    if (data.getUserCookbooks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[500px] rounded-2xl bg-gray-100">
          <h3>No Cookbooks</h3>

          <Button type="button" onClick={() => setIsCookbookModalOpen(true)}>
            Add Cookbook
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.getUserCookbooks.map((cookbook) => (
          <CookbookCard key={cookbook.id} cookbook={cookbook} />
        ))}
      </div>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div className="wrapper">
          <div className="flex justify-between mb-6">
            <h1 className="h2-bold">Your Cookbooks</h1>
            <Button
              type="button"
              onClick={() => setIsCookbookModalOpen(true)}
              className="hidden md:block"
            >
              Add Cookbook
            </Button>
          </div>
          {renderBody()}
        </div>
        <div className="absolute right-2 bottom-2">
          <Button
            className="rounded-full p-3 block md:hidden"
            onClick={() => setIsCookbookModalOpen(true)}
          >
            <IconBookAdd />
          </Button>
        </div>
      </DashboardLayout>
      <ModalOverlay
        isDismissable
        isOpen={isCookbookModalOpen}
        onOpenChange={setIsCookbookModalOpen}
        className="fixed inset-0 z-[60] overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center"
      >
        <Modal className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <Dialog className="outline-none relative">
            {({ close }) => (
              <>
                <div className="flex flex-col gap-5">
                  <Heading slot="title" className="h5-bold">
                    Add Cookbook
                  </Heading>
                  <form
                    onSubmit={handleCookbookSubmit}
                    className="flex flex-col gap-3"
                  >
                    <Input
                      type="text"
                      name="cookbookName"
                      placeholder="Cookbook name"
                      value={cookbookName}
                      onChange={handleCookbookName}
                    />
                    <RadioGroup onChange={handleCookbookCover}>
                      <Label>Choose a Cookbook Cover</Label>
                      <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-72 sm:grid-cols-2 md:grid-cols-3">
                        {(
                          Object.keys(CookbookCoverUrls) as Array<
                            keyof typeof CookbookCover
                          >
                        ).map((key) => (
                          <Radio
                            key={key}
                            value={key}
                            className={({
                              isFocusVisible,
                              isSelected,
                              isPressed,
                            }) => `
                                  group relative rounded-xl overflow-hidden border-2 border-solid
                                  ${
                                    isFocusVisible
                                      ? "ring-2 ring-brink-pink-600 ring-offset-1 ring-offset-white/80"
                                      : ""
                                  }
                                  ${
                                    isSelected
                                      ? "border-brink-pink-600"
                                      : "border-transparent"
                                  }
                                  ${
                                    isPressed && !isSelected ? "bg-blue-50" : ""
                                  }
                                  ${!isSelected && !isPressed ? "bg-white" : ""}
                                `}
                          >
                            <IconCheckCircle className="absolute z-[80] top-[4px] left-[4px] fill-brink-pink-500 hidden group-selected:block" />
                            <div className="relative w-full h-32">
                              <Image
                                src={CookbookCoverUrls[key]}
                                alt={`${key}_cookbook_cover`}
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end gap-1.5">
                      <Button
                        onPress={close}
                        variant="secondary"
                        type="button"
                        className="hidden sm:block"
                      >
                        Close
                      </Button>
                      <Button isDisabled={isDisabledSubmit} type="submit">
                        Confirm
                      </Button>
                    </div>
                  </form>
                </div>
                <button onClick={close}>
                  <IconX className="absolute right-[-12px] top-[-12px] fill-rich-black-100" />
                </button>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Dashboard);
