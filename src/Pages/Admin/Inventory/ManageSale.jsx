import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import ActionControls from "../../../Layouts/ActionControls";
import { Link, useNavigate } from "react-router-dom";
import DataLoader from 'src/Layouts/Loader';
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import {
  getAllSalesApi,
  getSaleByIdApi,
} from "../../../Utils/Apis";

const Container = styled.div`
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .viewbutton {
        border-radius: 30px;
        background-color: #008479;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .paybutton {
        border-radius: 30px;
        background-color: #FF914C;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .form-select {
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
    }

    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns {
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder,
    .form-control,
    .form-select {
        color: var(--greyState);
    }

    .form-control,
    .form-select {
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked {
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder {
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
`;

const tableHeadingData = [
  "#",
  "Invoice Number",
  "Sale To",
  "Gross Amount",
  "Discount",
  "Net Amount",
  "Status",
  "Action",
];

const ItemSale = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  // Form instances
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd, isValid: isValidAdd },
    setValue: setValueAdd,
    reset: resetAdd,
  } = useForm({
    mode: 'onChange',
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    setValue: setValueEdit,
    reset: resetEdit,
  } = useForm({
    mode: 'onChange',
  });

  // Fetch All Sales
  useEffect(() => {
    getAllSales();
  }, []);

  const getAllSales = async () => {
    try {
      setLoaderState(true);
      const response = await getAllSalesApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setSalesData(response.data.sales || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch sales');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching sales');
    } finally {
      setLoaderState(false);
    }
  };

  const getSaleById = async (id) => {
    try {
      setLoaderState(true);
      const response = await getSaleByIdApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setSelectedSale(response.data.sale || null);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch sale details');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching sale details');
    } finally {
      setLoaderState(false);
    }
  };

  const AddSaleButton = () => {
    navigate('/admin/inventory/addSale');
  };

  const handleViewClick = (id) => {
    getSaleById(id);
  };


  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <Toaster />
        <div className="container-fluid p-4">
          <div className="row pb-3 gap-xl-0 gap-3">
            <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 p-0">
              <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <a href="/" className="bredcrumText text-decoration-none">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/admin/inventory" className="bredcrumText text-decoration-none">Inventory</a>
                  </li>
                  <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Sale</li>
                </ol>
              </nav>
              <p className="font14 ps-0 fontWeight500">Manage Sale</p>
            </div>
            <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
              <ActionControls
                showAddButton={true}
                addButtonText="Add Sale"
                addButtonAction={AddSaleButton}
                showSearch={false}
                searchAction={''}
                showExportPDF={false}
                exportPDFText="Export PDF"
                exportPDFAction={''}
                exportPDFFileName="Sales.pdf"
                showExportCSV={false}
                exportCSVText="Export CSV"
                exportCSVAction={''}
                exportCSVFileName="Sales.xlsx"
              />
            </div>
          </div>

          <div className="row pb-3">
            <div className="bg-white rounded-2 p-3">
              {salesData.length > 0 ? (
                <div className="overflow-scroll">
                  <table className="table align-middle table-striped">
                    <thead>
                      <tr>
                        {tableHeadingData.map((item) => (
                          <th key={item} className={`textWrapClass font14 ${item === "Action" ? 'text-end' : 'text-center'}`}>
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.map((item, index) => (
                        <tr key={item.id} className="align-middle">
                          <td className="textWrapClass greyText font14">{index + 1}</td>
                          <td className="textWrapClass greyText font14">{item.invoiceNumber}</td>
                          <td className="textWrapClass greyText font14">{item.saleTo}</td>
                          <td className="textWrapClass greyText font14">
                            {item.items.reduce((sum, i) => sum + (i.subTotal || 0), 0).toFixed(2)}
                          </td>
                          <td className="textWrapClass greyText font14">{item.discount.toFixed(2)}</td>
                          <td className="textWrapClass greyText font14">{item.grandTotal.toFixed(2)}</td>
                          <td className="textWrapClass greyText font14">{item.saleStatus}</td>
                          <td className="text-end">
                            {item.saleStatus !== 'PAID' && (
                              <span
                                className="paybutton me-3"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#Edit_staticBackdrop"
                                aria-controls="Edit_staticBackdrop"
                                style={{ cursor: "pointer" }}
                              >
                                Pay
                              </span>
                            )}
                            <span
                              className="viewbutton"
                              data-bs-toggle="modal"
                              data-bs-target="#viewDetails"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleViewClick(item.id)}
                            >
                              View
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="d-flex justify-content-center p-5 m-5">
                  <img src="/images/search.svg" alt="" className="img-fluid p-5" />
                </div>
              )}
            </div>
          </div>

          {/* View Sale Modal */}
          <div className="modal modal-lg fade" id="viewDetails" tabIndex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header p-1 px-3">
                  <h2 className="modal-title" id="viewDetailsLabel">View Sale</h2>
                  <div className="d-flex align-items-center">
                    <button className="btn greyText" type="button">
                      <Download /> <span className="ms-1 greyText">Download</span>
                    </button>
                    <button type="button" className="btn-close greyText" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                </div>
                <div className="modal-body p-0">
                  <div className="container-fluid p-3">
                    {selectedSale ? (
                      <>
                        <div className="row">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-5"><span>Invoice Number</span></div>
                                  <div className="col-2"><span>:</span></div>
                                  <div className="col-5"><span>{selectedSale.invoiceNumber}</span></div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-5"><span>Discount</span></div>
                                  <div className="col-2"><span>:</span></div>
                                  <div className="col-5"><span>{selectedSale.discount.toFixed(2)}</span></div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-5"><span>Sale To</span></div>
                                  <div className="col-2"><span>:</span></div>
                                  <div className="col-5"><span>{selectedSale.saleTo}</span></div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-5"><span>Net Amount</span></div>
                                  <div className="col-2"><span>:</span></div>
                                  <div className="col-5"><span>{selectedSale.grandTotal.toFixed(2)}</span></div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-5"><span>Gross Amount</span></div>
                                  <div className="col-2"><span>:</span></div>
                                  <div className="col-5">
                                    <span>{selectedSale.items.reduce((sum, i) => sum + (i.subTotal || 0), 0).toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-5"><span>Status</span></div>
                                  <div className="col-2"><span>:</span></div>
                                  <div className="col-5"><span>{selectedSale.saleStatus}</span></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12">
                            <table className="table align-middle border">
                              <thead>
                                <tr>
                                  <th className="font14">#</th>
                                  <th className="font14">Supplier</th>
                                  <th className="font14">Category</th>
                                  <th className="font14">Product Name</th>
                                  <th className="font14">Quantity</th>
                                  <th className="font14">Unit Price</th>
                                  <th className="font14">Total Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedSale.items.map((data, index) => (
                                  <tr key={index} className="align-middle">
                                    <td className="font14 pt-3 textWrapClass greyText">{index + 1}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{data.supplierName}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{data.categoryName}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{data.itemName}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{data.saleQuantity}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{data.salePricePerPiece.toFixed(2)}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{data.subTotal.toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-5">No sale data available</div>
                    )}
                    <div className="text-center p-3">
                      <button
                        className="btn addButtons2 font14 text-white me-2"
                        type="button"
                        disabled={selectedSale?.saleStatus === 'PAID' || !isValidAdd}
                      >
                        Pay Amount
                      </button>
                      <button
                        className="btn cancelButtons font14"
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          resetAdd();
                          setSelectedSale(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit/Pay Offcanvas */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Pay</h2>
            </div>
            <div className="offcanvas-body p-3">
              <form onSubmit={handleSubmitEdit()}>
                <div className="mb-3">
                  <label htmlFor="AmountEdit" className="form-label font14">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    id="AmountEdit"
                    type="number"
                    className={`form-control font14 ${errorsEdit.amount ? 'border-danger' : ''}`}
                    placeholder="Enter Amount"
                    {...registerEdit('amount', {
                      required: 'Amount is required *',
                      min: { value: 0, message: 'Amount must be non-negative' },
                    })}
                  />
                  {errorsEdit.amount && <p className="font12 text-danger">{errorsEdit.amount.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethodEdit" className="form-label font14">
                    Payment Method <span className="text-danger">*</span>
                  </label>
                  <select
                    id="paymentMethodEdit"
                    className={`form-select font14 ${errorsEdit.paymentMethod ? 'border-danger' : ''}`}
                    {...registerEdit('paymentMethod', { required: 'Payment Method is required *' })}
                  >
                    <option value="">--- Choose ---</option>
                    <option value="CASH">CASH</option>
                    <option value="CHEQUE">CHEQUE</option>
                    <option value="ONLINE">ONLINE</option>
                  </select>
                  {errorsEdit.paymentMethod && <p className="font12 text-danger">{errorsEdit.paymentMethod.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="feeDiscountDescriptionEdit" className="form-label font14">
                    Description
                  </label>
                  <input
                    id="feeDiscountDescriptionEdit"
                    type="text"
                    className={`form-control font14 ${errorsEdit.feeDiscountDescription ? 'border-danger' : ''}`}
                    placeholder="Enter Description"
                    {...registerEdit('feeDiscountDescription', {
                      validate: (value) =>
                        !value ||
                        (/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                        (value.length >= 4 || 'Minimum Length is 4') &&
                        (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description'),
                    })}
                  />
                  {errorsEdit.feeDiscountDescription && (
                    <p className="font12 text-danger">{errorsEdit.feeDiscountDescription.message}</p>
                  )}
                </div>
                <p className="text-center p-3">
                  <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidEdit}>
                    Pay
                  </button>
                  <button
                    className="btn cancelButtons font14"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={() => {
                      resetEdit();
                    }}
                  >
                    Cancel
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* Delete Offcanvas */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header ps-0 modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <span className="offcanvas-title" id="staticBackdropLabel">Sale</span>
            </div>
            <div className="offcanvas-body p-0">
              {loaderState && <DataLoader />}
              <div className="" style={{ zIndex: -1 }}>
                <p className="modalLightBorder p-2">Sale</p>
                <p className="text-center p-3">
                  <img src="/images/errorI.svg" className="img-fluid" alt="" />
                </p>
                <p className="text-center warningHeading">Are you Sure?</p>
                <p className="text-center greyText warningText pt-2">
                  This Action will permanently delete<br />the Sale Data
                </p>
                <p className="text-center warningText p-2">
                  <input
                    className="form-check-input formdltcheck me-2"
                    type="checkbox"
                    checked={isChecked}
                    id="flexCheckChecked"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  I Agree to delete the Sale Data
                </p>
                <p className="text-center p-3">
                  <button className="btn deleteButtons text-white" disabled={!isChecked}>
                    Delete
                  </button>
                  <button
                    className="btn dltcancelButtons ms-3"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => setIsChecked(false)}
                  >
                    Cancel
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ItemSale;
