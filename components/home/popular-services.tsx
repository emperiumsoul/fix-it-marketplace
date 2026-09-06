import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export function PopularServices() {
  const services = [
    {
      title: "House Cleaning",
      buttonText: "Book Cleaning",
      href: "/categories/cleaning",
      bgColor: "bg-[#FDF2F4]",
      imageUrl:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Plumbing",
      buttonText: "Book a Plumber",
      href: "/categories/plumbing",
      bgColor: "bg-[#EFF6FF]",
      imageUrl:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Electrical Repairs",
      buttonText: "Book an Electrician",
      href: "/categories/electrical-repairs",
      bgColor: "bg-[#FEFCE8]",
      imageUrl:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Painting",
      buttonText: "Book a Painter",
      href: "/categories/painting-decorating",
      bgColor: "bg-[#F0F9FF]",
      imageUrl:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Moving",
      buttonText: "Get a Quote",
      href: "/categories/moving-relocation",
      bgColor: "bg-[#F0FDF4]",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Furniture Assembly",
      buttonText: "Book Assembly",
      href: "/categories/furniture-assembly",
      bgColor: "bg-[#ECFDF5]",
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section id="popular-services" className="w-full py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">
        <h2 className="font-grotesque font-bold text-[28px] sm:text-[32px] leading-[40px] text-[#222325]">
          Popular services
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((svc) => (
            <Link
              key={svc.title}
              href={svc.href}
              className="flex flex-col rounded-[12px] border border-[#003912]/20 overflow-hidden bg-white shadow-xs hover:shadow-md hover:border-[#008744] transition-all group cursor-pointer"
            >
              {/* Green Header Bar */}
              <div className="bg-[#003912] group-hover:bg-[#00280D] px-3 py-2.5 text-center min-h-[46px] flex items-center justify-center transition-colors">
                <span className="font-grotesque font-bold text-[13px] leading-[16px] text-white">
                  {svc.title}
                </span>
              </div>

              {/* Illustration / Image Area */}
              <div
                className={`relative w-full aspect-[4/5] ${svc.bgColor} p-3 flex flex-col items-center justify-between overflow-hidden`}
              >
                <div className="relative w-full h-[70%] mt-2">
                  <Image
                    src={svc.imageUrl}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bottom Action Pill Button */}
                <span className="w-full py-1.5 px-2 bg-[#003912] group-hover:bg-[#00280D] text-white text-[11px] font-medium rounded-full text-center shadow-xs transition-colors mt-2 inline-block">
                  {svc.buttonText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
