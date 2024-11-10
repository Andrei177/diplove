import { useMediaQuery } from "react-responsive";
import { StartPageMobile } from "./Mobile/StartPageMobile";
import { StartPageDekstop } from "./Dekstop/StartPageDekstop";

export const StartPage = () => {

  const isMobile = useMediaQuery({ maxWidth: "670px" });

  return (
    <>
      {
        isMobile ? <StartPageMobile /> : <StartPageDekstop />
      }
    </>
  )
}