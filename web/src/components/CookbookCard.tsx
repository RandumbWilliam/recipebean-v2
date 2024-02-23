import { CookbookCoverUrls } from "@/data/cookbookCoverUrls";
import { CookbookResponseFragment } from "@/graphql/operations";
import Image from "next/image";
import React from "react";

interface CookbookCardProps {
  className?: string;
  cookbook: CookbookResponseFragment;
}

const CookbookCard: React.FC<CookbookCardProps> = ({ className, cookbook }) => {
  return (
    <div className="flex flex-col justify-end h-60 px-4 py-5 rounded-2xl">
      <Image
        src={CookbookCoverUrls[cookbook.coverId]}
        alt="cookbook-cover"
        fill={true}
      />
    </div>
  );
};

export default CookbookCard;
