import Image from "next/image";

export function AuthShowcase() {
  return (
    <div className="hidden lg:flex w-1/2 items-center justify-center bg-paper overflow-hidden">
      <Image
        src="/images/background.png"
        alt="Quirenda Preview"
        width={1200}
        height={800}
        priority
        className="w-[110%] h-auto"
      />
    </div>
  );
}