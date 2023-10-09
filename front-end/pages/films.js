import Films from "@/components/Films";
import Layout from "@/components/Layout";
import { fetcher } from "@/lib/api";
import { useState } from "react";
import useSWR from "swr";

//Updates filmslist if there's new data
//Gotta update both URL's
const FilmsList = ({ films }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/films?pagination[page]=${pageIndex}&pagination[pageSize]=3`,
    fetcher,
    {
      fallbackData: films,
    }
  );
  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Films
        </span>
      </h1>
      <Films films={data} />
      <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black dark:text-white p-2 ${
            pageIndex === 1 ? "bg-gray-300" : "bg-blue-400"
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {" "}
          Previous
        </button>
        {/* If i don't have more pages to go to, disable 'Next' button */}
        <button
          className={`md:p-2 rounded py-2 text-black dark:text-white p-2 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? "bg-gray-300"
              : "bg-blue-400"
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
      </div>
    </Layout>
  );
};

export default FilmsList;

//Request from Server, 1st data to be shown, and then fetch from FilmsList because of fallbackData
export async function getServerSideProps() {
  //Page 1 on initial load, then will depend on users input, that's why we put [page]=1 here and the pageIndex on the useSWR
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/films?pagination[page]=1&pagination[pageSize]=3`
  );
  // console.log(filmsResponse);
  return {
    props: {
      films: filmsResponse,
    },
  };
}
