'use client'


export default function Hero() {

  return (
    <div>

      <section className="min-h-[90vh]">


        <div className="pt-10 sm:pt-16 md:pt-20 lg:pt-28 lg:my-0 px-1.5 md:px-12 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-6">
            <div className="grid lg:grid-cols-2 gap-12  items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-6xl text-black font-bold tracking-tight sm:!leading-[68px] mb-4 capitalize"> Ecommerce Platform for buyers, sellers & retailers</h1>

            

              </div>
              <div className="mb-12 lg:mb-0">
             
                <div className='table w-auto relative '>
                  <img className=' rounded-lg'  src={'/imgs/logo.jpg'}/>
                  <div className='bg-url(/play-button.png)'></div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
