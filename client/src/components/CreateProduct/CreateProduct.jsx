// import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxios from "../../hooks/useAxios";

const CreateProduct = () => {
  const { user } = useAuth();
  // const axiosInstance = useAxios();

  const axiosSecure = useAxiosSecure();

  const handleCreateAProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    // console.log(title, image, price_min, price_max);

    const newProduct = {
      title,
      image,
      price_min,
      price_max,
      email: user.email,
      seller_name: user.displayName,
    };

    axiosSecure.post("/products", newProduct).then((data) => {
      console.log(data.data.insertedId);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Created Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // //   axiosInstance.post("/products", newProduct).then((data) => {
  //     console.log(data);
  //     if (data.data.insertedId) {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Product Created Successfully.",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // };
  //   axios.post("http://localhost:5000/products", newProduct).then((data) => {
  //     console.log(data);
  //     if (data.data.insertedId) {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Product Created Successfully.",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // };

  return (
    <div className="md:w-1/2 mx-auto">
      <form onSubmit={handleCreateAProduct}>
        <fieldset className="fieldset">
          <label className="label">Title</label>
          <input type="text" name="title" className="input" />
          {/* email */}
          <label className="label">Image URL</label>
          <input type="text" className="input" name="image" />
          {/* bid amount */}
          <label className="label">Price Minimum</label>
          <input
            type="text"
            name="price_min"
            className="input"
            placeholder="Minimum Price"
          />
          {/* bid amount */}
          <label className="label">Price Maximum</label>
          <input
            type="text"
            name="price_max"
            className="input"
            placeholder="Maximum Price"
          />
          <button className="btn btn-neutral mt-4">Add A Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProduct;
