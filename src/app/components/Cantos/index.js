import Image from "next/image";

export const CantosTopBot = ({ size = 10 }) => {
  return (
    <>
      <div
        className="absolute bottom-[-10px]  left-0"
      >
        <Image src="/top-left.png" alt="bottom-10 left-0" height={size} width={size} />
      </div>
      <div
        className="absolute bottom-[-10px] right-0"
        
      >
        <Image src="/top-right.png" alt="bottom-10 right-0" height={size} width={size} />
      </div>
    </>
  );
};

export const CantosTop = ({ size = 10 }) => {
  return (
    <>
          <>
      <div
        className="absolute top-0  left-0"
      >
        <Image src="/top-left.png" alt="top-0  left-0" height={size} width={size} />
      </div>
      <div
        className="absolute top-0 right-0"
        
      >
        <Image src="/top-right.png" alt="top-0 right-0" height={size} width={size} />
      </div>
    </>
    </>
  );
};


export const CantosBotTop = ({ size = 10, }) => {
  return (
    <>
    <div
      className={`absolute top-0 left-0`}
    >
      <Image src="/bot-left.png" alt="top-0 left-0" height={size} width={size} />
    </div>
    <div
      className="absolute top-0 right-0"
      
    >
      <Image src="/bot-right.png" alt="top-0 right-0" height={size} width={size} />
    </div>
  </>
  );
};

export const CantosBot = ({ size = 10  }) => {
  return (
    <>
    <div
      className="absolute bottom-0 left-0"
    >
      <Image src="/bot-left.png" alt="bottom-0 left-0" height={size} width={size} />
    </div>
    <div
      className="absolute bottom-0 right-0"
      
    >
      <Image src="/bot-right.png" alt="bottom-0 right-0" height={size} width={size} />
    </div>
  </>
  );
};


