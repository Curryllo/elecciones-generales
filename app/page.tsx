import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Congress } from "@/components/congress";
import { Tweets } from "@/components/tweets";
import { Dates } from "@/components/dates";
import { News } from "@/components/news";
import { Statement } from "@/components/statement";
import { Explainer } from "@/components/explainer";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { NewsSkeleton, TweetsSkeleton } from "@/components/skeletons";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Congress />
        <Suspense fallback={<TweetsSkeleton />}>
          <Tweets />
        </Suspense>
        <Dates />
        <Suspense fallback={<NewsSkeleton />}>
          <News />
        </Suspense>
        <Statement />
        <Explainer />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
