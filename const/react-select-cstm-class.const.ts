export const customClassNames = {
    control: ({ isFocused }: { isFocused: boolean }) =>
        `border !border-input dark:!bg-input/30 dark:!text-foreground !bg-background/90 !text-foreground !rounded-lg !shadow-none    !outline-none ${isFocused ? "!border-primary" : ""
        }`,

    option: ({ isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) =>
        `px-4 py-2 cursor-pointer ${isSelected
            ? "!bg-primary !text-foreground"
            : isFocused
                ? "!bg-input/30"
                : "!bg-background"
        } !bg-background hover:!bg-input/30 !text-foreground`,

    menu: () =>
        `mt-1 border !border-input dark:!border-input/50 rounded-md !bg-background z-50 shadow-md`,

    valueContainer: () => `py-1 px-2 dark:!text-foreground`,

    singleValue: () => `text-background dark:text-foreground hover:dark:!bg-background`,

    placeholder: () => `text-foreground/60 dark:text-foreground/60`,
    input: () => '!text-foreground',
    indicatorsContainer: () => `px-2 dark:!text-foreground`,
    multiValue: () =>
        `!border-input !bg-accent !rounded-md !overflow-hidden`,

    multiValueLabel: () =>
        `!text-foreground`,

    multiValueRemove: () =>
        `ml-1 cursor-pointer !text-foreground !rounded-md hover:!bg-red-500/50 rounded-full  transition-colors`,
};