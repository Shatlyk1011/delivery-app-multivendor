import { FC } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/shared-ui/Form/form";

import Input from "@/app/components/shared-ui/Input";

import { useLoginScheme } from "@/app/hooks/formSchemes";

interface Props {
  t: any;
  classes?: string;
}

const Index: FC<Props> = ({ t, classes }) => {
  const { form, onSubmit } = useLoginScheme();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-3 text-start ${classes}`}>
        {Object.keys(form.getValues()).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as any}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={key} {...field} className="h-12 w-full px-[14px]" />
                </FormControl>
                <FormMessage className="mt-1" />
              </FormItem>
            )}
          />
        ))}

        <button type="submit" className="h-12 w-full rounded-md bg-primary text-xl font-medium hover:bg-accent">
          {t("Login.login")}
        </button>
      </form>
    </Form>
  );
};

export default Index;
