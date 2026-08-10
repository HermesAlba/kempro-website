import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

type Client = {
  name: string;
  logo: { src: string; width: number; height: number };
  imageClassName?: string;
};

const defaultImageClassName = "h-10 w-auto max-w-32 object-contain";

const clients: Client[] = [
  {
    name: "Bupa",
    logo: { src: "/logos/bupa.png", width: 646, height: 171 },
  },
  {
    name: "Cajasan",
    logo: { src: "/logos/cajasan.png", width: 368, height: 84 },
  },
  {
    name: "Best Doctors Insurance",
    logo: { src: "/logos/bdi.png", width: 408, height: 108 },
    imageClassName: "h-[45px] w-auto max-w-[170px] object-contain",
  },
  {
    name: "Studio Sur",
    logo: { src: "/logos/studiosur.svg", width: 592, height: 113 },
  },
  {
    name: "Siete",
    logo: { src: "/logos/siete.png", width: 1088, height: 706 },
  },
];

export function ClientLogos() {
  const t = useTranslations("Home.logos");

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-12">
      <Container>
        <p className="text-center text-sm font-medium text-neutral-500">
          {t("title")}
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-10">
          {clients.map((client) => (
            <li key={client.name} className="flex items-center justify-center">
              <Image
                src={client.logo.src}
                width={client.logo.width}
                height={client.logo.height}
                alt={client.name}
                className={client.imageClassName ?? defaultImageClassName}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
