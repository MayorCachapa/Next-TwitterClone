import React from "react";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import NewTweetForm from "~/components/NewTweetForm";
import { api } from "~/utils/api";

function ListTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  )

  return <InfiniteTweetList 
    tweets={tweets.data?.pages.flatMap((page) => page.tweets)} 
    isError={tweets.isError}
    isLoading={tweets.isLoading}
    hasMore={tweets.hasNextPage}
    fetchNewTweets={tweets.fetchNextPage} />
}


export default function Home() {
  return (
    <>
      <header className="sticky top-o z-10 border-b pt-2">
        <h1 className="mb-2 px-2 text-lg font-bold">Home</h1>
      </header>
      <NewTweetForm />
      <ListTweets />
    </>
  );
}