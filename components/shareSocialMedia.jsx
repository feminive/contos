import React from "react";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "next-share";
import { Facebook, Zap, Reddit,Twitter, Telegram } from "@/lib/icons";

export default function ShareSocialMedia({ slug, post, tags, title }) {
  return (
    <div className="flex flex-wrap gap-1 items-center my-10">
      <FacebookShareButton
        url={`https://feminivefanfics.com.br/ContoErotico/${slug}`}
        quote={post}
        hashtag={tags}
      >
        <Facebook
          size={30}
          fill={"#cd7d80"}
          className="hover:bg-[#4267B2]/70 text-brown hover:fill-white border-1 border-brown/60 hover:border-none w-[44px] p-1 rounded-lg"
        />
      </FacebookShareButton>
      <WhatsappShareButton
        url={`https://feminivefanfics.com.br/ContoErotico/${slug}`}
        title={title}
        separator=":: "
      >
        <Zap
          size={30}
          fill={"#cd7d80"}
          color={"#cd7d80"}
          className="hover:bg-[#4267B2]/70 text-brown hover:fill-white border-1 border-brown/60 hover:border-none w-[44px] p-1 rounded-lg"
        />
      </WhatsappShareButton>
      <TelegramShareButton
        url={`https://feminivefanfics.com.br/ContoErotico/${slug}`}
        title={title}
      >
        <Telegram
          size={30}
          fill={"#cd7d80"}
          className="hover:bg-[#24A1DE]/70 text-brown hover:fill-white border-1 border-brown/60 hover:border-none w-[44px] p-1 rounded-lg"
        />
      </TelegramShareButton>
      <RedditShareButton
        url={`https://feminivefanfics.com.br/ContoErotico/${slug}`}
        title={title}
        hashtag={tags}
      >
        <Reddit
          size={30}
          fill={"#cd7d80"}
          className="hover:bg-[#FF5700]/70 text-brown hover:fill-white border-1 border-brown/60 hover:border-none w-[44px] p-1 rounded-lg"
        />
      </RedditShareButton>
      <TwitterShareButton
        url={`https://feminivefanfics.com.br/ContoErotico/${slug}`}
        title={title}
      >
        <Twitter
          size={28}
          fill={"#cd7d80"}
          className="hover:bg-[#14171A]/70 text-brown hover:fill-white border-1 border-brown/60 hover:border-none w-[44px] p-1 rounded-lg"
        />
      </TwitterShareButton>
    </div>
  );
}
