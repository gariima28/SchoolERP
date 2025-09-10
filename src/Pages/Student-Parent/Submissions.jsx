import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllSubmissionsDataApi, submitSubmissionsByStudentApi } from "src/Utils/Apis";
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { getDownloadSubmissionDataApi } from '../../Utils/Apis';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .form-select, .form-control::placeholder, .form-control {
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .form-select.border-danger {
        border-color: #dc3545 !important;
    }

`;

const Submissions = () => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [SubmissionData, setSubmissionData] = useState([]);
    const [subjectName, setSubjectName] = useState(false);
    const [submissionId, setSubmissionId] = useState(false);
    const [assignmentId, setAssignmentId] = useState(false);
    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllSubmissions();
    }, [token, pageNo]);

    const getAllSubmissions = async () => {
        try {
            setloaderState(true);
            var response = await getAllSubmissionsDataApi(searchByKey, pageNo, pageSize);
            // console.log(response, 'Submissions')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setSubmissionData(response?.data?.submissions);
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.msg);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get All Submissions API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const downloadSubmission = async (id) => {
        try {
            setloaderState(true);
            const data = {
                "responseType": "blob"
            };
            const response = await getDownloadSubmissionDataApi(id, data);
            if (response?.status === 200) {
                const pdfData = response?.data;
                downloadFileFunction(pdfData, 'Submissions.pdf');
                toast.success('Submissions Downloaded Successfully');
                setloaderState(false);
            } else {
                toast.error('Failed to download the Submissions.');
            }
        } catch (error) {
            setloaderState(false);
            toast.error('An error occurred while downloading the Submissions-', error);
        }
        finally {
            setloaderState(false);
        }
    };

    const downloadFileFunction = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        //creates a temporary URL that points to the Blob object. This URL can be used as a link to access the file data.
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        //releases the memory used by the temporary URL. This is important to prevent memory leaks, 
        //as the URL was only needed for the duration of the file download process.
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
    } = useForm({
        mode: "onChange",
    });

    const fileSelected = watch("file"); // Watch the file input to check if a file is selected

    const onSubmit = async (data) => {
        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append("submissionPath", data.file[0]);
            formData.append("description", data.description);

            const response = await submitSubmissionsByStudentApi(assignmentId, formData);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setloaderState(false);
                    const pdfData = response?.data;
                    toast.success(response?.data?.message || 'Submissions Downloaded Successfully');
                } else {
                    setloaderState(true);
                    toast.error(response?.data?.message || 'Failed to download the Submissions.');
                }
            }
        } catch (error) {
            setloaderState(false);
            toast.error(error?.response?.data?.message || 'An error occurred while downloading the Submissions-', error);
        }
        finally{
            setloaderState(false);
        }
    };

    return (

        <Container className="container-fluid p-4 overflow-scroll">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Submissions</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Submissions Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                {SubmissionData.length > 0 ?
                    <>
                        <div className="overflow-scroll">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <td className='textWrapClass font14'>#</td>
                                        <td className='textWrapClass font14'>Title</td>
                                        <td className='textWrapClass font14'>Teacher</td>
                                        <td className='textWrapClass font14'>Subject</td>
                                        <td className='textWrapClass font14'>Submission File</td>
                                        <td className='textWrapClass font14'>Result</td>
                                        <td className='textWrapClass font14'>Status</td>
                                        <td className='textWrapClass font14'>End Time</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                    <tr></tr>
                                    {SubmissionData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='textWrapClass font14 greyText'>{index + 1}</td>
                                            <td className='textWrapClass font14 greyText'>{item.assignmentTitle}</td>
                                            <td className='textWrapClass font14 greyText'>{item.teacherName}</td>
                                            <td className='textWrapClass font14 greyText'>{item.subjectName}</td>
                                            <td className='textWrapClass greyText'>
                                                {item.status === 'PENDING' ? <p className='font14 align-self-start m-0'>
                                                    <Icon icon="mdi:cloud-upload-outline" width="1.3em" height="1.3em" style={{ color: '#008479' }} />
                                                    <Link className="ms-2" to="" data-bs-toggle="offcanvas" data-bs-target="#addSubmission" aria-controls="addSubmission" onClick={() => { setSubjectName(item.subjectName); setAssignmentId(item.assignmentId) }}> Upload File </Link>
                                                </p>
                                                    : <p className='font14 align-self-start m-0'>
                                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em" style={{ color: 'red' }} />
                                                        <Link className='ms-2' to='' onClick={() => downloadSubmission(item.id)}>Download</Link>
                                                    </p>}
                                            </td>
                                            <td className='textWrapClass font14 greyText'>{item.resultMarks}</td>
                                            <td className='textWrapClass font14 greyText'>{item.status}</td>
                                            <td className='textWrapClass font14 greyText'>{item.endDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex">
                            <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                            <div className="ms-auto">
                                <ReactPaginate
                                    previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                    nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                    breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                    onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="d-flex justify-content-center p-5 m-5">
                            <img src="/images/search.svg" alt="" className='img-fluid p-5' />
                        </div>
                    </>
                }
                <Toaster />
            </div>


            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addSubmission" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header border-bottom border-2 p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Add Submission</h2>
                </div>
                <div className="offcanvas-body p-0">
                    <div className="container-fluid">
                        <div className="row">
                            <form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3 teacher-input">
                                    <label htmlFor="subjectName" className="form-label font14">Subject <span className='text-danger'>*</span></label>
                                    <input type="text" className='form-control font14' value={subjectName} disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="file" className="form-label font14">Upload File <span className='text-danger'>*</span></label>
                                    <input
                                        id="file"
                                        type="file"
                                        className={`form-control font14 ${errors.file ? 'border-danger' : ''}`}
                                        accept='.pdf, .docx, .png'
                                        {...register('file', {
                                            required: 'File is required *',
                                            validate: value => {
                                                if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800))
                                                    return 'File size must be between 10 KB to 200 KB';
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label font14">Description</label>
                                    <input
                                        id="description"
                                        type="text"
                                        className={`form-control font14 ${errors.description ? 'border-danger' : ''}`}
                                        placeholder="Enter Description"
                                        {...register('description', {
                                            validate: value => {
                                                if (!value) return true;
                                                if (value.length < 2) return 'Minimum Length is 2';
                                                if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) return 'Invalid Characters in Description';
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors.description && <p className="font12 text-danger">{errors.description.message}</p>}
                                </div>
                                <p className='text-center p-3'>
                                    <button className='btn updateCreateButtons text-white' disabled={!isValid} type='submit'>Submit</button>
                                    <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => reset()}>Cancel</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default Submissions
