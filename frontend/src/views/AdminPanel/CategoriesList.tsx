import { DataGrid, GridColDef, GridCellParams } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CategoryController from '../../controllers/CategoryController';
import Swal from 'sweetalert2';
import StyledButton from '../../components/StyledButton';

const useStyles = makeStyles({
  root: {
    '& .categories div': {
      fontWeight: 'bold',
    },
  }
});

export default function CategoriesList() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryController.getAll()
      .then(CategoriesList => {
        CategoriesList.sort((a, b) => a.name.localeCompare(b.name))

        const r = [] as  any;
        CategoriesList.map(({ name }, index) => {
          r.push({ id: index, category: name})
        });
        
        setCategories(r);
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

  const handleCreateCategory = async () => {
    const resp = await Swal.fire({
      title: "Qual o nome da nova categoria?",
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#80cc54', 
      cancelButtonText: 'Cancelar'
    });

    if (resp.isConfirmed){
      if (resp.value){
        await CategoryController.postCategory({ name: resp.value })
        .then((response) => {
          const categoriesTmp = ([...categories, { id: categories.length, category: resp.value}] as any)
            .sort((a, b) => a.category.localeCompare(b.category));
          setCategories(categoriesTmp);
          Swal.fire({
            title: `A categoria ${resp.value} foi cadastrada com sucesso!`,
            confirmButtonColor: '#80cc54'
          });
        });
      }  
      else Swal.fire({
        title: 'Digite um nome válido!',
        confirmButtonColor: '#80cc54'
      });
    }  
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
          {/* 
         
          */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: 'auto', width: '50%' }} className={classes.root}>
      <DataGrid rows={categories} columns={columns}
        autoHeight
        hideFooter
        sortingOrder={[null]}
        sortingMode='server'
        disableColumnMenu
        disableSelectionOnClick
      />
      <StyledButton 
        style={{ float: 'right' }}
        onClick={handleCreateCategory}
      >
        Nova categoria
      </StyledButton>
    </div>
  );
}