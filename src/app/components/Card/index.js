import Image from "next/image";

export const Card = ({title, value, img="/next.svg"}) => {
  return (
    <div className="flex flex-col w-1/3 bg-green-500 rounded-md">
      <div className="justify-between flex flex-row">
       <h3>{title}</h3>
       <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={img}
          alt="Next.js Logo"
          width={100}
          height={37}
          priority
        />
      </div>
      <p>{value}</p>
    </div>
  )
}