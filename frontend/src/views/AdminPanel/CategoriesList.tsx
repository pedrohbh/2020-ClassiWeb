import Button from '@material-ui/core/Button';
import { DataGrid, GridColDef, GridCellParams } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CategoryController from '../../controllers/CategoryController';

const useStyles = makeStyles({
  root: {
    '& .categories div': {
      fontWeight: 'bold',
    },
  },
});

export default function RenderCellGrid() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    CategoryController.getAll()
        .then(CategoriesList => {
            setCategories(CategoriesList);

            const r = [] as  any;
            CategoriesList.map(({ name }, index) => {
              r.push({ id: index, category: name})
            });
            
            setRows(r);
        });
  }, []);

  const handleDeleteCategory = async event => {
    const category = event
    .target
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .children[0]
    .outerText;
  
    // const response = await CategoryController.deleteCategory(category);
    // console.log(response)

    // CategoryController.getAll()
    //   .then(CategoriesList => {
    //       setCategories(CategoriesList);

    //       const r = [] as  any;
    //       CategoriesList.map(({ name }, index) => {
    //         r.push({ id: index, category: name})
    //       });
          
    //       setRows(r);
    //   });
  }

  const columns: GridColDef[] = [
    {
      field: 'category',
      headerClassName: 'categories',
      headerName: 'Categorias',
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          {params.value}
          <Button onClick={handleDeleteCategory}>
            <DeleteIcon style={{ fontSize: 20 }}/>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: 'auto', width: '50%' }} className={classes.root}>
      <DataGrid rows={rows} columns={columns}
        autoHeight
        hideFooter
        sortingOrder={[null]}
        sortingMode='server'
        disableColumnMenu
        disableSelectionOnClick
      />
    </div>
  );
}