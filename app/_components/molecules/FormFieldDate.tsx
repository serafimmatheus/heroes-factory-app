import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function parseDateISO(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const parts = iso.split("-");
  if (parts.length !== 3) return undefined;
  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function formatDateISO(date: Date | undefined): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface FormFieldDateProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function FormFieldDate<T extends FieldValues>({
  control,
  name,
  label,
}: FormFieldDateProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const dateObj = parseDateISO(field.value);
        const displayValue = dateObj ? formatDate(dateObj) : "";
        
        return (
          <FormItem className="w-full">
            <FormLabel className="text-gray-600 font-medium">{label}</FormLabel>
            <FormControl>
              <InputGroup className="h-12 border-gray-200">
                <InputGroupInput
                  id={name}
                  value={displayValue}
                  placeholder="Selecione a data"
                  readOnly
                  className="rounded-l-xl h-full border-none shadow-none cursor-pointer bg-white"
                  onClick={() => setOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <InputGroupAddon align="inline-end" className="h-full border-l border-gray-200">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger 
                      render={
                        <InputGroupButton variant="ghost" size="icon" aria-label="Selecione a data" className="h-full px-3 rounded-none rounded-r-xl bg-white">
                          <CalendarIcon className="h-5 w-5 text-gray-500" />
                          <span className="sr-only">Selecione a data</span>
                        </InputGroupButton>
                      } 
                    />
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="end"
                      alignOffset={0}
                      sideOffset={4}
                    >
                      <Calendar
                        mode="single"
                        selected={dateObj}
                        month={month || dateObj || new Date()}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                          field.onChange(formatDateISO(date));
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
