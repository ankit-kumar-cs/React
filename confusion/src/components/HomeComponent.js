import { Fragment } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

function RenderCard({item}) {
  console.log("Item", JSON.stringify(item));
  
  return (
    <Card>
      <CardImg src={baseUrl + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderDishConditionally({isLoading, errorMessage, item}) {
  if(isLoading) {
    return(
      <Loading/>
    )
  }
  else if(errorMessage) {
    return (
      <Fragment>
        <p>{errorMessage}</p>
      </Fragment>
    )
  }
  return (
    <RenderCard item={item} />
  )
}
function Home(props) {
  const { dish,
    promotion,
    leader, 
    dishLoading, 
    dishErrorMessage, 
    promosLoading, 
    promosErrorMessage,
    leadersLoading,
    leadersErrorMessage
  } = props;
  return (
    <div className="container">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <RenderDishConditionally isLoading={dishLoading} errorMessage={dishErrorMessage} item={dish}/>
          </div>
          <div className="col-12 col-md m-1">
            <RenderDishConditionally isLoading={promosLoading} errorMessage={promosErrorMessage} item={promotion}/>
          </div>
          <div className="col-12 col-md m-1">
            <RenderDishConditionally item={leader} isLoading={leadersLoading} errorMessage={leadersErrorMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
