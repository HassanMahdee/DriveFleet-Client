export default function CarUpdateModal({ selectedCar, onUpdate }) {
  return (
    <dialog id="update_modal" className="modal">
      <div className="modal-box bg-base-200 rounded-2xl max-w-lg">
        <h3 className="font-bold text-xl mb-4">Update Car</h3>
        <form onSubmit={onUpdate} className="space-y-4">
          <div className="form-control">
            <label className="label">Daily Rent Price (৳)</label>
            <input
              type="number"
              defaultValue={selectedCar?.dailyRentPrice}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Image URL</label>
            <input
              type="url"
              defaultValue={selectedCar?.imageURL}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Car Type</label>
            <select
              className="select select-bordered w-full"
            >
              <option value="Luxury Sedan">Luxury Sedan</option>
              <option value="Luxury SUV">Luxury SUV</option>
              <option value="Sports">Sports</option>
              <option value="Hypercar">Hypercar</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">Pickup Location</label>
            <input
              type="text"
              defaultValue={selectedCar?.pickupLocation}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              rows={3}
              defaultValue={selectedCar?.description}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text">Available for rent</span>
              <input
                type="checkbox"
                defaultChecked={selectedCar?.available}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById("update_modal").close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary rounded-full">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
