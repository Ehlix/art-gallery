import {UserNewProfile} from "@/components/user/newProfile/UserNewProfile";

export default function CreateProfilePage() {

  return (
    <section
      className="container flex h-full w-full flex-col items-center justify-center gap-[30px]">
      <UserNewProfile/>
    </section>
  );
}