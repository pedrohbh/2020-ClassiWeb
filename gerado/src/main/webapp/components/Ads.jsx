import React from 'react';
import ReactDOM from 'react-dom';

class Ads extends React.Component
{
	constructor(props)
	{
		super(props);		
		this.state = {header : ""};		
	}

	
	
	render() {  
      return (
        <div><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Grid ></Grid><Skeleton ></Skeleton><StyledButton ></StyledButton><RefreshIcon ></RefreshIcon><Pagination ></Pagination><h1 id="header">{{ header }}</h1><h1 id="header">{{ header }}</h1>
	<ad-card />
	</div>
      );
    }
  }

}