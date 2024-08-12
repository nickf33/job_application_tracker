import React from "react";

const WatchList = () => {
  return (
    <div className="mt-6">
      {watches.map((watch) => (
        <div key={watch.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl text-white mb-2">
            {watch.brand} - {watch.model}
          </h2>
          <div className="flex space-x-2">
            <form action={deleteWatch}>
              <input type="hidden" name="id" value={watch.id} />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </form>
            <EditWatch watch={watch} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchList;
