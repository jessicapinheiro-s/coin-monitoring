import Header from "../components/Header";

export default function About() {
  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <Header />
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[80%]">
          <div className="w-full flex flex-col justify-center items-center text-center">
            <h1 className="text-[29px] font-bold">Monitoring coins</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel ea cum dolorem deleniti molestiae quidem. Magnam ullam vero facere! Consequatur cum excepturi velit nulla reprehenderit odit ratione in aut? Veniam.</p>
          </div>
        </div>
      </div>
    </div >
  )
}

