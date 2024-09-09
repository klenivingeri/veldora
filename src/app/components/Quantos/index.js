import Image from "next/image";

export const QuantosTopBot = ({ size = 16 }) => {
  const bsize = 2 * size;
  return (
    <>
      <div
        className="absolute bottom-[-16px]  left-0"
      >
        <Image src="/top-left.png" height={size} width={size} />
      </div>
      <div
        className="absolute bottom-[-16px] right-0"
        
      >
        <Image src="/top-right.png" height={size} width={size} />
      </div>
    </>
  );
};

export const QuantosBot = ({ size = 16 }) => {
  const bsize = 2 * size;
  return (
    <>
    <div
      className="absolute top-0 left-0"
    >
      <Image src="/bot-left.png" height={size} width={size} />
    </div>
    <div
      className="absolute top-0 right-0"
      
    >
      <Image src="/bot-right.png" height={size} width={size} />
    </div>
  </>
  );
};

export const QuantosTop = ({ size = 16 }) => {
  const bsize = 2 * size;
  return (
    <>
          <>
      <div
        className="absolute top-0  left-0"
      >
        <Image src="/top-left.png" height={size} width={size} />
      </div>
      <div
        className="absolute top-0 right-0"
        
      >
        <Image src="/top-right.png" height={size} width={size} />
      </div>
    </>
    </>
  );
};
