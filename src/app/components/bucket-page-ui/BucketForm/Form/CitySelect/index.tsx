import { FC, useState } from "react";

//components
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import CreateNewAddress from "./CreateNewAddress";
import { ChevronDown } from "lucide-react";
import { HomeIcon } from "@/app/icons";

import { CITIES } from "@/app/data";

interface Props {
  userProfile: UserData;
  onChange: (address: AddressData) => void;
  t: any;
}
const Index: FC<Props> = ({ userProfile, onChange, t }) => {
  const [selected, setSelected] = useState("");
  const handleChange = (address) => {
    const { district, houseNumber, apartment } = address;
    onChange(address);
    setSelected(`${district}, ${houseNumber}/${apartment}`);
  };
  return (
    <Popover>
      <PopoverTrigger className="relative z-10 flex rounded-xl">
        <div className="relative flex items-center space-x-2.5">
          <HomeIcon />
          <p className="line-clamp-1 text-base font-bold sm:text-sm">{selected || t("BucketForm.chooseAddress")}</p>
          <ChevronDown width={20} height={20} className="duration-200 peer-checked:rotate-180" />
        </div>
      </PopoverTrigger>

      <PopoverContent align="center" className="overflow-hidden rounded-[14px] p-0 shadow-xl">
        <ul className="cursor-pointer ">
          <li>
            <CreateNewAddress t={t} userProfile={userProfile} />
          </li>
          {userProfile?.addresses?.map((address, i) => (
            <li key={i} onClick={() => handleChange(address)}>
              <PopoverClose className="line-clamp-2 w-full px-6 py-[18px] text-start hover:bg-onHover md:px-5 md:py-4 sm:px-4 sm:py-3">
                {address.district}, {address.houseNumber}/{address.apartment}
              </PopoverClose>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
export default Index;
