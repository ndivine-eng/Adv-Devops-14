const Dashboard = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header / Welcome */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
          <span>Hello, Nubuhoro Divine</span>
          <span role="img" aria-label="wave">👋</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back to your workspace!
        </p>
      </header>

      {/* Top Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">
            Tasks completed today
          </p>
          <p className="text-4xl font-bold text-blue-600 mt-2">5</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">
            Upcoming deadlines
          </p>
          <p className="text-4xl font-bold text-blue-600 mt-2">3</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">
            Overdue tasks
          </p>
          <p className="text-4xl font-bold text-blue-600 mt-2">2</p>
        </div>
      </section>

      {/* Task List */}
      <section className="bg-white rounded-xl shadow border border-gray-100 p-6">
        {/* Header row with button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Task List
          </h2>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow">
            + Add New Task
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left border-b border-gray-200">
                <th className="py-3 px-4 font-medium">Task</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Deadline</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">Design homepage</td>
                <td className="py-3 px-4">
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    Pending
                  </span>
                </td>
                <td className="py-3 px-4">UI</td>
                <td className="py-3 px-4">Sep 15</td>
              </tr>

              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">Develop API</td>
                <td className="py-3 px-4">
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    In Progress
                  </span>
                </td>
                <td className="py-3 px-4">Backend</td>
                <td className="py-3 px-4">Sep 12</td>
              </tr>

              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">Write unit tests</td>
                <td className="py-3 px-4">
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    Done
                  </span>
                </td>
                <td className="py-3 px-4">Testing</td>
                <td className="py-3 px-4">Sep 10</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">Create landing page</td>
                <td className="py-3 px-4">
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    Pending
                  </span>
                </td>
                <td className="py-3 px-4">UI</td>
                <td className="py-3 px-4">Sep 18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
