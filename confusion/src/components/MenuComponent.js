import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderDish({ dish, onClick }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Menu(props) {
  if(props.isLoading) {
    return (
      <Loading/>
    )
  }
  else if(props.errorMessage) {
    return (
      <div className="container">
        <p>{props.errorMessage}</p>
        <p>Something went wrong while fetching the dishes.</p>
      </div>
    )
  }
  else if(props.dishes){
    const menu = props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} onClick={props.onClick} />
        </div>
      );
    });
  
    return (
      <div className="container">
        <div className="row">{menu}</div>
      </div>
    );
  }
}

export default Menu;
