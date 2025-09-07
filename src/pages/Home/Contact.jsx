import { FaLinkedin } from "react-icons/fa";
import { IoIosSend, IoMdMail } from "react-icons/io";

function Contact() {
  return (
    <div className="min-h-screen w-full p-4 font-sans sm:p-6 lg:p-12">
      <div className="container mx-auto max-w-6xl">
        {/* Contact Form Section */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-lg md:mt-20 md:grid md:grid-cols-2">
          {/* Left side info */}
          <div className="p-6 sm:p-8 xl:p-12">
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
              Let&#39;s Connect!
            </h2>
            <p className="mt-4 text-sm text-gray-600 sm:text-base">
              We&#39;d love to hear from you. Whether you have a question about
              courses, pricing, or anything else, our team is ready to answer
              all your questions.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {/* Email Card */}
              <div className="flex items-center rounded-lg border border-gray-300 bg-orange-100 p-4 shadow-sm sm:p-6">
                <div className="rounded-lg bg-orange-200 p-3">
                  <IoMdMail className="h-7 w-7 text-orange-500 sm:h-8 sm:w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold sm:text-base">
                    learnio@gmail.com
                  </p>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="flex items-center rounded-lg border border-gray-300 bg-orange-100 p-4 shadow-sm sm:p-6">
                <div className="rounded-lg bg-orange-200 p-3">
                  <FaLinkedin className="h-7 w-7 text-orange-600 sm:h-8 sm:w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-gray-500 sm:text-sm">LinkedIn</p>
                  <p className="text-sm font-semibold text-gray-800 sm:text-base">
                    linkedin.com/in/Learnio
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side form */}
          <div className="bg-gray-50/70 p-6 sm:p-8 md:p-12">
            <form action="#" method="POST">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    placeholder="Message"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 sm:px-8 sm:text-base"
                  >
                    <IoIosSend className="h-5 w-5" />
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
