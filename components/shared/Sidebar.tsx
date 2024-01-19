import { Logo, MoreDropdown, NavLinks } from "../helpers"

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div className="-ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative gap-x-2 md:flex-col md:gap-x-0 md:gap-y-2 p-2">

            <Logo/>
            <NavLinks/>
            {/* Profile link */}

        </div>
        <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
            <MoreDropdown/>
        </div>
    </div>
  )
}
