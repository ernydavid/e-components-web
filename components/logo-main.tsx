import Image from "next/image";
import Link from "next/link";

export function LogoMain() {
  return (
    <Link className="flex items-center gap-1.5" href={"/"}>
      <Image
        className="dark:hidden block"
        width={20}
        height={20}
        alt="E. components logo"
        src={"/icon-logo-light.svg"}
      />
      <Image
        className="hidden dark:block"
        width={20}
        height={20}
        alt="E. components logo"
        src={"/icon-logo-dark.svg"}
      />

      <span className="font-medium tracking-tight text-xl">components</span>
    </Link>
  );
}
