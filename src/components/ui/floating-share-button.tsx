"use client";

import { ShareMenu } from "@/components/share-menu";

interface FloatingShareButtonProps {
  title: string;
  url: string;
}

export default function FloatingShareButton({
  title,
  url,
}: FloatingShareButtonProps) {
  return (
    <div className="fixed bottom-16 right-4 z-50 block md:hidden">
      <ShareMenu title={title} url={url} />
    </div>
  );
}
