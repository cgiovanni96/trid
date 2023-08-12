import { TRID_ACTIONS } from "@/lib/actions";

export default async function Home() {
  const result = await TRID_ACTIONS.fetchTrids({
    pageSize: 30,
    pageNumber: 1,
  });

  console.log("result", result);

  return (
    <>
      <h1 className="head-text text-left">
        Trid
      </h1>
    </>
  );
}
