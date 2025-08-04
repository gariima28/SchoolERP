import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import ActionControls from "../../../Layouts/ActionControls";
import { Link, useNavigate } from "react-router-dom";
import DataLoader from 'src/Layouts/Loader';
import { useFieldArray, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import {
    getAllRolesApi,
    getDataByRoleIdApi,
    getAllItemCategoryApi,
    getAllProductByCategoryId,
    addNewSaleApi,
    getAllSupplierApi,
} from "../../../Utils/Apis";

const Container = styled.div`
  select:-internal-list-box {
    overflow: visible !important;
    background-color: #00A67E !important;
  }

  .headingGreen {
    background-color: #008479;
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

  .cursorpointer {
    cursor: pointer;
  }

  .blueText {
    color: #1DA1F2;
  }

  .form-container {
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
  }
`;

const Sale = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // State Management
    const [loaderState, setLoaderState] = useState(false);
    const [rolesData, setRolesData] = useState([]);
    const [dataByRoleId, setDataByRoleId] = useState([]);
    const [itemCategoryData, setItemCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // Form instances
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        control,
        reset,
        setValue,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            role: '',
            warehouseKeeper: '',
            date: '',
            description: '',
            items: [{ supplier: '', category: '', product: '', quantity: 0, price: 0, subTotal: 0 }],
            paidStatus: '',
            discount: 0,
            grandTotal: 0,
        },
    });

    const watchRole = watch('role');
    const watchItems = watch('items');
    const watchDiscount = watch('discount');

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    // Fetch All Roles, Categories, and Suppliers
    useEffect(() => {
        getAllRoles();
        getAllItemCategoryData();
        getAllSupplierData();
    }, [token]);

    // Fetch Staff by Role
    useEffect(() => {
        if (watchRole && typeof watchRole === 'string' && watchRole.trim() !== '') {
            getAllDataByRoleId();
        } else {
            setDataByRoleId([]);
        }
    }, [watchRole]);

    // Calculate SubTotal and GrandTotal
    useEffect(() => {
        let totalSubTotal = 0;
        watchItems.forEach((item, index) => {
            const quantity = parseFloat(item.quantity) || 0;
            const price = parseFloat(item.price) || 0;
            const subTotal = quantity * price;
            totalSubTotal += subTotal;
            setValue(`items[${index}].subTotal`, subTotal.toFixed(2)); // Ensure 2 decimal places
        });

        const discount = parseFloat(watchDiscount) || 0;
        const grandTotal = totalSubTotal - discount;
        setValue('grandTotal', grandTotal.toFixed(2)); // Ensure 2 decimal places
    }, [watchItems, watchDiscount, setValue]);

    const getAllRoles = async () => {
        try {
            setLoaderState(true);
            const response = await getAllRolesApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setRolesData(response.data.roles || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch roles');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching roles');
        } finally {
            setLoaderState(false);
        }
    };

    const getAllItemCategoryData = async () => {
        try {
            setLoaderState(true);
            const response = await getAllItemCategoryApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setItemCategoryData(response.data.itemCategories || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch item categories');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching item categories');
        } finally {
            setLoaderState(false);
        }
    };

    const getAllSupplierData = async (search = "") => {
        try {
            setLoaderState(true);
            const response = await getAllSupplierApi(search, currentPage, 100);
            if (response?.status === 200 && response?.data?.status === "success") {
                setSupplierData(response.data.itemSuppliers || []);
                setTotalPages(response.data.totalPages || 1);
                setCurrentPage(response.data.currentPage || 1);
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

    const getAllProductData = async (categoryId) => {
        try {
            setLoaderState(true);
            const response = await getAllProductByCategoryId(categoryId);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setProductData(response.data.items || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch products');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching products');
        } finally {
            setLoaderState(false);
        }
    };

    const getAllDataByRoleId = async () => {
        try {
            setLoaderState(true);
            const response = await getDataByRoleIdApi(watchRole, '', 1, 100);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setDataByRoleId(response.data.staff || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch staff data');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching staff data');
        } finally {
            setLoaderState(false);
        }
    };

    const handleIndexCategory = async (value, index) => {
        if (value) {
            await getAllProductData(value);
            setValue(`items[${index}].category`, value);
            setValue(`items[${index}].product`, '');
            setValue(`items[${index}].price`, 0);
            setValue(`items[${index}].subTotal`, 0);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoaderState(true);
            const jsonData = {
                userId: parseInt(data.warehouseKeeper) || 0,
                saleStatus: "PAID",
                paidStatus: data.paidStatus,
                description: data.description || "",
                saleDate: data.date,
                items: data.items.map(item => ({
                    supplierId: parseInt(item.supplier) || 0,
                    categoryId: parseInt(item.category) || 0,
                    itemId: parseInt(item.product) || 0,
                    price: parseFloat(item.price) || 0,
                    quantity: parseFloat(item.quantity) || 0,
                    subTotal: parseFloat(item.subTotal) || 0
                })),
                discount: parseFloat(data.discount) || 0,
                grandTotal: parseFloat(data.grandTotal) || 0
            };

            const response = await addNewSaleApi(jsonData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message || 'Sale added successfully');
                reset();
            } else {
                toast.error(response?.data?.message || 'Failed to add sale');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error adding sale');
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <>
            <Container>
                {loaderState && <DataLoader />}
                <Toaster />
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item">
                                    <a href="/" className="bredcrumText text-decoration-none">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="/admin/inventory" className="bredcrumText text-decoration-none">Inventory</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="/admin/inventory/sale" className="bredcrumText text-decoration-none">Sale</a>
                                </li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Sale</li>
                            </ol>
                        </nav>
                        <p className="font14 ps-0 fontWeight500">Add Sale</p>
                    </div>

                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-4">
                                        <p className="headingGreen text-white font14 p-2 mb-3">Sale Information</p>
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label font14">
                                                User Type <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="role"
                                                className={`form-select font14 ${errors.role ? 'border-danger' : ''}`}
                                                {...register('role', { required: 'User Type is required *' })}
                                            >
                                                <option value="">--- Choose ---</option>
                                                {rolesData.map((role) => (
                                                    <option key={role.roleId} value={role.roleId}>
                                                        {role.roleName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.role && <p className="font12 text-danger">{errors.role.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="warehouseKeeper" className="form-label font14">
                                                Sale To <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="warehouseKeeper"
                                                className={`form-select font14 ${errors.warehouseKeeper ? 'border-danger' : ''}`}
                                                {...register('warehouseKeeper', { required: 'Sale To is required *' })}
                                            >
                                                <option value="">--- Choose ---</option>
                                                {dataByRoleId.length > 0 ? (
                                                    dataByRoleId.map((staff) => (
                                                        <option key={staff.id} value={staff.id}>
                                                            {staff.staffName}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="" disabled>
                                                        {watchRole ? '-- No Staff Found --' : '-- Select Role First --'}
                                                    </option>
                                                )}
                                            </select>
                                            {errors.warehouseKeeper && <p className="font12 text-danger">{errors.warehouseKeeper.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="date" className="form-label font14">
                                                Date <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                id="date"
                                                type="date"
                                                className={`form-control font14 ${errors.date ? 'border-danger' : ''}`}
                                                {...register('date', { required: 'Date is required *' })}
                                            />
                                            {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label font14">
                                                Description
                                            </label>
                                            <input
                                                id="description"
                                                type="text"
                                                className={`form-control font14 ${errors.description ? 'border-danger' : ''}`}
                                                placeholder="Enter Description"
                                                {...register('description')}
                                            />
                                            {errors.description && <p className="font12 text-danger">{errors.description.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div>
                                            <p className="headingGreen text-white font14 p-2 mb-2">Item Information:</p>
                                            <div className="form-container">
                                                {fields.map((item, index) => (
                                                    <div key={item.id} className="row px-1 mb-2">
                                                        <div className="col-2 p-2">
                                                            <label htmlFor={`items[${index}].supplier`} className="form-label font14">
                                                                Supplier <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                id={`items[${index}].supplier`}
                                                                className={`form-select font14 ${errors.items?.[index]?.supplier ? 'border-danger' : ''}`}
                                                                {...register(`items[${index}].supplier`, { required: 'Supplier is required *' })}
                                                            >
                                                                <option value="">--- Choose ---</option>
                                                                {supplierData.map((supplier) => (
                                                                    <option key={supplier.id} value={supplier.id}>
                                                                        {supplier.supplierName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.items?.[index]?.supplier && <p className="font12 text-danger">{errors.items[index].supplier.message}</p>}
                                                        </div>
                                                        <div className="col-2 p-2">
                                                            <label htmlFor={`items[${index}].category`} className="form-label font14">
                                                                Category <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                id={`items[${index}].category`}
                                                                className={`form-select font14 ${errors.items?.[index]?.category ? 'border-danger' : ''}`}
                                                                {...register(`items[${index}].category`, { required: 'Category is required *' })}
                                                                onChange={(e) => handleIndexCategory(e.target.value, index)}
                                                            >
                                                                <option value="">--- Choose ---</option>
                                                                {itemCategoryData.map((category) => (
                                                                    <option key={category.id} value={category.id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.items?.[index]?.category && <p className="font12 text-danger">{errors.items[index].category.message}</p>}
                                                        </div>
                                                        <div className="col-2 p-2">
                                                            <label htmlFor={`items[${index}].product`} className="form-label font14">
                                                                Product <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                id={`items[${index}].product`}
                                                                className={`form-select font14 ${errors.items?.[index]?.product ? 'border-danger' : ''}`}
                                                                {...register(`items[${index}].product`, {
                                                                    required: 'Product is required *',
                                                                    onChange: (e) => {
                                                                        const productId = e.target.value;
                                                                        const product = productData.find(p => p.id === parseInt(productId));
                                                                        if (product) {
                                                                            setValue(`items[${index}].price`, product.price || 0);
                                                                            const quantity = parseFloat(watchItems[index]?.quantity) || 0;
                                                                            setValue(`items[${index}].subTotal`, (quantity * (product.price || 0)).toFixed(2));
                                                                        }
                                                                    },
                                                                })}
                                                            >
                                                                <option value="">--- Choose ---</option>
                                                                {productData.map((product) => (
                                                                    <option key={product.id} value={product.id}>
                                                                        {product.itemName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.items?.[index]?.product && <p className="font12 text-danger">{errors.items[index].product.message}</p>}
                                                        </div>
                                                        <div className="col-2 p-2">
                                                            <label htmlFor={`items[${index}].quantity`} className="form-label font14">
                                                                Quantity <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                id={`items[${index}].quantity`}
                                                                type="number"
                                                                className={`form-control font14 ${errors.items?.[index]?.quantity ? 'border-danger' : ''}`}
                                                                placeholder="0"
                                                                {...register(`items[${index}].quantity`, {
                                                                    required: 'Quantity is required *',
                                                                    min: { value: 0, message: 'Quantity must be non-negative' },
                                                                    onChange: (e) => {
                                                                        const quantity = parseFloat(e.target.value) || 0;
                                                                        const price = parseFloat(watchItems[index]?.price) || 0;
                                                                        setValue(`items[${index}].subTotal`, (quantity * price).toFixed(2));
                                                                    },
                                                                })}
                                                            />
                                                            {errors.items?.[index]?.quantity && <p className="font12 text-danger">{errors.items[index].quantity.message}</p>}
                                                        </div>
                                                        <div className="col-2 p-2">
                                                            <label htmlFor={`items[${index}].price`} className="form-label font14">
                                                                Unit Price <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                id={`items[${index}].price`}
                                                                type="number"
                                                                className={`form-control font14 ${errors.items?.[index]?.price ? 'border-danger' : ''}`}
                                                                placeholder="0"
                                                                {...register(`items[${index}].price`, {
                                                                    required: 'Unit Price is required *',
                                                                    min: { value: 0, message: 'Price must be non-negative' },
                                                                    onChange: (e) => {
                                                                        const price = parseFloat(e.target.value) || 0;
                                                                        const quantity = parseFloat(watchItems[index]?.quantity) || 0;
                                                                        setValue(`items[${index}].subTotal`, (quantity * price).toFixed(2));
                                                                    },
                                                                })}
                                                            />
                                                            {errors.items?.[index]?.price && <p className="font12 text-danger">{errors.items[index].price.message}</p>}
                                                        </div>
                                                        <div className="col-2 p-2">
                                                            <div className="d-flex align-items-end">
                                                                <div>
                                                                    <label htmlFor={`items[${index}].subTotal`} className="form-label font14">
                                                                        SubTotal
                                                                    </label>
                                                                    <input
                                                                        id={`items[${index}].subTotal`}
                                                                        type="number"
                                                                        className={`form-control font14 ${errors.items?.[index]?.subTotal ? 'border-danger' : ''}`}
                                                                        placeholder="0"
                                                                        readOnly
                                                                        {...register(`items[${index}].subTotal`, {
                                                                            required: 'SubTotal is required *',
                                                                        })}
                                                                    />
                                                                    {errors.items?.[index]?.subTotal && <p className="font12 text-danger">{errors.items[index].subTotal.message}</p>}
                                                                </div>
                                                                {index > 0 && (
                                                                    <p className="pb-1 deactiveText font26 cursorpointer" onClick={() => remove(index)}>
                                                                        <DeleteOutlinedIcon />
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mb-3 font12 blueText cursorpointer" onClick={() => append({ supplier: '', category: '', product: '', quantity: 0, price: 0, subTotal: 0 })}>
                                                + Add More
                                            </p>
                                        </div>
                                        <p className="headingGreen text-white font14 p-2 mb-3">Payment Information:</p>
                                        <div className="mb-2">
                                            <label htmlFor="paidStatus" className="form-label font14">
                                                Paid Status <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="paidStatus"
                                                className={`form-select font14 ${errors.paidStatus ? 'border-danger' : ''}`}
                                                {...register('paidStatus', { required: 'Paid Status is required *' })}
                                            >
                                                <option value="">--- Choose ---</option>
                                                <option value="CASH">CASH</option>
                                                <option value="CHEQUE">CHEQUE</option>
                                                <option value="ONLINE">ONLINE</option>
                                            </select>
                                            {errors.paidStatus && <p className="font12 text-danger">{errors.paidStatus.message}</p>}
                                        </div>
                                        <div className="row px-1">
                                            <div className="col-6 p-2 mb-3">
                                                <label htmlFor="discount" className="form-label font14">
                                                    Discount
                                                </label>
                                                <input
                                                    id="discount"
                                                    type="number"
                                                    className={`form-control font14 ${errors.discount ? 'border-danger' : ''}`}
                                                    placeholder="0"
                                                    {...register('discount', {
                                                        min: { value: 0, message: 'Discount must be non-negative' },
                                                        onChange: () => {
                                                            const totalSubTotal = watchItems.reduce((sum, item) => sum + (parseFloat(item.subTotal) || 0), 0);
                                                            const discount = parseFloat(watchDiscount) || 0;
                                                            setValue('grandTotal', (totalSubTotal - discount).toFixed(2));
                                                        },
                                                    })}
                                                />
                                                {errors.discount && <p className="font12 text-danger">{errors.discount.message}</p>}
                                            </div>
                                            <div className="col-6 p-2 mb-3">
                                                <label htmlFor="grandTotal" className="form-label font14">
                                                    Grand Total
                                                </label>
                                                <input
                                                    id="grandTotal"
                                                    type="number"
                                                    className={`form-control font14 ${errors.grandTotal ? 'border-danger' : ''}`}
                                                    placeholder="0"
                                                    readOnly
                                                    {...register('grandTotal', {
                                                        required: 'Grand Total is required *',
                                                    })}
                                                />
                                                {errors.grandTotal && <p className="font12 text-danger">{errors.grandTotal.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center p-3">
                                    <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValid}>
                                        Submit
                                    </button>
                                    <button
                                        className="btn cancelButtons font14"
                                        type="button"
                                        onClick={() => reset()}
                                    >
                                        Cancel
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Sale;