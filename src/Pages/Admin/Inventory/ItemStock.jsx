import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState, useEffect } from "react";
import ActionControls from "../../../Layouts/ActionControls";
import { Offcanvas } from "bootstrap";
import { Link } from "react-router-dom";
import DataLoader from 'src/Layouts/Loader';
import { useForm } from "react-hook-form";

import { getAllStockData } from "../../../Utils/Apis";

const Container = styled.div`
    
    select:-internal-list-box{
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    

`;

const tableHeadingData = [
  "#",
  'Category',
  "Product Name",
  "Quantity",
];

const dummyStockData = [
  {
    id: 1,
    category: 'Books Stationery',
    productName: "Paper and Pencils",
    quantity: "10",
  },
  {
    id: 2,
    category: 'Books Stationery',
    productName: "Notebooks",
    quantity: "20",
  },
];

const ItemStock = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [isChecked, setIsChecked] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({});

  const openAddCanvas = () => {
    const offcanvasElement = document.getElementById('add_staticBackdrop');
    const bsOffcanvas = new Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  };

  const [loaderState, setLoaderState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [StockData, setSetStockData] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");


  useEffect(() => {
    getAllSupplierData();
  }, [token, pageNo, pageSize])




  const getAllSupplierData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllStockData(searchInputVal, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === "success") {
        setSetStockData(response.data.stocks || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch suppliers");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching suppliers");
    } finally {
      setLoaderState(false);
    }
  };


  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1);
  };


  return (
    <>
      <Container>
        {
          loaderState && (
            <DataLoader />
          )
        }
        <div className="container-fluid p-4">
          <div className="row pb-3 gap-xl-0 gap-3">
            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                <li className="breadcrumb-item"><a href="/admin/inventory/itemsupplier" className='bredcrumText text-decoration-none'>Inventory</a></li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Item Stock</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Item Stock</p>
          </div>

          <div className="row pb-3">
            <div className="bg-white rounded-2 p-3">
              {StockData.length > 0
                ?
                <>
                  <div className="overflow-scroll">
                    <table className="table align-middle table-striped">
                      <thead>
                        <tr>
                          {tableHeadingData.map((item) => (
                            <th className={`textWrapClass font14 'text-center' ${item === "Action" && 'text-end'}`}>{item}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {StockData.map((item, index) => (
                          <tr key={item.id} className='align-middle'>
                            <td className='textWrapClass greyText font14'>{index + 1}</td>
                            <td className='textWrapClass greyText font14'>{item.categoryName}</td>
                            <td className='textWrapClass greyText font14'>{item.itemName}</td>
                            <td className='textWrapClass greyText font14'>{item.availableQuantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
                :
                <>
                  <div className="d-flex justify-content-center p-5 m-5">
                    <img src="/images/search.svg" alt="" className='img-fluid p-5' />
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ItemStock;
