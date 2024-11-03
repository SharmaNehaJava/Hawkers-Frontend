import React from "react";

const Blog = () => {
  return (
    <>
      <section className="bg-white pb-10 pt-10 mt-2 dark:bg-dark lg:pb-20 lg:pt-[120px] px-4 h-auto">
        <div className="container">
          <div className="-mx-2 flex flex-wrap">
            <div className="w-full px-2">
              <div className="mx-auto mb-[20px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-2 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-2 flex flex-wrap">
            <BlogCard
              date="Dec 22, 2023"
              CardTitle="Meet AutoManage, the best AI management tools"
              CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              image="https://i.ibb.co/Cnwd4q6/image-01.jpg"
            />
            <BlogCard
              date="Dec 22, 2023"
              CardTitle="Meet AutoManage, the best AI management tools"
              CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              image="https://i.ibb.co/Y23YC07/image-02.jpg"
            />
            <BlogCard
              date="Dec 22, 2023"
              CardTitle="Meet AutoManage, the best AI management tools"
              CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              image="https://i.ibb.co/7jdcnwn/image-03.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

const BlogCard = ({ image, date, CardTitle, CardDescription }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-2 w-full">
          <div className="mb-2 overflow-hidden rounded">
            <img src={image} alt="" className="w-full" />
          </div>
          <div>
            {date && (
              <span className="mb-2 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {date}
              </span>
            )}
            <h3>
              <a
                href="/#"
                className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </a>
            </h3>
            <p className="text-base text-body-color dark:text-dark-6">
              {CardDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
