import React, { useEffect, useState } from 'react'
import { getAllItemCategoryApi, getItemByIdApi, updateItemByIdApi } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EditItem = ({ EditId, closeCanvas }) => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });

    // console.log(EditId, 'EditId')

    const [ItemCategoryData, setItemCategoryData] = useState([]);
    const [ItemCategory, setItemCategory] = useState('');
    const [originalData, setOriginalData] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    const itemCategoryIdVal = watch('itemCategoryId')
    const watchedValues = watch();

    useEffect(() => {
        getAllItemCategoryData();
        getItemDataById();
    }, [token, EditId])

    useEffect(() => {
        // Check if the current form values are different from the original data
        const hasChanged = JSON.stringify(originalData) !== JSON.stringify(watchedValues);
        setIsUpdated(hasChanged);
    }, [watchedValues, originalData]);

    const getAllItemCategoryData = async () => {
        try {
            setloaderState(true);
            var response = await getAllItemCategoryApi('', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setItemCategoryData(response?.data?.itemCategories);
                }
                else {
                    setloaderState(false);
                    // toast.error(response?.data?.message);
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

    const getItemDataById = async () => {
        try {
            setloaderState(true);
            var response = await getItemByIdApi(EditId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    const fetchedData = {
                        itemName: response?.data?.item?.itemName || '',
                        itemCategoryId: response?.data?.item?.itemCategoryId || '',
                        itemCategory: response?.data?.item?.itemCategory || '',
                        totalUnits: response?.data?.item?.totalUnits || '',
                        itemDescription: response?.data?.item?.itemDescription || '',
                    };

                    // Store original data
                    setOriginalData(fetchedData);

                    // Set values in form
                    reset(fetchedData);
                    setItemCategory(fetchedData.itemCategory);
                    // toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get Item By Id API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const updateItem = async (data) => {
        try {
            setloaderState(true)
            const JsonData = {
                "itemName": data?.itemName,
                "itemCategoryId": data?.itemCategoryId,
                "itemCategory": ItemCategory,
                "totalUnits": data?.totalUnits,
                "itemDescription": data?.itemDescription
            }
            var response = await updateItemByIdApi(EditId, JsonData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message);
                    closeCanvas(true);
                }
                else {
                    setloaderState(false);
                    // toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
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

    const handleCancelButton = () => {
        if (isUpdated) {
            setTimeout(() => {
                reset(originalData);
                setItemCategory(originalData.itemCategory);
            }, 700);
        }
    }


    return (
        <div className="container-fluid">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form className='' onSubmit={handleSubmit(updateItem)}>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
                        <input id="itemName" type="text" className={`form-control font14 ${errors.itemName ? 'border-danger' : ''}`} placeholder="Enter Item Name" {...register('itemName', { required: 'Item Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Item Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Item Name'; } return true; } })} />
                        {errors.itemName && <p className="font12 text-danger">{errors.itemName.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                        <select id='itemCategoryId' className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} value={itemCategoryIdVal} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleItemCategoryData(e.target.value)}>
                            <option value="">-- Select --</option>
                            {ItemCategoryData.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.itemCategoryId && <p className="font12 text-danger">{errors.itemCategoryId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Unit <span className='text-danger'>*</span></label>
                        <input id="totalUnits" type="number" className={`form-control font14 ${errors.totalUnits ? 'border-danger' : ''}`} {...register('totalUnits', { required: 'Unit is required *', min: { value: 0, message: 'Unit cannot be negative' } })} />
                        {errors.totalUnits && <p className="font12 text-danger">{errors.totalUnits.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                        <input id="itemDescription" type="text" className={`form-control font14 ${errors.itemDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('itemDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                        {errors.itemDescription && <p className="font12 text-danger">{errors.itemDescription.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons font14 text-white me-2' type='submit' disabled={!isUpdated}>Update Item</button>
                        <button className='btn cancelButtons font14' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => handleCancelButton()}>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default EditItem

