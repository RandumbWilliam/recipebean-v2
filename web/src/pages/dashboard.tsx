import CookbookCard from "@/components/CookbookCard";
import { Button } from "@/components/ui/Button";
import { useGetUserCookbooksQuery } from "@/graphql/hooks";
import DashboardLayout from "@/layouts/dashboard";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";

const Dashboard = () => {
  const [{ data, fetching }] = useGetUserCookbooksQuery();

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
          <DialogTrigger>
            <Button>Add Cookbook</Button>
            <ModalOverlay
              isDismissable
              className="fixed inset-0 z-[60] overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center"
            >
              <Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
                <Dialog className="outline-none relative">
                  {({ close }) => (
                    <>
                      <Heading slot="title">Notice</Heading>
                      <p>You must close this dialog using the button below.</p>
                      <Button onPress={close}>Close</Button>
                    </>
                  )}
                </Dialog>
              </Modal>
            </ModalOverlay>
          </DialogTrigger>
        </div>
      );
    }

    return (
      <>
        {data.getUserCookbooks.map((cookbook) => {
          <CookbookCard cookbook={cookbook} />;
        })}
      </>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div className="wrapper">{renderBody()}</div>
      </DashboardLayout>
    </>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Dashboard);
