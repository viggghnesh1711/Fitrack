import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between">
      <div>
        <p className="text-lg text-stone-500 font-semibold">
          Welcome<br></br> back, <span className="text-stone-300">Timmy</span> 👋
        </p>
      </div>
      <div className="flex gap-5 items-center space-x-2">
                <IoMdNotificationsOutline className="text-4xl text-stone-300"/>
                <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>

      </div>
    </nav>
  );
};

export default Navbar;
