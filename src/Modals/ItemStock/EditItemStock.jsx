import React, { useEffect, useState } from 'react'
import { getAllItemApi, getAllItemCategoryApi, getAllItemStoreApi, getAllItemSupplierApi, getItemStockByIdApi, updateItemStockByIdApi } from 'src/Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';

const EditItemStock = ({ EditId, closeCanvas }) => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    // const [Reload, setReload] = useState(false);
    const [ItemData, setItemData] = useState([]);
    const [ItemStoreData, setItemStoreData] = useState([]);
    const [ItemSupplierData, setItemSupplierData] = useState([]);
    const [ItemCategoryData, setItemCategoryData] = useState([]);

    const [ItemCategory, setItemCategory] = useState('');
    const [Supplier, setSupplier] = useState('');
    const [Store, setStore] = useState('');
    const [originalData, setOriginalData] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    const [fileVal, setFileVal] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)


    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });

    const watchedValues = watch();

    useEffect(() => {
        getAllItemData();
        getAllItemStoreData();
        getAllItemCategoryData();
        getAllItemSupplierData();
        if (EditId) {
            getItemStockDataById();
        }
    }, [token, EditId])

    useEffect(() => {
        // Create a shallow copy of watchedValues without the document field
        const { document, ...watchedWithoutFile } = watchedValues;
        const { document: originalDocument, ...originalWithoutFile } = originalData;

        // Compare the rest of the fields
        const hasOtherChanges = JSON.stringify(originalWithoutFile) !== JSON.stringify(watchedWithoutFile);

        // Handle document (file) comparison separately
        const fileChanged = watchedValues.document?.[0] !== undefined;

        // Set isUpdated to true if any field has changed
        setIsUpdated(hasOtherChanges || fileChanged);
    }, [watchedValues, originalData]);


    // console.log(watchedValues)

    const getAllItemData = async () => {
        try {
            setloaderState(true);
            var response = await getAllItemApi('', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setItemData(response?.data?.items);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'item');
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get All Item API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const getAllItemCategoryData = async () => {
        try {
            setloaderState(true);
            var response = await getAllItemCategoryApi('', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    // console.log(response?.data?.itemCategories)
                    setItemCategoryData(response?.data?.itemCategories);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'category');
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get All Item API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const getAllItemSupplierData = async () => {
        try {
            setloaderState(true);
            var response = await getAllItemSupplierApi('', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setItemSupplierData(response?.data?.itemSuppliers);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'supplier');
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get All Item API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const getAllItemStoreData = async () => {
        try {
            setloaderState(true);
            var response = await getAllItemStoreApi('', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setItemStoreData(response?.data?.itemStores);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'store');
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get All Item API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const getItemStockDataById = async () => {
        try {
            setloaderState(true);
            var response = await getItemStockByIdApi(EditId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    const fetchedData = {
                        itemId: response?.data?.itemStock?.itemId || '',
                        itemCategoryId: response?.data?.itemStock?.itemCategoryId || '',
                        supplierId: response?.data?.itemStock?.supplierId || '',
                        storeId: response?.data?.itemStock?.storeId || '',
                        purchasePrice: response?.data?.itemStock?.purchasePrice || '',
                        dateCreated: response?.data?.itemStock?.dateCreated || '',
                        itemQuantity: response?.data?.itemStock?.itemQuantity || '',
                        itemDescription: response?.data?.itemStock?.itemDescription || '',
                        document: response?.data?.itemStock?.documentPath || '',
                    }

                    setOriginalData(fetchedData);
                    reset(fetchedData);

                    setItemCategory(response?.data?.itemStock?.itemCategory)
                    setSupplier(response?.data?.itemStock?.supplierName)
                    setStore(response?.data?.itemStock?.storeName)
                    setFileVal(response?.data?.itemStock?.documentPath)
                    // toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'get by id');
                }
            }
            else {
                setloaderState(false);
                // // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // // console.log('Error Facing during Get Item By Id API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const updateItemStock = async (data) => {
        try {
            setloaderState(true)
            const formData = new FormData();
            formData.append('itemId', data?.itemId)
            formData.append('itemCategory', ItemCategory)
            formData.append('itemCategoryId', data?.itemCategoryId)
            formData.append('supplierName', Supplier)
            formData.append('supplierId', data?.supplierId)
            formData.append('storeName', Store)
            formData.append('storeId', data?.storeId)
            formData.append('itemQuantity', data?.itemQuantity)
            formData.append('purchasePrice', data?.purchasePrice)
            formData.append('dateCreated', data?.dateCreated)
            formData.append('document', data?.document[0])
            formData.append('itemDescription', data?.itemDescription)

            var response = await updateItemStockByIdApi(EditId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    closeCanvas(true);
                    setIsUpdated(false)
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'add');
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Add New Item API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const handleItemCategoryData = (value) => {
        setValue('itemCategoryId', value);
        const selectedCategory = ItemCategoryData.find((category) => category.id === parseInt(value));
        setItemCategory(selectedCategory ? selectedCategory.name : '');
    };

    const handleItemStoreData = (value) => {
        setValue('storeId', value);
        const selectedStore = ItemStoreData.find((store) => store.id === parseInt(value));
        setStore(selectedStore ? selectedStore.storeName : '');
    };

    const handleItemSupplierData = (value) => {
        setValue('supplierId', value);
        const selectedSupplier = ItemSupplierData.find((supplier) => supplier.supplierId === parseInt(value));
        setSupplier(selectedSupplier ? selectedSupplier.supplierName : '');
    };


    const handleCancelButton = () => {
        if (isUpdated) {
            setTimeout(() => {
                reset(originalData);
                setFileVal(originalData.document);
            }, 700);
        } setIsUpdated(false);
        reset(originalData);
    }

    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };


    return (
        <div className="container-fluid">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(updateItemStock)}>
                    <div className="col-12 mb-3">
                        <label htmlFor="itemCategoryId" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                        <select id='itemCategoryId' className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} value={watchedValues?.itemCategoryId} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleItemCategoryData(e.target.value)}>
                            <option value="">-- Select --</option>
                            {ItemCategoryData.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.itemCategoryId && <p className="text-danger">{errors.itemCategoryId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="itemId" className="form-label font14">Item <span className='text-danger'>*</span></label>
                        <select id="itemId" className={`form-select font14 ${errors.itemId ? 'border-danger' : ''}`} {...register('itemId', { required: 'Item is required *' })} >
                            <option value="">--- Select ---</option>
                            {ItemData.map((option) => (
                                <option key={option.id} value={option?.id}>{option.itemName}</option>
                            ))}
                        </select>
                        {errors.itemId && <p className="font12 text-danger">{errors.itemId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="supplierId" className="form-label font14">Supplier <span className='text-danger'>*</span></label>
                        <select id="supplierId" className={`form-select font14 ${errors.supplierId ? 'border-danger' : ''}`} {...register('supplierId', { required: 'Item Supplier is required *' })} onChange={(e) => handleItemSupplierData(e.target.value)}>
                            <option value="">--- Select ---</option>
                            {ItemSupplierData.map((option) => (
                                <option key={option.supplierId} value={option?.supplierId}>{option.supplierName}</option>
                            ))}
                        </select>
                        {errors.supplierId && <p className="font12 text-danger">{errors.supplierId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="storeId" className="form-label font14">Store <span className='text-danger'>*</span></label>
                        <select id="storeId" className={`form-select font14 ${errors.storeId ? 'border-danger' : ''}`} {...register('storeId', { required: 'Item Store is required *' })} onChange={(e) => handleItemStoreData(e.target.value)}>
                            <option value="">--- Select ---</option>
                            {ItemStoreData.map((option) => (
                                <option key={option.id} value={option?.id}>{option.storeName}</option>
                            ))}
                        </select>
                        {errors.storeId && <p className="font12 text-danger">{errors.storeId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
                        <input
                            id="itemQuantity"
                            type="text"
                            className={`form-control font14 ${errors.itemQuantity ? 'border-danger' : ''}`}
                            {...register('itemQuantity', {
                                required: 'Quantity is required *',
                                pattern: {
                                    value: /^[0-9]+$/, // only digits allowed
                                    message: 'Only numbers are allowed',
                                },
                                min: {
                                    value: 0,
                                    message: 'Quantity cannot be negative',
                                },
                            })}
                        />

                        {errors.itemQuantity && <p className="font12 text-danger">{errors.itemQuantity.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Purchase Price <span className='text-danger'>*</span></label>
                        <input id="purchasePrice" type="number" className={`form-control font14 ${errors.purchasePrice ? 'border-danger' : ''}`} {...register('purchasePrice', { required: 'Purchase Price is required *', min: { value: 0, message: 'Purchase Price cannot be negative' } })} />
                        {errors.purchasePrice && <p className="font12 text-danger">{errors.purchasePrice.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Date</label>
                        <input id="dateCreated" type="date" className={`form-control font14 ${errors.dateCreated ? 'border-danger' : ''}`} {...register('dateCreated', { required: 'Date Created is required *' })} />
                        {errors.dateCreated && <p className="font12 text-danger">{errors.dateCreated.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                        <input id="itemDescription" type="text" className={`form-control font14 ${errors.itemDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('itemDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                        {errors.itemDescription && <p className="font12 text-danger">{errors.itemDescription.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Attach Document  <span className='text-danger'>*</span></label>
                        <div className="d-flex bg-white">
                            {fileVal !== null && changeImageType ?
                                // <input id="document" type="text" className='form-control formimagetext font14' value={fileVal.split('/').pop()} disabled />
                                <div style={{ width: '100%', border: '1px solid #E4E7EB' }}>
                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src={fileVal} alt="School Logo" height={30} style={{ cursor: "pointer" }} onClick={handleImageClick} />
                                </div>
                                :
                                <input id="document" type="file" className={`form-control formimagetext font14 ${errors.document ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('document', { required: 'Admin Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            }
                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                    {fileVal !== null && changeImageType ? 'Edit' : 'View'}
                                </span>
                            </div>
                        </div>
                        {errors.document && <p className="font12 text-danger">{errors.document.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons2 font14 text-white me-2' type='submit' disabled={!isUpdated} >Update Item Stock</button>
                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => handleCancelButton()}>Cancel</button>
                    </p>
                </form>
            </div>
        </div>


    )
}

export default EditItemStock


