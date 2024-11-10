import { useMediaQuery } from "react-responsive"
import { NavbarMobile } from "./mobile/NavBarMobile"
import { NavbarDekstop } from "./dekstop/NavBarDekstop"

const Navbar = () => {


  const isMobile = useMediaQuery({ maxWidth: "625px" });

  return (
    <>
      {
        isMobile
        ? <NavbarMobile/>
        : <NavbarDekstop/>
      }
    </>
  )
}

export default Navbar
