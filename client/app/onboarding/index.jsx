import { title } from "process";
import React, { useState } from "react";

const slides = [
  {
    id: 1,
    title: <h2 className="text-2xl font-bold mb-2">Step 1: Welcome</h2>,
    content: (
      <div>
        <h2>Dive into your interests</h2>
        <p>
          We&apos;ll recommend top publications based on the topics you select..
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: <h2 className="text-2xl font-bold mb-2">Step 2: Information</h2>,
    content: (
      <div>
        <p>Here is some information presented with JSX content.</p>
        <ul className="list-disc list-inside">
          <li>Point 1</li>
          <li>Point 2</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: <h2 className="text-2xl font-bold mb-2">Step 3: Keep Going!</h2>,
    content: (
      <div>
        <p>
          Motivational content with JSX elements. You can style and add
          components freely.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    title: (
      <h2 className="text-2xl font-bold mb-2">Step 4: Congratulations!</h2>
    ),
    content: (
      <div>
        <p>
          You&apos;ve reached the final slide. You can display anything here,
          even interactive elements.
        </p>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
          Click me
        </button>
      </div>
    ),
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progressPercentage = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="max-w-xl mx-auto mt-10 p-5">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-lg overflow-hidden mb-6">
          <div
            className="bg-green-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <h2 className="text-xl font-bold mb-4">
          {slides[currentSlide].content}
        </h2>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentSlide === 0}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
              currentSlide === slides.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentSlide === slides.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
