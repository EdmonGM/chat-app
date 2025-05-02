import FriendsList from "./components/friends-list";
import FriendRequests from "./components/friends-requests";
import { Separator } from "@/components/ui/separator";

function page() {
  return (
    <section className="w-full my-8 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <FriendRequests />
      <Separator />
      <FriendsList />
    </section>
  );
}

export default page;
