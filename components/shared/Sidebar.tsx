import { Logo, MoreDropdown, NavLinks } from "../helpers"
import { BottomBar } from "./Bottombar"

export const Sidebar = () => {
  return (
    // <div className="flex h-full relative flex-col px-3 py-4 md:px-2">
    //     <div className="max-md:hidden -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative gap-x-2 md:flex-col md:gap-x-0 md:gap-y-2 p-2">

    //         <Logo/>
    //         <NavLinks/>
    //         {/* Profile link */}

    //     </div>
    //     <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
    //         <MoreDropdown/>
    //     </div>
    //     <div className="md:hidden">
    //         <BottomBar/>
    //     </div>
    // </div>

    <div className="h-screen lg:min-w-[300px] max-w-[350px] w-fit lg:w-full sticky top-0 left-0 flex flex-col justify-between items-start z-50 py-5 px-2">
          
          <div className="-ml-3 sm:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full sm:relative gap-x-2 sm:flex-col sm:gap-x-0 sm:gap-y-2">

            <div className="max-lg:hidden">
              <Logo/>
            </div>
            <NavLinks/>
            {/* Profile link */}

          </div>
          <div className="hidden sm:flex relative md:mt-auto flex-1 items-end w-full">
            <MoreDropdown/>
          </div>
        {/* </div> */}

    </div>
  )
}
