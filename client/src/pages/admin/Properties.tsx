import ViewProperties from "../../components/admin/ViewProperties";

export default function Properties() {
  return (
    <div className="w-full space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Properties
        </h2>
        <p className="text-sm text-gray-500">Manage your listed properties</p>
      </div>

      {/* CONTENT */}
      <ViewProperties />
    </div>
  );
}
