import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";

const Reviews = () => {
  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];

  return (
    <div className="w-full h-screen bg-[#efecfd]">
      <div className="w-4/5 h-full mx-auto">
        <div className="w-full h-1/6">
          <h1 className="text-center p-4 font-bold text-2xl">
            What Students Are Saying About Learnio
          </h1>
          <p className="text-left">
            Discover the experiences of our vibrant community! From students
            advancing their skills to teachers sharing their expertise, read
            authentic reviews that showcase the impact of Learnio on learning
            journeys worldwide.
          </p>
        </div>
        {/* review cards */}
        <div className="w-full h-5/6">
          <div className="h-full rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
