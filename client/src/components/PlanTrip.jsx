import SelectCar from "../images/plan/icon1.png";
import Drive from "../images/plan/icon2.png";

function PlanTrip() {
  return (
    <>
      <section className="plan-section mt-20">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Plan your trip now</h3>
              <h2>Quick & easy</h2>
            </div>

            <div className="plan-container__boxes flex justify-between">
              <div className="plan-container__boxes__box flex flex-col items-center justify-center">
                <img src={SelectCar} alt="icon_img" />
                <h3>Select Car</h3>
                <p>We offers a big range of vehicles for all your driving needs. We have the perfect car to meet your needs</p>
              </div>

              <div className="plan-container__boxes__box flex flex-col items-center justify-center">
                <img src={Drive} alt="icon_img" />
                <h3>Let's Drive</h3>
                <p>Whether you're hitting the open road, we've got you covered with our wide range of cars</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
