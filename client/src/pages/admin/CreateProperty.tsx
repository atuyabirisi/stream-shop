import CreatePropertyForm from "../../components/admin/CreatePropertyForm";

export default function CreateProperty() {
  return (
    <div
      className="
        w-full

        /* 👇 KEY FIX: remove horizontal squeeze on mobile */
        px-0 sm:px-4 lg:px-8

        py-4 sm:py-6 lg:py-8
      "
    >
      {/* CONTENT CONTAINER (controls desktop width only) */}
      <div className="w-full max-w-5xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-6 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Create Property
          </h2>

          <h1 className="text-black-400 mt-1">
            Add a new listing to your Airbnb-style portfolio
          </h1>
        </div>

        {/* FORM */}
        <CreatePropertyForm />
      </div>
    </div>
  );
}
