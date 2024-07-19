import { useState } from "react";
import ProductListing from "./components/ProductListing";
import { ToastContainer } from "react-toastify";
import { useDebounceFn } from "./hooks/useDebounceFn";
import dayjs from "dayjs";
import "./MultiDateRangePicker.css";
import MultiDatePicker from "./components/common/MultiDatePicker";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: dayjs().subtract(2, "month").toDate(),
    endDate: new Date(),
  });

  const debouncedSearch = useDebounceFn(
    (searchStr) => setSearch(searchStr),
    700
  );

  return (
    <>
      <div className="p-4 max-w-[1100px] mx-auto my-0">
        <div className="flex mb-4 justify-between items-center">
          <input
            type="text"
            className="rounded-md h-12 outline-none shadow-md p-4 w-[200px] md:w-[300px]"
            placeholder="Search..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <div className="flex gap-3">
            <MultiDatePicker
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
            />
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border h-10 rounded-md outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <button
              className="bg-blue-500 text-white font-medium hover:bg-blue-700 transition-all hover:font-semibold ease-in-out duration-200 px-4 py-2 rounded mb-4"
              onClick={() => setIsModalOpen(true)}
            >
              Add Product
            </button>
          </div>
        </div>
        <ProductListing
          setIsModalOpen={setIsModalOpen}
          search={search}
          sort={sort}
          selectedDateRange={selectedDateRange}
          isModalOpen={isModalOpen}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
