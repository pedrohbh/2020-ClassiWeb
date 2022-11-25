import React from 'react';
import ReactDOM from 'react-dom';

class Carousel extends React.Component
{
	constructor(props)
	{
		super(props);		
		this.state = {image : ""};		
	}

	
	
	render() {  
      return (
        <div><ReactCarousel ></ReactCarousel><img src={image}></img><AutoRotatingCarousel ></AutoRotatingCarousel><img src={image}></img></div>
      );
    }
  }

}