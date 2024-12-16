"use client"

export default function ImageScroller() {
  const Image = [
    {
      id: 1,
      src: "https://d325uq16osfh2r.cloudfront.net/Numbers/worksheets/what-is-a-fraction.png",
      title: "Basics of Fractions",
      description: "A worksheet for writing and identifying fractions according to the given fraction model."
    },
    {
      id: 2,
      src: "https://d325uq16osfh2r.cloudfront.net/Numbers/worksheets/Rational-numbers.png",
      title: "Rational Numbers",
      description: "A worksheet on comparing and ordering and finding rational number between two numbers.."
    },
    {
      id: 3,
      src: "https://d325uq16osfh2r.cloudfront.net/Numbers/worksheets/Ordering-numbers.png",
      title: "Ordering Numbers",
      description: "A worksheet gives practice ordering numbers from smallest to largest and from largest to smallest."
    },
    {
      id: 4,
      src: "https://d325uq16osfh2r.cloudfront.net/Numbers/natural-numbers/worksheets/Odd-even-numbers.png",
      title: "Skip Counting and Odd-Even Numbers",
      description: "A worksheet for writing and identifying fractions according to the given fraction model."
    },
    {
      id: 5,
      src: "https://d325uq16osfh2r.cloudfront.net/Numbers/worksheets/Comparing-numbers.png",
      title: "Comparing Numbers",
      description: "A worksheet gives practice ordering numbers from smallest to largest and from largest to smallest."
    },
    {
      id: 6,
      src: "https://d325uq16osfh2r.cloudfront.net/Numbers/worksheets/Basics-of-fractions.png",
      title: "Identifying Fractions",
      description: "A worksheet for identifying the parts of a fraction using shaded and unshaded portions."
    },
  ]
  return (
    <div className=" w-full h-full p-4">
      
      <div className="text-center mb-7">
        <h1 className="text-2xl font-semibold text-blue">Related Math Games</h1>
      </div>
          
        <div className="flex overflow-x-auto space-x-4">
          {Image.map((data) => (
            <div key={data.id} className="flex-none w-64 h-90 bg-white shadow-md rounded-lg sm:w-72  md:w-80 ">
              <img src={data.src} alt="this is first image" className="w-full h-50 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
                <p className="text-gray-600 mt-2">{data.description}</p>
              </div>
            </div>
          ))}
       </div>
      
    </div>
  )
}