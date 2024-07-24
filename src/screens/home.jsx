import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const Home = () => {
  const [airports, setAirports] = useState([]);
  const [page, setPage] = useState(1);
  // component did mount

  const loadAirports = async (page) => {
    try {
      if (page > 0) {
        const res = await fetch(
          `http://localhost:3000/airports?_page=${page}&_limit=10`
        );
        const json = await res.json();
        setAirports(json);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadAirports(page);
  }, []);

  return (
    <div>
      {airports.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
          </div>
        );
      })}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setPage((val) => {
                const prevVal = val - 1;
                loadAirports(prevVal);
                return prevVal || 1;
              });
            }}
          >
            Previous
          </button>
          <button
            type="button"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setPage((val) => {
                const nextVal = val + 1;
                loadAirports(nextVal);
                return nextVal;
              });
            }}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                type="button"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => {
                  setPage((val) => {
                    const nextVal = val - 1;
                    loadAirports(nextVal);
                    return nextVal || 1;
                  });
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {[...Array(10).keys()].map((item) => (
                <button
                  key={item + 1}
                  type="button"
                  aria-current="page"
                  className={clsx(
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                    {
                      "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
                        page === item + 1,
                    }
                  )}
                  onClick={() => {
                    const currentPage = item + 1;
                    setPage(currentPage);
                    loadAirports(currentPage);
                  }}
                >
                  {item + 1}
                </button>
              ))}

              <button
                type="button"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => {
                  setPage((val) => {
                    const nextVal = val + 1;
                    loadAirports(nextVal);
                    return nextVal;
                  });
                }}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
