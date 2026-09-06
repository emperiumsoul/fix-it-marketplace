import * as React from "react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="w-full py-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="w-full rounded-[16px] bg-[#4D1727] py-14 px-8 text-center flex flex-col items-center justify-center gap-6 shadow-xl">
          <h2 className="font-grotesque font-bold text-[32px] sm:text-[44px] md:text-[50px] leading-tight text-white tracking-tight">
            Local services at your{" "}
            <span className="text-[#FF7646] italic font-serif font-normal">
              fingertips
            </span>
          </h2>

          <Link
            href="#join"
            className="inline-flex items-center justify-center bg-white hover:bg-[#F3FDF9] text-[#222325] font-semibold text-[15px] h-[46px] px-8 rounded-[8px] shadow-sm transition-all hover:scale-105"
          >
            Join Fix it
          </Link>
        </div>
      </div>
    </section>
  );
}
