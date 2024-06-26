// Components
import { InputForm } from "@/components/input-form";
import { SingleCheckbox } from "@/components/checkbox-single";
import { MultipleCheckbox } from "@/components/checkbox-multiple";
import { TextareaForm } from "@/components/textarea-form";
import { RadioGroupForm } from "@/components/radio-group";
import { SwitchForm } from "@/components/switch-form";
import { SelectForm } from "@/components/select-form";
import { DatePickerForm } from "@/components/date-picker-form";
import FormContextComponent from "@/components/forms/app-form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start my-12">
      <h2 className="text-center text-2xl font-semibold mb-6">React Hook Form</h2>
      {/*
        <InputForm />
        <SingleCheckbox />
        <MultipleCheckbox />
        <RadioGroupForm />
        <TextareaForm />
        <SwitchForm />
        <SelectForm />
        <DatePickerForm />
      */}
      <FormContextComponent />
    </main>
  );
}
