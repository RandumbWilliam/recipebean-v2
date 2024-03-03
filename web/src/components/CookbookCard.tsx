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
    <div>
      <div className="absolute z-10 px-4 py-4 flex items-end h-48">
        <p className="p-medium-24">{cookbook.name}</p>
      </div>
      <div className="relative w-full h-48 rounded-2xl overflow-hidden">
        <Image
          src={CookbookCoverUrls[cookbook.coverId]}
          alt="cookbook-cover"
          fill={true}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default CookbookCard;
