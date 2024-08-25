//Components
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shared-ui/Popover";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/app/components/shared-ui/Dialog";
import Input from "@/app/components/shared-ui/Input";
import Button from "@/app/components/shared-ui/Button";

import { PlusIcon, TrashIcon } from "@/app/icons";

const ADRES_INPUTS = [
  [
    { label: "ProfilePage.city", placeholder: "Placeholder.enterCity" },
    { label: "BucketForm.district", placeholder: "Placeholder.enterDistrict" },
  ],
  [
    { label: "ProfilePage.streetHouse", placeholder: "Placeholder.enterStreetHouse" },
    { label: "ProfilePage.appartmentOffice", placeholder: "Placeholder.enterAppartmentOffice" },
  ],
];

export default function CreateNewAddress({ t }: { t: any }) {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center justify-between space-x-2.5 border-b border-b-gray-2 px-6 py-[18px] text-base font-medium hover:bg-onHover md:px-5  md:py-4 sm:px-4 sm:py-3 sm:text-sm">
        <p>{t("BucketForm.addNewAddress")}</p>
        <PlusIcon />
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-md bg-bg-1 px-6 py-8 md:max-w-[92%]">
        <DialogTitle>
          <p className="pb-4 pr-6 text-lg font-semibold">{t("BucketForm.createNewAddress")}</p>
        </DialogTitle>
        <div className="space flex w-full flex-col space-y-8 px-3">
          {ADRES_INPUTS.map((row, i) => (
            <div key={i} className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6">
              {row.map(({ label, placeholder }) => (
                <Input key={label} label={t(label)} placeholder={t(placeholder)} />
              ))}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <DialogClose className="rounded-md border border-error bg-bg-1 px-4 py-2 text-error hover:bg-error hover:text-white">
              {t("Index.delete")}
            </DialogClose>
            <Button>{t("Index.save")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
