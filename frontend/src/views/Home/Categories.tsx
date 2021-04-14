import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CategoryController from "../../controllers/CategoryController";
import { Skeleton } from '@material-ui/lab';
import { useHistory } from "react-router";

export default function Categories() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = event => {
    localStorage.setItem('searchCategory', event.target.textContent);
    history.push('/search');
  }

  useEffect(() => {
    CategoryController.getAll()
      .then(categoriesList => {
        if (categoriesList) {
          setCategories(categoriesList.sort((a, b) => a.name.localeCompare(b.name)));
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <Grid 
      item 
      xs={3} 
      lg={2} 
      style={{ 
        height: 'auto', 
        boxShadow: "2px 2px 8px 1px #dedede", 
        padding: "20px", 
        borderRadius: '5px'
      }}
    >
      <h3 style={{ marginBottom: '2vh' }}>Categorias</h3>
      <Grid container spacing={1}>
        {
          isLoading ?
            <>
              <Skeleton variant="rect" width={'80%'} style={{ margin: '0 0 1vh 2vh'}}/>
              <Skeleton variant="rect" width={'60%'} style={{ margin: '0 0 1vh 2vh'}}/>
              <Skeleton variant="rect" width={'40%'} style={{ margin: '0 0 1vh 2vh'}}/>
              <Skeleton variant="rect" width={'85%'} style={{ margin: '0 0 1vh 2vh'}}/>
              <Skeleton variant="rect" width={'75%'} style={{ margin: '0 0 1vh 2vh'}}/>
            </>
            :
            categories.map(({ name }) => (
              <Grid item xs={12} key={name}>
                <Button key={name} onClick={handleClick}>
                  {/* <NavigateNextRoundedIcon/> */}
                  {name}
                </Button>
              </Grid>
            ))
        }
      </Grid>
    </Grid>
  );
}