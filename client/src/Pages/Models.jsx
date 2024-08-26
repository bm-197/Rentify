import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useGetAllCarsQuery, usePickCarMutation } from "../features/api/apiSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ArrowForward from "@mui/icons-material/ArrowForward";
function Models() {
  const { data, isLoading, isError } = useGetAllCarsQuery();
  const [pickCarData, pickCarResponse] = usePickCarMutation();

  const [cars, setCars] = useState([]);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [carPayment, setCarPayment] = useState("");
  const [pickDate, setPickDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [pickError, setPickError] = useState(false);
  const [fillError, setFillError] = useState(false);

  const [formPopUp, setFormPopUp] = useState(false);

  useEffect(() => {
    if (pickCarResponse.status === "fulfilled") {
      setPickError(true);
      setTimeout(() => {
        setPickError(false);
      }, 6000);
    }
  }, [pickCarResponse]);
  const formHandler = (car) => {
    if (!localStorage.getItem("jwt")) {
      setErrorMessage("to proceed please login first");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    } else if (localStorage.getItem("jwt")) {
      setCarPayment(car);
      setFormPopUp(true);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setCars(data);
      cars && console.log(cars, "cars");
    }
  }, [data]);

  useEffect(() => {
    if (searchInput.length > 0) {
      setCars(
        data?.filter((d) =>
          d.model.toString().toLowerCase().startsWith(searchInput.toLowerCase()) ||
          d.mark.toString().toLowerCase().startsWith(searchInput.toLowerCase())
        ) || []
      );
    } else {
      setCars(data || []);
    }
  }, [searchInput, data]);

  //pick car handler
  console.log(pickDate.toString().length, pickTime.toString().length);
  const pickCarHandler = (data) => {
    const { firstName, lastName, email, address, phone, profilePic } = JSON.parse(localStorage.getItem("user"));
    if (pickDate.toString().length > 0 && dropDate.toString().length > 0 && pickTime.toString().length > 0 && dropTime.toString().length > 0) {
      pickCarData({
        firstName,
        lastName,
        email,
        address,
        phone,
        profilePic,
        carPhoto: data.carPhoto,
        model: data.model,
        mark: data.mark,
        token: localStorage.getItem("jwt"),
        price: data.price,
        pickDate,
        pickTime,
        dropDate,
        dropTime,
        id: data._id,
      });
      setPickDate(" ");
      setDropDate(" ");
      setPickTime(" ");
      setDropTime(" ");
      setFormPopUp(false);
      setFillError(false);
    } else {
      setFillError(true);
      setTimeout(() => {
        setFillError(false);
      }, 5000);
    }
  };
  //_____________________________________________________________________________________________

  const [paymentContainer, setPaymentContainer] = useState(false);
  const [carPrice, setCarPrice] = useState("");
  const paymentHandler = (car) => {
    if (pickDate.toString().length > 0 && dropDate.toString().length > 0 && pickTime.toString().length > 0 && dropTime.toString().length > 0) {
      setPaymentContainer(true);
    } else {
      setPaymentContainer(false);
      setFillError(true);
      setTimeout(() => {
        setFillError(false);
      }, 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-5xl">Loading...</div>
      </div>
    );
  }
  if (isError || !cars) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-5xl">Failed to load cars</div>
      </div>
    );
  }
  

  return (
    <>
      <section className="models-section">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="w-[80%] mx-[10%] h-20 mt-44 border focus:outline-none focus:border-2 rounded-full text-center text-2xl font-extrabold border-[#ff4c30] mb-10"
          placeholder="Search Vehicles"
        />
        {/* <HeroPages name="Vehicle Models" /> */}
        <div className="container">
        <div className="models-div flex flex-wrap gap-8 justify-center">
        {cars ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="relative flex flex-col items-center rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105 w-[350px] overflow-hidden border border-gray-200 p-4"
            >
              {/* Image Section */}
              <div className="w-full mb-4">
                <img
                  src={`http://localhost:5000/uploads/${car.carPhoto}`}
                  alt="Car"
                  className="w-full h-[180px] object-cover rounded-md shadow-md"
                />
              </div>

              {/* Car Info */}
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{car.mark}</h2>
              </div>

              {/* Icons and Info Section */}
              <div className="grid grid-cols-2 gap-4 text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                  <span className="text-4xl">🚗</span>
                  <p className="text-lg">{car.model}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">⚙️</span>
                  <p className="text-lg">{car.transmission}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">⛽</span>
                  <p className="text-lg">{car.fuel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">🚪</span>
                  <p className="text-lg">{car.door} Doors</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">❄️</span>
                  <p className="text-lg">{car.ac ? "AC" : "No AC"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-5xl">💵</span>
                  <p className="text-lg">${car.price}/day</p>
                </div>
              </div>

              {/* Booking Button */}
              {car.status === "Available" ? (
                <button
                  onClick={() => {
                    formHandler(car);
                    setCarPrice(car.price);
                  }}
                  className="mt-4 w-[90%] bg-[#ff2525] text-white py-2 rounded-full text-lg font-semibold hover:bg-red-600 transition"
                >
                  Book
                </button>
              ) : (
                <div className="mt-4 w-[90%] text-center bg-red-500 text-white py-2 rounded-full text-lg font-semibold cursor-default">
                  Taken
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full text-3xl font-bold text-gray-500">
            Loading...
          </div>
        )}

          {error && errorMessage && (
            <div className="absolute z-20 text-3xl top-72 right-10 w-auto rounded-md h-auto border border-gray-500 text-gray-500 py-2 px-2 shadow-xl shadow-gray-400 flex items-center justify-center">
              {errorMessage}
            </div>
          )}

            {/* ################################################################################## */}
            {formPopUp && carPayment && (
            <div className="fixed z-10 backdrop-blur-lg backdrop-brightness-[0.7] bg-black/50 h-full w-full top-0 left-0 flex items-center justify-center">
              <div
                onClick={() => {
                  setPickDate("");
                  setDropDate("");
                  setPickTime("");
                  setDropTime("");
                  setFormPopUp(false);
                }}
                className="absolute inset-0 bg-transparent"
              ></div>
              <div className="relative text-base lg:text-lg flex flex-col items-center justify-center rounded-lg z-30 bg-white shadow-lg h-auto w-[85%] lg:w-[60%] p-4 lg:p-6">
                <p className="text-2xl font-extrabold text-gray-500 mb-4">Rental Information</p>
                
                {/* Car Image and Information */}
                <div className="flex flex-col lg:flex-row w-full gap-4 ">
                  <img src={`http://localhost:5000/uploads/${carPayment.carPhoto}`} alt="car" className="w-full lg:w-[45%] rounded-md h-auto transition-transform transform hover:scale-105" />
                    <div className="w-full lg:w-[55%] flex flex-col gap-2 bg-gray-100 p-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
                        {[
                        { label: 'Model', value: carPayment.model, icon: '🚗' },
                        { label: 'Price', value: `$ ${carPayment.price}`, icon: '💵' },
                        { label: 'Door', value: carPayment.door, icon: '🚪' },
                        { label: 'Fuel', value: carPayment.fuel, icon: '⛽' },
                        { label: 'Transmission', value: carPayment.transmission, icon: '⚙️' },
                        { label: 'AC', value: carPayment.ac ? 'Yes' : 'No', icon: '❄️' },
                        { label: 'Mark', value: carPayment.mark, icon: '🏷️' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-around text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl mr-2">{item.icon}</span>
                            <p className="font-semibold text-lg">{item.label}:</p>
                          </div>
                          <p className="text-red-500 font-semibold text-lg">{item.value}</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Rental Form and Payment Method */}
                <div className="flex flex-col lg:flex-row w-full mt-6 gap-6">
                  {/* Rental Form */}
                  <div className="w-full lg:w-[45%] flex flex-col bg-white p-5 border border-gray-200 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                    <p className="text-2xl font-extrabold text-gray-700 mb-3">Rental Form</p>
                    <p className="text-base font-medium text-red-500 mb-4">* All fields are required *</p>

                    <div className="mb-5">
                      <p className="font-bold text-lg text-gray-600 mb-2">Pick-Up Date & Time</p>
                      <div className="flex gap-3">
                        <input 
                          required 
                          onChange={(e) => setPickDate(e.target.value)} 
                          type="date" 
                          className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        />
                        <input 
                          required 
                          onChange={(e) => setPickTime(e.target.value)} 
                          type="time" 
                          className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-bold text-lg text-gray-600 mb-2">Drop-Off Date & Time</p>
                      <div className="flex gap-3">
                        <input 
                          required 
                          onChange={(e) => setDropDate(e.target.value)} 
                          type="date" 
                          className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        />
                        <input 
                          required 
                          onChange={(e) => setDropTime(e.target.value)} 
                          type="time" 
                          className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="w-full lg:w-[55%] flex flex-col bg-white p-6 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                      <p className="text-2xl font-extrabold text-gray-800 mb-4">Payment Methods</p>
                      
                      <div className="flex flex-col gap-6">
                        {/* Test Mode */}
                        <div className="flex flex-col items-center border-b border-gray-300 pb-5">
                          <p className="text-xl font-bold text-red-600 mb-2">Test Mode</p>
                          <p className="text-base font-medium text-gray-700 mb-4 text-center">Test this system without any payment</p>
                          <button
                            onClick={() => pickCarHandler(carPayment)}
                            className="w-full flex gap-3 text-white h-12 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 font-bold transition duration-200 rounded-lg shadow-sm hover:scale-105 item-center justify-center"
                          >
                            <span className="text-lg">Book Car</span>
                          </button>
                        </div>

                        {/* Real Payment */}
                        <div className="flex flex-col items-center">
                          <p className="text-xl font-bold text-blue-600 mb-2">Real Payment</p>
                          <div className="flex gap-3 mb-4">
                            <img src="./paypal.png" alt="PayPal" className="h-10 w-10" />
                            <img src="./discover.png" alt="Discover" className="h-10 w-10" />
                            <img src="./visa.png" alt="VISA" className="h-10 w-10" />
                            <img src="./master.png" alt="MasterCard" className="h-10 w-10" />
                          </div>
                          <div
                            onClick={() => paymentHandler()}
                            className="w-full flex gap-3 text-white h-12 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-bold transition duration-200 rounded-lg shadow-sm hover:scale-105 cursor-pointer items-center justify-center"
                          >
                            <span className="text-lg">Pay</span>
                            <ArrowForward fontSize="medium" />
                          </div>
                        </div>
                      </div>
                  </div>

                </div>

                {/* Error Messages */}
                {pickCarResponse.status === "rejected" && (
                  <div className="w-full px-3 py-2 mt-4 border border-red-500 bg-red-100 text-red-500 text-center text-base rounded">
                    {pickCarResponse.error.data}
                  </div>
                )}
                {pickError && (
                  <div className="w-full px-3 py-2 mt-4 border border-emerald-500 bg-emerald-100 text-emerald-500 text-center text-base rounded">
                    {pickCarResponse.data.message}
                  </div>
                )}
                {fillError && (
                  <div className="w-full px-3 py-2 mt-4 border border-gray-500 bg-gray-100 text-gray-500 text-center text-base rounded">
                    Please insert pick and drop date
                  </div>
                )}
              </div>
            </div>
          )}

            {/* ______________________________________________###################____________________ */}
            {paymentContainer && (
              <div className={`fixed overflow-y-scroll left-0 py-10 top-0 flex flex-col z-50 min-h-[100vh] max-h-[200vh] h-auto w-full bg-white justify-center items-center`}>
                <div className="absolute overflow-y-scroll left-0 py-10 top-0 flex flex-col z-50 min-h-[100vh] max-h-[200vh] h-auto w-full bg-white justify-center items-center">
                  <p className="text-3xl font-extrabold my-4 uppercase">Pay with</p>
                  <div className="flex gap-1 w-[50%] bg-white justify-center">
                    <img src="./paypal.png" alt="VISA" className="h-20 w-20" />
                    <img src="./discover.png" alt="VISA" className="h-20 w-20" />
                    <img src="./visa.png" alt="VISA" className="h-20 w-20" />
                    <img src="./master.png" alt="VISA" className="h-20 w-20" />
                  </div>
                  <PayPalScriptProvider options={{ "client-id": "AXbnaHO5pAQ6QObPGEGgbpZmMfYz6vjA9RyeqYnTSt07Jk52Og84IIL0fkyjnQ_E - iGzE6B6yqi2CBVb" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order
                          .create({
                            purchase_units: [
                              {
                                amount: {
                                  value: carPrice,
                                },
                              },
                            ],
                          })
                          .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                          });
                      }}
                      onApprove={function (data, actions) {
                        pickCarHandler(carPayment);
                        return actions.order.capture().then(function () {
                          alert("payment is done car booked successfully");
                        });
                      }}
                      onError={(err) => {
                        alert(err);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
                <p
                  fontSize="large"
                  className="absolute cursor-pointer z-50 top-4 right-4 text-black hover:bg-gray-200 font-extrabold py-2 text-xl px-2 border"
                  onClick={() => setPaymentContainer(false)}
                >
                  Close
                </p>
              </div>
            )}
            {/* ################################################################################## */}
          </div>
          {cars && cars.length < 1 && <div className="w-[100%] font-extrabold h-[100%] flex items-center justify-center text-3xl text-gray-500">Cars Not Found</div>}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models;
