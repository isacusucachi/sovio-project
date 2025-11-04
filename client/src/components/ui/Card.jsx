import LazyLoad from "react-lazyload";
const Card = ({ title, description, image, alt }) => {
  return (
    <LazyLoad>
      <div
      role="img"
      aria-label={alt}
        className="mx-auto h-full max-w-md shadow-xl bg-cover bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group border border-gray-200 rounded-3xl dark:bg-gray-800 dark:border-gray-700"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="bg-black bg-opacity-20 min-h-150 px-6 flex flex-wrap flex-col py-10 hover:bg-opacity-75 transform duration-300 h-full rounded-3xl">
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300 font-semibold font-arima">
            {title}
          </h1>
          <div className="w-16 h-2 bg-primary-700 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
          <p className="opacity-0 text-white group-hover:opacity-90 transform duration-500 text-sm">
            {description}
          </p>
        </div>
      </div>
    </LazyLoad>
  );
};

export default Card;
